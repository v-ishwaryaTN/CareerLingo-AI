import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./Dailychat.css";

// ======================================================
// API CONFIG
// ======================================================

// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000";

const API_URL = "http://localhost:5000";
  

// ======================================================
// LANGUAGES
// ======================================================

const languages = [
  {
    code: "ta",
    name: "தமிழ்",
    english: "Tamil",
    speechCode: "ta-IN",
  },
  {
    code: "te",
    name: "తెలుగు",
    english: "Telugu",
    speechCode: "te-IN",
  },
  {
    code: "ml",
    name: "മലയാളം",
    english: "Malayalam",
    speechCode: "ml-IN",
  },
  {
    code: "hi",
    name: "हिन्दी",
    english: "Hindi",
    speechCode: "hi-IN",
  },
  {
    code: "kn",
    name: "ಕನ್ನಡ",
    english: "Kannada",
    speechCode: "kn-IN",
  },
  {
    code: "bn",
    name: "বাংলা",
    english: "Bengali",
    speechCode: "bn-IN",
  },
  {
    code: "en",
    name: "English",
    english: "English",
    speechCode: "en-US",
  },
];

// ======================================================
// TRANSLATIONS
// ======================================================

const translations = {
  ta: {
    welcome:
      "வணக்கம்! இன்று English practice செய்ய தயாரா?",

    welcome2:
      "நீங்கள் English-ல் பேசலாம். நான் உங்கள் grammar மற்றும் sentence-ஐ improve செய்ய உதவுகிறேன்.",

    placeholder:
      "உங்கள் message-ஐ type செய்யுங்கள்...",

    listening:
      "கேட்கிறேன்... பேசுங்கள்",

    micError:
      "Microphone permission கொடுக்கவும்.",

    connectionError:
      "AI server-க்கு connect ஆகவில்லை. Backend server running-ல் இருக்கிறதா என்று check செய்யுங்கள்.",

    networkError:
      "Network error ஏற்பட்டுள்ளது. உங்கள் internet connection-ஐ check செய்யுங்கள்.",
  },

  te: {
    welcome:
      "నమస్కారం! ఈ రోజు English practice చేయడానికి సిద్ధంగా ఉన్నారా?",

    welcome2:
      "మీరు Englishలో మాట్లాడవచ్చు. నేను మీ grammar మరియు sentences improve చేయడానికి సహాయం చేస్తాను.",

    placeholder:
      "మీ message టైప్ చేయండి...",

    listening:
      "వింటున్నాను... మాట్లాడండి",

    micError:
      "Microphone permission ఇవ్వండి.",

    connectionError:
      "AI server కి connect కాలేదు. Backend server running లో ఉందో check చేయండి.",

    networkError:
      "Network error. మీ internet connection check చేయండి.",
  },

  ml: {
    welcome:
      "ഹലോ! ഇന്ന് English practice ചെയ്യാൻ തയ്യാറാണോ?",

    welcome2:
      "നിങ്ങൾക്ക് English-ൽ സംസാരിക്കാം. നിങ്ങളുടെ grammar, sentences എന്നിവ improve ചെയ്യാൻ ഞാൻ സഹായിക്കും.",

    placeholder:
      "നിങ്ങളുടെ message type ചെയ്യുക...",

    listening:
      "കേൾക്കുന്നു... സംസാരിക്കൂ",

    micError:
      "Microphone permission നൽകുക.",

    connectionError:
      "AI server-ലേക്ക് connect ചെയ്യാൻ കഴിഞ്ഞില്ല. Backend server running ആണോ എന്ന് check ചെയ്യുക.",

    networkError:
      "Network error. Internet connection check ചെയ്യുക.",
  },

  hi: {
    welcome:
      "नमस्ते! क्या आप आज English practice करने के लिए तैयार हैं?",

    welcome2:
      "आप English में बात कर सकते हैं। मैं आपकी grammar और sentences improve करने में मदद करूंगा।",

    placeholder:
      "अपना message type करें...",

    listening:
      "सुन रहा हूँ... बोलिए",

    micError:
      "Microphone permission दें।",

    connectionError:
      "AI server से connect नहीं हो सका। Backend server running है या नहीं check करें।",

    networkError:
      "Network error. अपना internet connection check करें।",
  },

  kn: {
    welcome:
      "ನಮಸ್ಕಾರ! ಇಂದು English practice ಮಾಡಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",

    welcome2:
      "ನೀವು English ನಲ್ಲಿ ಮಾತನಾಡಬಹುದು. ನಿಮ್ಮ grammar ಮತ್ತು sentences improve ಮಾಡಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",

    placeholder:
      "ನಿಮ್ಮ message type ಮಾಡಿ...",

    listening:
      "ಕೇಳುತ್ತಿದ್ದೇನೆ... ಮಾತನಾಡಿ",

    micError:
      "Microphone permission ನೀಡಿ.",

    connectionError:
      "AI server ಗೆ connect ಆಗಲಿಲ್ಲ. Backend server running ಇದೆಯೇ ಎಂದು check ಮಾಡಿ.",

    networkError:
      "Network error. Internet connection check ಮಾಡಿ.",
  },

  bn: {
    welcome:
      "হ্যালো! আজ English practice করতে প্রস্তুত?",

    welcome2:
      "আপনি English-এ কথা বলতে পারেন। আমি আপনার grammar এবং sentences improve করতে সাহায্য করব।",

    placeholder:
      "আপনার message type করুন...",

    listening:
      "শুনছি... বলুন",

    micError:
      "Microphone permission দিন।",

    connectionError:
      "AI server-এর সাথে connect করা যায়নি। Backend server running আছে কিনা check করুন।",

    networkError:
      "Network error. Internet connection check করুন।",
  },

  en: {
    welcome:
      "Hello! Are you ready for today's English practice?",

    welcome2:
      "You can speak naturally in English. I will help you improve your grammar, sentences, and communication skills.",

    placeholder:
      "Type your message...",

    listening:
      "I'm listening... Please speak",

    micError:
      "Please allow microphone permission.",

    connectionError:
      "I couldn't connect to the AI server. Please check whether your backend server is running.",

    networkError:
      "Network error. Please check your internet connection.",
  },
};

