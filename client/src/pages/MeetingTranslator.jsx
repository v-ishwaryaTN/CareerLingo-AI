import React, { useState, useRef } from "react";
import "./MeetingTranslator.css";

const API_BASE_URL =
  `${process.env.REACT_APP_API_URL || "http://localhost:5000"}`.replace(/\/$/, "") +
  "/api";

const LANGUAGES = [
  { code: "ta", label: "தமிழ் · Tamil" },
  { code: "hi", label: "हिंदी · Hindi" },
  { code: "te", label: "తెలుగు · Telugu" },
  { code: "kn", label: "ಕನ್ನಡ · Kannada" },
  { code: "ml", label: "മലയാളം · Malayalam" },
];

const VOICE_LANG_MAP = {
  ta: "ta-IN",
  hi: "hi-IN",
  te: "te-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  en: "en-US",
};

// 6-second chunks keep the UI responsive while avoiding excessive API calls.
const CHUNK_MS = 6000;

const getSupportedMimeType = () => {
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus",
    "audio/mp4",
  ];

  return (
    types.find(
      (type) =>
        window.MediaRecorder &&
        typeof MediaRecorder.isTypeSupported === "function" &&
        MediaRecorder.isTypeSupported(type)
    ) || ""
  );
};

export default function MeetingTranslator() {
  const [myLang, setMyLang] = useState("ta");
  const [capturing, setCapturing] = useState(false);
  const [outputDevices, setOutputDevices] = useState([]);
  const [selectedOutput, setSelectedOutput] = useState("");
  const [log, setLog] = useState([]);
  const [status, setStatus] = useState("");
  const [voiceWarning, setVoiceWarning] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const tabRecorderRef = useRef(null);
  const micRecorderRef = useRef(null);
  const tabStreamRef = useRef(null);
  const micStreamRef = useRef(null);

  const cachedVoicesRef = useRef([]);
  const logRef = useRef([]);
  const tabHasSoundRef = useRef(false);
  const micHasSoundRef = useRef(false);
  const tabSilenceCleanupRef = useRef(null);
  const micSilenceCleanupRef = useRef(null);

  const tabRequestInFlightRef = useRef(false);
  const micRequestInFlightRef = useRef(false);
  const stopRequestedRef = useRef(false);

  // ---------------------------------------------------------
  // LOG
  // ---------------------------------------------------------

  const updateLog = (entry) => {
    const next = [...logRef.current, entry].slice(-30);
    logRef.current = next;
    setLog(next);
  };

  const clearConversation = () => {
    logRef.current = [];
    setLog([]);
    setSuggestions([]);
    setStatus("");
  };

  // ---------------------------------------------------------
  // SILENCE DETECTION
  // ---------------------------------------------------------

  const setupSilenceDetector = (stream, hasSoundRef) => {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      hasSoundRef.current = true;
      return () => {};
    }

    const audioCtx = new AudioContextClass();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();

    analyser.fftSize = 512;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const SILENCE_THRESHOLD = 0.02;

    let rafId;

    const checkVolume = () => {
      if (stopRequestedRef.current) return;

      analyser.getByteTimeDomainData(dataArray);

      let sumSquares = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const value = (dataArray[i] - 128) / 128;
        sumSquares += value * value;
      }

      const rms = Math.sqrt(sumSquares / dataArray.length);

      if (rms > SILENCE_THRESHOLD) {
        hasSoundRef.current = true;
      }

      rafId = requestAnimationFrame(checkVolume);
    };

    checkVolume();

    return () => {
      cancelAnimationFrame(rafId);
      try {
        audioCtx.close();
      } catch (_) {}
    };
  };

  // ---------------------------------------------------------
  // VOICES
  // ---------------------------------------------------------

  const getVoicesAsync = () =>
    new Promise((resolve) => {
      const existing = window.speechSynthesis.getVoices();

      if (existing.length > 0) {
        resolve(existing);
        return;
      }

      const handler = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          window.speechSynthesis.removeEventListener(
            "voiceschanged",
            handler
          );
          resolve(voices);
        }
      };

      window.speechSynthesis.addEventListener("voiceschanged", handler);

      setTimeout(() => {
        window.speechSynthesis.removeEventListener(
          "voiceschanged",
          handler
        );
        resolve(window.speechSynthesis.getVoices());
      }, 1200);
    });

  const speak = async (text, langCode) => {
    if (!text?.trim()) return;

    if (!window.speechSynthesis) {
      setVoiceWarning(
        "Voice playback இந்த browser-ல் support ஆகவில்லை. Chrome பயன்படுத்துங்கள்."
      );
      return;
    }

    try {
      window.speechSynthesis.cancel();

      if (cachedVoicesRef.current.length === 0) {
        cachedVoicesRef.current = await getVoicesAsync();
      }

      const voices = cachedVoicesRef.current;
      const targetLang = VOICE_LANG_MAP[langCode] || "en-US";

      const exactMatch = voices.find(
        (voice) => voice.lang === targetLang
      );

      const partialMatch =
        exactMatch ||
        voices.find(
          (voice) =>
            voice.lang?.toLowerCase() ===
            targetLang.split("-")[0].toLowerCase()
        ) ||
        voices.find((voice) =>
          voice.lang
            ?.toLowerCase()
            .startsWith(targetLang.split("-")[0].toLowerCase())
        );

      if (!partialMatch) {
        setVoiceWarning(
          `${targetLang} voice கிடைக்கவில்லை. Browser default voice பயன்படுத்தப்படும்.`
        );
      }

      const setMicMuted = (muted) => {
        if (micStreamRef.current) {
          micStreamRef.current
            .getAudioTracks()
            .forEach((track) => {
              track.enabled = !muted;
            });
        }
      };

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = targetLang;

      if (partialMatch) {
        utter.voice = partialMatch;
      }

      utter.rate = 1;
      utter.pitch = 1;

      utter.onstart = () => setMicMuted(true);
      utter.onend = () => setMicMuted(false);
      utter.onerror = () => setMicMuted(false);

      window.speechSynthesis.speak(utter);
    } catch (error) {
      console.error("Speech playback error:", error);
    }
  };

  // ---------------------------------------------------------
  // OUTPUT DEVICES
  // ---------------------------------------------------------

  const loadOutputDevices = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const devices = await navigator.mediaDevices.enumerateDevices();
      const outputs = devices.filter(
        (device) => device.kind === "audiooutput"
      );

      setOutputDevices(outputs);

      if (
        outputs.length > 0 &&
        !outputs.some((device) => device.deviceId === selectedOutput)
      ) {
        setSelectedOutput(outputs[0].deviceId);
      }
    } catch (error) {
      console.error("Could not list output devices:", error);
    }
  };

  // ---------------------------------------------------------
  // START / STOP
  // ---------------------------------------------------------

  const startCapture = async () => {
    try {
      stopRequestedRef.current = false;
      setSuggestions([]);
      setSuggestionLoading(false);
      setStatus(
        "Meeting tab-ஐ select பண்ணி, 'Share tab audio' checkbox-ஐ tick பண்ணுங்க..."
      );

      const tabStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const hasTabAudio = tabStream.getAudioTracks().length > 0;

      if (!hasTabAudio) {
        alert(
          "Tab audio share ஆகவில்லை. Share popup-ல் 'Share tab audio' tick பண்ணுங்க."
        );

        tabStream.getTracks().forEach((track) => track.stop());
        return;
      }

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      tabStreamRef.current = tabStream;
      micStreamRef.current = micStream;

      setCapturing(true);
      setStatus(
        "Listening... They speak → translation + suggestions. You speak → English."
      );

      tabSilenceCleanupRef.current = setupSilenceDetector(
        new MediaStream(tabStream.getAudioTracks()),
        tabHasSoundRef
      );

      micSilenceCleanupRef.current = setupSilenceDetector(
        micStream,
        micHasSoundRef
      );

      const videoTrack = tabStream.getVideoTracks()[0];

      if (videoTrack) {
        videoTrack.addEventListener("ended", stopCapture, {
          once: true,
        });
      }

      recordTabLoop(tabStream);

      setTimeout(() => {
        if (!stopRequestedRef.current && micStreamRef.current) {
          recordMicLoop(micStream);
        }
      }, CHUNK_MS / 2);
    } catch (error) {
      console.error("Start capture error:", error);
      setCapturing(false);
      setStatus(
        "Screen/tab share cancel பண்ணிட்டீங்க அல்லது permission error வந்திருக்கு."
      );
    }
  };

  const stopCapture = () => {
    stopRequestedRef.current = true;
    setCapturing(false);
    setSuggestionLoading(false);
    setStatus("Meeting translator stopped.");

    if (tabSilenceCleanupRef.current) {
      tabSilenceCleanupRef.current();
      tabSilenceCleanupRef.current = null;
    }

    if (micSilenceCleanupRef.current) {
      micSilenceCleanupRef.current();
      micSilenceCleanupRef.current = null;
    }

    [tabRecorderRef, micRecorderRef].forEach((ref) => {
      if (ref.current && ref.current.state !== "inactive") {
        try {
          ref.current.stop();
        } catch (_) {}
      }
      ref.current = null;
    });

    [tabStreamRef, micStreamRef].forEach((ref) => {
      if (ref.current) {
        ref.current.getTracks().forEach((track) => track.stop());
        ref.current = null;
      }
    });

    tabHasSoundRef.current = false;
    micHasSoundRef.current = false;
    tabRequestInFlightRef.current = false;
    micRequestInFlightRef.current = false;

    try {
      window.speechSynthesis?.cancel();
    } catch (_) {}
  };

  // ---------------------------------------------------------
  // TAB AUDIO LOOP
  // ---------------------------------------------------------

  const recordTabLoop = (stream) => {
    if (stopRequestedRef.current || !tabStreamRef.current) return;

    const audioTracks = stream.getAudioTracks();

    if (audioTracks.length === 0) return;

    const audioOnlyStream = new MediaStream(audioTracks);
    const mimeType = getSupportedMimeType();

    let recorder;

    try {
      recorder = mimeType
        ? new MediaRecorder(audioOnlyStream, { mimeType })
        : new MediaRecorder(audioOnlyStream);
    } catch (error) {
      console.error("Tab MediaRecorder error:", error);
      setStatus("Browser audio recorder support இல்லை.");
      return;
    }

    tabRecorderRef.current = recorder;

    let chunks = [];

    recorder.ondataavailable = (event) => {
      if (event.data?.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = chunks.length
        ? new Blob(chunks, {
            type: mimeType || "audio/webm",
          })
        : null;

      chunks = [];

      const hadSound = tabHasSoundRef.current;
      tabHasSoundRef.current = false;

      if (
        !stopRequestedRef.current &&
        tabStreamRef.current
      ) {
        recordTabLoop(tabStreamRef.current);
      }

      if (blob && hadSound && !stopRequestedRef.current) {
        handleTabAudioChunk(blob);
      }
    };

    recorder.onerror = (event) => {
      console.error("Tab recorder error:", event);
    };

    try {
      recorder.start();
    } catch (error) {
      console.error("Could not start tab recorder:", error);
      return;
    }

    setTimeout(() => {
      if (
        recorder.state !== "inactive" &&
        !stopRequestedRef.current
      ) {
        try {
          recorder.stop();
        } catch (_) {}
      }
    }, CHUNK_MS);
  };

  // ---------------------------------------------------------
  // MIC AUDIO LOOP
  // ---------------------------------------------------------

  const recordMicLoop = (stream) => {
    if (stopRequestedRef.current || !micStreamRef.current) return;

    const mimeType = getSupportedMimeType();

    let recorder;

    try {
      recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
    } catch (error) {
      console.error("Mic MediaRecorder error:", error);
      return;
    }

    micRecorderRef.current = recorder;

    let chunks = [];

    recorder.ondataavailable = (event) => {
      if (event.data?.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = chunks.length
        ? new Blob(chunks, {
            type: mimeType || "audio/webm",
          })
        : null;

      chunks = [];

      const hadSound = micHasSoundRef.current;
      micHasSoundRef.current = false;

      if (
        !stopRequestedRef.current &&
        micStreamRef.current
      ) {
        recordMicLoop(micStreamRef.current);
      }

      if (blob && hadSound && !stopRequestedRef.current) {
        handleMicAudioChunk(blob);
      }
    };

    recorder.onerror = (event) => {
      console.error("Mic recorder error:", event);
    };

    try {
      recorder.start();
    } catch (error) {
      console.error("Could not start mic recorder:", error);
      return;
    }

    setTimeout(() => {
      if (
        recorder.state !== "inactive" &&
        !stopRequestedRef.current
      ) {
        try {
          recorder.stop();
        } catch (_) {}
      }
    }, CHUNK_MS);
  };

  // ---------------------------------------------------------
  // BASE64
  // ---------------------------------------------------------

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = String(reader.result || "");
        resolve(result.includes(",") ? result.split(",")[1] : result);
      };

      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  // ---------------------------------------------------------
  // OTHER PERSON / TAB AUDIO
  // ---------------------------------------------------------

  const handleTabAudioChunk = async (blob) => {
    if (tabRequestInFlightRef.current) {
      return;
    }

    tabRequestInFlightRef.current = true;
    setSuggestionLoading(true);

    try {
      const base64 = await blobToBase64(blob);

      const response = await fetch(
        `${API_BASE_URL}/translate/audio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audioBase64: base64,
            mimeType: blob.type || "audio/webm",
            targetLang: myLang,
            source: "tab",
          }),
        }
      );

      if (response.status === 429) {
        setStatus(
          "⚠️ AI request limit வந்திருக்கு. கொஞ்சம் நேரம் wait பண்ணுங்க..."
        );
        setSuggestionLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Tab audio request failed: ${response.status}`
        );
      }

      const data = await response.json();

      const original = String(data.original || "").trim();
      const translated = String(data.translated || "").trim();

      const nextSuggestions = Array.isArray(data.suggestions)
        ? data.suggestions
            .filter(
              (item) =>
                item &&
                String(item.en || "").trim() &&
                String(item.own || "").trim()
            )
            .slice(0, 3)
            .map((item) => ({
              en: String(item.en).trim(),
              own: String(item.own).trim(),
            }))
        : [];

      // Suggestions come ONLY from the other person's latest statement.
      if (nextSuggestions.length > 0) {
        setSuggestions(nextSuggestions);
      } else if (original) {
        setSuggestions([]);
      }

      if (original) {
        const last = logRef.current[logRef.current.length - 1];

        const isDuplicate =
          last &&
          last.who === "client" &&
          last.original?.trim().toLowerCase() ===
            original.toLowerCase();

        if (!isDuplicate) {
          updateLog({
            who: "client",
            original,
            translated,
          });

          // Speak the selected-language translation of the other person.
          if (translated) {
            speak(translated, myLang);
          }

          setStatus(
            "They said → translated. Suggestions are ready for your reply."
          );
        }
      }
    } catch (error) {
      console.error("Tab chunk translate error:", error);
      setStatus("Audio processing error. Retrying with the next chunk...");
    } finally {
      tabRequestInFlightRef.current = false;
      setSuggestionLoading(false);
    }
  };

  // ---------------------------------------------------------
  // YOUR MIC
  // ---------------------------------------------------------

  const handleMicAudioChunk = async (blob) => {
    if (micRequestInFlightRef.current) {
      return;
    }

    micRequestInFlightRef.current = true;

    try {
      const base64 = await blobToBase64(blob);

      const response = await fetch(
        `${API_BASE_URL}/translate/audio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audioBase64: base64,
            mimeType: blob.type || "audio/webm",
            targetLang: "en",
            source: "mic",
          }),
        }
      );

      if (response.status === 429) {
        setStatus(
          "⚠️ AI request limit வந்திருக்கு. கொஞ்சம் நேரம் wait பண்ணுங்க..."
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Mic audio request failed: ${response.status}`
        );
      }

      const data = await response.json();

      const original = String(data.original || "").trim();
      const translated = String(data.translated || "").trim();

      if (original) {
        const last = logRef.current[logRef.current.length - 1];

        const isDuplicate =
          last &&
          last.who === "you" &&
          last.original?.trim().toLowerCase() ===
            original.toLowerCase();

        if (!isDuplicate) {
          updateLog({
            who: "you",
            original,
            translated,
          });

          // IMPORTANT:
          // Your speech must NOT replace the suggestions.
          // Suggestions belong to the other participant's latest speech.
          setStatus(
            "You said → English. Suggestions remain for the other person's latest message."
          );
        }
      }
    } catch (error) {
      console.error("Mic chunk translate error:", error);
    } finally {
      micRequestInFlightRef.current = false;
    }
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  return (
    <div className="meeting-page">
      <div className="meeting-hero">
        <div className="hero-badge">
          🎥 Live Meeting Translator
        </div>

        <h1>
          Translate Meetings in{" "}
          <span className="highlight">Your Own Language</span>
        </h1>

        <p className="meeting-subtitle">
          They speak → English transcript + your selected-language
          translation + reply suggestions.
          <br />
          You speak → English transcript.
        </p>
      </div>

      <div className="meeting-toolbar">
        <div className="lang-select-row">
          <span className="lang-icon">🌐</span>

          <select
            value={myLang}
            onChange={(event) => setMyLang(event.target.value)}
            disabled={capturing}
            aria-label="Translation language"
          >
            {LANGUAGES.map((language) => (
              <option
                key={language.code}
                value={language.code}
              >
                {language.label}
              </option>
            ))}
          </select>
        </div>

        {outputDevices.length > 0 && (
          <div className="lang-select-row">
            <span className="lang-icon">🔊</span>

            <select
              value={selectedOutput}
              onChange={(event) =>
                setSelectedOutput(event.target.value)
              }
              aria-label="Output device"
            >
              {outputDevices.map((device) => (
                <option
                  key={device.deviceId}
                  value={device.deviceId}
                >
                  {device.label || "Output device"}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="meeting-btn-row">
          {!capturing ? (
            <button
              className="start-btn"
              onClick={startCapture}
            >
              🎤 Start Meeting
            </button>
          ) : (
            <button
              className="end-btn"
              onClick={stopCapture}
            >
              ⏹ Stop Meeting
            </button>
          )}

          <button
            className="secondary-btn"
            onClick={clearConversation}
          >
            🧹 Clear
          </button>

          <button
            className="secondary-btn"
            onClick={loadOutputDevices}
            title="Refresh output devices"
          >
            🔄 Devices
          </button>
        </div>
      </div>

      {status && (
        <div className="status-bar">
          <span className={capturing ? "status-dot live" : "status-dot"} />
          <span>{status}</span>
        </div>
      )}

      {voiceWarning && (
        <div className="warning-bar">
          ⚠️ {voiceWarning}
        </div>
      )}

      <div className="meeting-grid">
        {/* LEFT: CONVERSATION */}
        <section className="conversation-panel">
          <div className="panel-header">
            <div>
              <h2>💬 Live Conversation</h2>
              <p>
                Both sides are shown here. New messages appear at the top.
              </p>
            </div>

            <span className="message-count">
              {log.length} message{log.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="conversation-scroll">
            {log.length === 0 ? (
              <div className="meeting-empty-box">
                <div className="empty-icon">🎙️</div>
                <h3>Ready for your meeting</h3>
                <p>
                  Click <b>Start Meeting</b>, share the meeting tab with
                  audio, then start talking.
                </p>
                <div className="flow-hint">
                  <span>👤 They speak</span>
                  <span>→</span>
                  <span>🌐 Translation</span>
                  <span>→</span>
                  <span>💡 Your replies</span>
                </div>
              </div>
            ) : (
              [...log].reverse().map((entry, reverseIndex) => {
                const index = log.length - 1 - reverseIndex;
                const isThey = entry.who === "client";

                return (
                  <article
                    className={`log-entry ${
                      isThey ? "from-them" : "from-you"
                    }`}
                    key={`${index}-${entry.original}`}
                  >
                    <div className="speaker-row">
                      <span className="speaker-label">
                        {isThey ? "👤 They said" : "🎙️ You said"}
                      </span>

                      <span className="message-index">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="original-text">
                      {entry.original}
                    </div>

                    <div className="translation-card">
                      <div className="translation-label">
                        {isThey
                          ? `🌐 ${LANGUAGES.find(
                              (language) =>
                                language.code === myLang
                            )?.label || "Translation"}`
                          : "🇬🇧 English"}
                      </div>

                      <div className="translation-row">
                        <p>{entry.translated}</p>

                        {entry.translated && (
                          <button
                            className="listen-btn"
                            onClick={() =>
                              speak(
                                entry.translated,
                                isThey ? myLang : "en"
                              )
                            }
                            type="button"
                          >
                            🔊 Listen
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* RIGHT: SUGGESTIONS */}
        <aside className="suggestions-panel">
          <div className="panel-header suggestions-header">
            <div>
              <h2>💡 Suggested Replies</h2>
              <p>
                Replies for <b>you</b>, based on what they just said.
              </p>
            </div>

            {suggestionLoading && (
              <span className="thinking-badge">
                Thinking…
              </span>
            )}
          </div>

          <div className="suggestions-scroll">
            {suggestions.length === 0 ? (
              <div className="suggestion-empty">
                <div className="empty-icon">💡</div>
                <h3>Your reply ideas will appear here</h3>
                <p>
                  Wait for the other participant to speak. Their latest
                  message will generate up to 3 context-specific replies.
                </p>
              </div>
            ) : (
              <div className="suggestion-list">
                {suggestions.map((item, index) => (
                  <button
                    type="button"
                    className="suggestion-card"
                    key={`${index}-${item.en}`}
                    onClick={() => speak(item.en, "en")}
                  >
                    <span className="suggestion-number">
                      {index + 1}
                    </span>

                    <span className="suggestion-content">
                      <span className="suggestion-en">
                        {item.en}
                      </span>

                      <span className="suggestion-own">
                        {LANGUAGES.find(
                          (language) =>
                            language.code === myLang
                        )?.label || "Selected language"}
                        : {item.own}
                      </span>
                    </span>

                    <span className="suggestion-listen">
                      🔊
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="suggestion-footer">
            <span>🎯 Context-based</span>
            <span>•</span>
            <span>3 replies max</span>
          </div>
        </aside>
      </div>

      <div className="meeting-note">
        ℹ️ The meeting translation is played through your system speaker.
        If you need the translated audio to enter the meeting as your
        microphone, use a virtual audio cable and select its output/input
        accordingly.
      </div>
    </div>
  );
}

// Support both import styles.
export { MeetingTranslator };