// ======================================================
// DEFAULT SUGGESTIONS
// ======================================================

const defaultSuggestions = [
  "Tell me about yourself",
  "What are your strengths?",
  "What did you do today?",
  "Why should we hire you?",
];

// ======================================================
// COMPONENT
// ======================================================

function Dailychat() {

  // ====================================================
  // STATES
  // ====================================================

  const [language, setLanguage] =
    useState("ta");

  const [messages, setMessages] =
    useState([
      {
        id: 1,
        sender: "ai",

        english:
          "Hello! Welcome to CareerLingo AI. Let's practice English together.",

        translated:
          translations.ta.welcome,
      },
    ]);

  const [input, setInput] =
    useState("");

  const [interimText, setInterimText] =
    useState("");

  const [isListening, setIsListening] =
    useState(false);

  const [isTyping, setIsTyping] =
    useState(false);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const [suggestions, setSuggestions] =
    useState(defaultSuggestions);

  const [error, setError] =
    useState("");

  // ====================================================
  // REFS
  // ====================================================

  const recognitionRef =
    useRef(null);

  const inputRef =
    useRef(null);

  const messagesEndRef =
    useRef(null);

  // ====================================================
  // CURRENT LANGUAGE
  // ====================================================

  const currentLanguage =
    translations[language];

  const selectedLanguage =
    languages.find(
      (item) =>
        item.code === language
    );

  // ====================================================
  // AUTO SCROLL
  // ====================================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, isTyping]);

  // ====================================================
  // CLEANUP
  // ====================================================

  useEffect(() => {

    return () => {

      if (recognitionRef.current) {

        recognitionRef.current.abort();

        recognitionRef.current = null;
      }

      if (
        window.speechSynthesis
      ) {

        window.speechSynthesis.cancel();
      }

    };

  }, []);

  // ====================================================
  // STOP LISTENING
  // ====================================================

  const stopListening = () => {

    if (recognitionRef.current) {

      recognitionRef.current.abort();

      recognitionRef.current = null;
    }

    setIsListening(false);

    setInterimText("");
  };

  // ====================================================
  // START VOICE
  // ====================================================

  const startVoiceChat = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    // Browser support
    if (!SpeechRecognition) {

      alert(
        "Voice recognition is not supported. Please use Google Chrome."
      );

      return;
    }

    // Already listening
    if (isListening) {

      stopListening();

      return;
    }

    // Stop AI speech
    stopSpeaking();

    setError("");

    const recognition =
      new SpeechRecognition();

    recognitionRef.current =
      recognition;

    // Selected language
    recognition.lang =
      selectedLanguage?.speechCode ||
      "en-US";

    // Voice settings
    recognition.continuous =
      false;

    recognition.interimResults =
      true;

    recognition.maxAlternatives =
      1;

    setIsListening(true);

    setInterimText("");

    // Start recognition
    try {

      recognition.start();

    } catch (error) {

      console.error(
        "Voice start error:",
        error
      );

      setIsListening(false);
    }

    // ==================================================
    // VOICE RESULT
    // ==================================================

    recognition.onresult = (
      event
    ) => {

      let finalText = "";

      let liveText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        const result =
          event.results[i];

        const transcript =
          result[0].transcript;

        if (
          result.isFinal
        ) {

          finalText +=
            transcript;

        } else {

          liveText +=
            transcript;
        }
      }

      // Live text
      if (liveText) {

        setInterimText(
          liveText
        );
      }

      // Final text
      if (finalText) {

        const cleanText =
          finalText.trim();

        setInput(
          (previousInput) => {

            if (
              !previousInput
            ) {

              return cleanText;
            }

            return `${previousInput} ${cleanText}`.trim();
          }
        );

        setInterimText("");
      }

    };

    // ==================================================
    // VOICE ERROR
    // ==================================================

    recognition.onerror = (
      event
    ) => {

      console.error(
        "Speech recognition error:",
        event.error
      );

      if (
        event.error ===
        "not-allowed"
      ) {

        setError(
          currentLanguage.micError
        );
      }

      if (
        event.error ===
        "network"
      ) {

        setError(
          currentLanguage.networkError
        );
      }

      setIsListening(false);

      setInterimText("");

      recognitionRef.current =
        null;
    };

    // ==================================================
    // VOICE END
    // ==================================================

    recognition.onend = () => {

      setIsListening(false);

      setInterimText("");

      recognitionRef.current =
        null;

    };

  };

  // ====================================================
  // STOP AI SPEAKING
  // ====================================================

  const stopSpeaking = () => {

    if (
      window.speechSynthesis
    ) {

      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  };

  // ====================================================
  // AI SPEAK
  // ====================================================

  const speakMessage = (
    text
  ) => {

    if (!text) {

      return;
    }

    if (
      !window.speechSynthesis
    ) {

      return;
    }

    // Stop previous speech
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    speech.lang =
      selectedLanguage?.speechCode ||
      "en-US";

    speech.rate =
      language === "en"
        ? 0.9
        : 0.95;

    speech.pitch = 1;

    speech.volume = 1;

    speech.onstart = () => {

      setIsSpeaking(true);
    };

    speech.onend = () => {

      setIsSpeaking(false);
    };

    speech.onerror = () => {

      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(
      speech
    );
  };

  // ====================================================
  // CHANGE LANGUAGE
  // ====================================================

  const handleLanguageChange = (
    event
  ) => {

    const selectedCode =
      event.target.value;

    stopListening();

    stopSpeaking();

    setError("");

    setLanguage(
      selectedCode
    );

    setMessages([
      {
        id: Date.now(),

        sender: "ai",

        english:
          "Hello! Welcome to CareerLingo AI. Let's practice English together.",

        translated:
          translations[
            selectedCode
          ].welcome,
      },

      {
        id:
          Date.now() + 1,

        sender: "ai",

        english:
          "You can speak naturally. I will help you improve your English communication skills.",

        translated:
          translations[
            selectedCode
          ].welcome2,
      },
    ]);

    setSuggestions(
      defaultSuggestions
    );

    setInput("");
  };

  // ====================================================
  // SEND MESSAGE
  // ====================================================

  const sendMessage = async () => {

    const userInput =
      input.trim();

    // Empty
    if (!userInput) {

      return;
    }

    // Prevent duplicate request
    if (isTyping) {

      return;
    }

    // Stop voice
    if (isListening) {

      stopListening();
    }

    // Clear previous error
    setError("");

    // ==================================================
    // USER MESSAGE
    // ==================================================

    const userMessage = {

      id: Date.now(),

      sender: "user",

      english:
        userInput,

      translated:
        userInput,
    };

    // Add user message
    setMessages(
      (previousMessages) => [

        ...previousMessages,

        userMessage,
      ]
    );

    // ==================================================
    // SAVE HISTORY BEFORE CLEAR
    // ==================================================

    const conversationHistory =
      messages.map(
        (message) => ({

          role:
            message.sender ===
            "user"
              ? "user"
              : "assistant",

          content:
            message.english,
        })
      );

    // ==================================================
    // CLEAR INPUT
    // ==================================================

    setInput("");

    setInterimText("");

    setIsTyping(true);

    try {

      // ==================================================
      // API REQUEST
      // ==================================================

      const response =
        await fetch(
          `${API_URL}/api/chat`,
          {

            method:
              "POST",

            headers: {

              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({

                message:
                  userInput,

                language:
                  language,

                mode:
                  "daily-english",

                conversation:
                  conversationHistory,
              }),
          }
        );

      console.log(
        "API STATUS:",
        response.status
      );

      // ==================================================
      // HTTP ERROR
      // ==================================================

      if (
        !response.ok
      ) {

        const errorText =
          await response.text();

        console.error(
          "Backend error:",
          errorText
        );

        throw new Error(
          `HTTP Error: ${response.status}`
        );
      }

      // ==================================================
      // JSON
      // ==================================================

      const data =
        await response.json();

      console.log(
        "AI RESPONSE:",
        data
      );

      // ==================================================
      // AI REPLY
      // ==================================================

      const aiReply =
        data.reply ||
        data.message ||
        "I understand. Can you tell me more?";

      const translatedReply =
        data.translation ||
        data.translated ||
        currentLanguage.welcome2;

      // ==================================================
      // SUGGESTIONS
      // ==================================================

      if (
        Array.isArray(
          data.suggestions
        ) &&
        data.suggestions.length
      ) {

        setSuggestions(
          data.suggestions
        );
      }

      // ==================================================
      // AI MESSAGE
      // ==================================================

      const aiMessage = {

        id:
          Date.now() + 1,

        sender:
          "ai",

        english:
          aiReply,

        translated:
          translatedReply,

        correction:
          data.correction ||
          "",

        betterEnglish:
          data.betterEnglish ||
          "",

        nextQuestion:
          data.nextQuestion ||
          "",
      };

      // ==================================================
      // ADD AI MESSAGE
      // ==================================================

      setMessages(
        (previousMessages) => [

          ...previousMessages,

          aiMessage,
        ]
      );

      // ==================================================
      // AUTO VOICE
      // ==================================================

      speakMessage(
        aiReply
      );

    } catch (error) {

      console.error(
        "BACKEND ERROR:",
        error
      );

      setError(
        currentLanguage.connectionError
      );

      // Error message
      const errorMessage = {

        id:
          Date.now() + 1,

        sender:
          "ai",

        english:
          currentLanguage.connectionError,

        translated:
          "Please check your backend server and API connection.",
      };

      setMessages(
        (previousMessages) => [

          ...previousMessages,

          errorMessage,
        ]
      );

    } finally {

      setIsTyping(false);
    }
  };

  // ====================================================
  // ENTER KEY
  // ====================================================

  const handleKeyDown = (
    event
  ) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();
    }
  };

  // ====================================================
  // SELECT SUGGESTION
  // ====================================================

  const selectSuggestion = (
    text
  ) => {

    setInput(text);

    setError("");

    setTimeout(() => {

      inputRef.current?.focus();

    }, 0);
  };

  // ====================================================
  // CLEAR CHAT
  // ====================================================

  const clearChat = () => {

    stopListening();

    stopSpeaking();

    setMessages([]);

    setInput("");

    setInterimText("");

    setError("");

    setSuggestions(
      defaultSuggestions
    );
  };

  // ====================================================
  // UI
  // ====================================================

  return (

    <div className="chat-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="chat-header">

        <div>

          <h1>
            💬 Daily English Practice
          </h1>

          <p>
            Practice English every day
            with CareerLingo AI
          </p>

        </div>

        <div className="chat-actions">

          {/* LANGUAGE */}

          <div className="language-box">

            <span>
              🌐
            </span>

            <select
              value={language}
              onChange={
                handleLanguageChange
              }
            >

              {languages.map(
                (lang) => (

                  <option
                    key={
                      lang.code
                    }
                    value={
                      lang.code
                    }
                  >

                    {lang.name} ·{" "}
                    {
                      lang.english
                    }

                  </option>

                )
              )}

            </select>

          </div>

          {/* CLEAR */}

          <button
            className="clear-btn"
            onClick={
              clearChat
            }
          >

            🗑 Clear

          </button>

        </div>

      </div>

      {/* ==================================================
          CHAT CONTAINER
      ================================================== */}

      <div className="chat-container">

        {/* INTRO */}

        <div className="chat-intro">

          <div className="bot-avatar">
            🤖
          </div>

          <div>

            <h3>
              CareerLingo AI
            </h3>

            <span className="online">
              ● Online · Your English
              Practice Partner
            </span>

          </div>

        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div className="chat-error">

            ⚠️ {error}

          </div>

        )}

        {/* ==================================================
            MESSAGES
        ================================================== */}

        <div className="messages">

          {messages.map(
            (message) => (

              <div
                key={
                  message.id
                }
                className={
                  message.sender ===
                  "user"
                    ? "message-row user-row"
                    : "message-row ai-row"
                }
              >

                {/* AI AVATAR */}

                {message.sender ===
                  "ai" && (

                  <div className="small-avatar">

                    🤖

                  </div>

                )}

                {/* MESSAGE */}

                <div
                  className={
                    message.sender ===
                    "user"
                      ? "message user-message"
                      : "message ai-message"
                  }
                >

                  {/* MAIN MESSAGE */}

                  <div className="message-english">

                    {
                      message.english
                    }

                  </div>

                  {/* TRANSLATION */}

                  {message.sender ===
                    "ai" && (

                    <div className="message-translation">

                      🌐{" "}

                      {
                        message.translated
                      }

                    </div>

                  )}

                  {/* CORRECTION */}

                  {message.correction && (

                    <div className="correction-box">

                      ✏️{" "}

                      <strong>
                        Correction:
                      </strong>

                      <br />

                      {
                        message.correction
                      }

                    </div>

                  )}

                  {/* BETTER ENGLISH */}

                  {message.betterEnglish && (

                    <div className="better-english-box">

                      💡{" "}

                      <strong>
                        Better English:
                      </strong>

                      <br />

                      {
                        message.betterEnglish
                      }

                    </div>

                  )}

                  {/* NEXT QUESTION */}

                  {message.nextQuestion && (

                    <div className="next-question-box">

                      ❓{" "}

                      <strong>
                        Next Question:
                      </strong>

                      <br />

                      {
                        message.nextQuestion
                      }

                    </div>

                  )}

                  {/* AI VOICE */}

                  {message.sender ===
                    "ai" && (

                    <div className="voice-buttons">

                      <button
                        className="speak-btn"
                        onClick={() =>
                          speakMessage(
                            message.english
                          )
                        }
                      >

                        🔊 Listen

                      </button>

                      {isSpeaking && (

                        <button
                          className="stop-btn"
                          onClick={
                            stopSpeaking
                          }
                        >

                          ⏹ Stop

                        </button>

                      )}

                    </div>

                  )}

                  {/* TIME */}

                  <span className="message-time">

                    {new Date().toLocaleTimeString(
                      [],
                      {
                        hour:
                          "2-digit",

                        minute:
                          "2-digit",
                      }
                    )}

                  </span>

                </div>

                {/* USER AVATAR */}

                {message.sender ===
                  "user" && (

                  <div className="small-avatar user-avatar">

                    👤

                  </div>

                )}

              </div>

            )
          )}

          {/* TYPING */}

          {isTyping && (

            <div className="typing-row">

              <div className="small-avatar">

                🤖

              </div>

              <div className="typing-box">

                <span></span>

                <span></span>

                <span></span>

              </div>

            </div>

          )}

          <div
            ref={
              messagesEndRef
            }
          />

        </div>

        {/* ==================================================
            LIVE VOICE
        ================================================== */}

        {isListening && (

          <div className="live-voice-text">

            <span className="voice-pulse">

              🔴

            </span>

            <span>

              {interimText ||
                currentLanguage.listening}

            </span>

          </div>

        )}

        {/* ==================================================
            SUGGESTIONS
        ================================================== */}

        <div className="suggestions">

          {suggestions.map(
            (
              suggestion,
              index
            ) => (

              <button
                key={
                  index
                }
                onClick={() =>
                  selectSuggestion(
                    suggestion
                  )
                }
              >

                💡{" "}

                {
                  suggestion
                }

              </button>

            )
          )}

        </div>

        {/* ==================================================
            INPUT
        ================================================== */}

        <div className="input-area">

          {/* TEXT INPUT */}

          <input
            ref={
              inputRef
            }
            type="text"
            value={
              input
            }
            onChange={(
              event
            ) =>
              setInput(
                event.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder={
              isListening
                ? currentLanguage.listening
                : currentLanguage.placeholder
            }
            disabled={
              isTyping
            }
          />

          {/* VOICE */}

          <button
            type="button"
            className={
              isListening
                ? "voice-btn listening"
                : "voice-btn"
            }
            onClick={
              startVoiceChat
            }
            disabled={
              isTyping
            }
          >

            {isListening
              ? "⏹ Stop"
              : "🎤 Voice"}

          </button>

          {/* SEND */}

          <button
            type="button"
            className="send-btn"
            onClick={
              sendMessage
            }
            disabled={
              !input.trim() ||
              isTyping
            }
          >

            {isTyping
              ? "AI Thinking..."
              : "Send 🚀"}

          </button>

        </div>

        {/* FOOTER */}

        <p className="chat-footer">

          💡 Speak naturally. CareerLingo AI
          will correct your English, improve
          your sentences and ask relevant
          questions.

        </p>

      </div>

    </div>
  );
}

export default Dailychat;