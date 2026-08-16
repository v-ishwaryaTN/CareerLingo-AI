const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const ffmpegPath = require("ffmpeg-static");
const ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath(ffmpegPath);

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

/**
 * Function name stays "askClaude" so every controller (chat, interview,
 * resume, translate) works without changes — internally it now calls
 * the Gemini API using GEMINI_API_KEY from .env.
 */
async function askClaude(systemPrompt, userMessage, maxTokens = 500) {
  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\n${userMessage}` }],
          },
        ],
        generationConfig: {
          maxOutputTokens: maxTokens,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text ? text.trim() : "";
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    throw new Error("Gemini API request failed");
  }
}

/**
 * Gemini's generateContent only officially supports these audio MIME types
 * for inline_data: audio/wav, audio/mp3, audio/aiff, audio/aac, audio/ogg,
 * audio/flac. Browsers record via MediaRecorder as audio/webm, which is
 * NOT in that list — Gemini silently fails to parse it and falls back to
 * "no speech detected". So we transcode webm -> wav here before sending.
 */
function convertToWav(inputBase64, inputMimeType) {
  return new Promise((resolve, reject) => {
    const tmpDir = os.tmpdir();
    const id = crypto.randomBytes(8).toString("hex");

    const ext = inputMimeType.includes("ogg") ? "ogg" : "webm";
    const inputPath = path.join(tmpDir, `audio-in-${id}.${ext}`);
    const outputPath = path.join(tmpDir, `audio-out-${id}.wav`);

    fs.writeFile(inputPath, Buffer.from(inputBase64, "base64"), (writeErr) => {
      if (writeErr) return reject(writeErr);

      ffmpeg(inputPath)
        .audioCodec("pcm_s16le")
        .audioFrequency(16000)
        .audioChannels(1)
        .format("wav")
        .on("error", (ffmpegErr) => {
          cleanup();
          reject(ffmpegErr);
        })
        .on("end", () => {
          fs.readFile(outputPath, (readErr, data) => {
            cleanup();
            if (readErr) return reject(readErr);
            resolve(data.toString("base64"));
          });
        })
        .save(outputPath);

      function cleanup() {
        fs.unlink(inputPath, () => {});
        fs.unlink(outputPath, () => {});
      }
    });
  });
}

/**
 * Sends an audio clip to Gemini for transcription + translation in one call.
 * audioBase64: raw base64 string (no data: prefix), any browser-recorded format
 * mimeType: e.g. "audio/webm" (what the browser actually recorded)
 */
async function askClaudeAudio(systemPrompt, audioBase64, mimeType, maxTokens = 500) {
  try {
    // Only wav/mp3/aiff/aac/ogg/flac are officially supported — convert
    // anything else (webm, etc.) to wav first.
    const supportedTypes = ["audio/wav", "audio/mp3", "audio/aiff", "audio/aac", "audio/ogg", "audio/flac"];
    let finalBase64 = audioBase64;
    let finalMimeType = mimeType;

    if (!supportedTypes.includes(mimeType)) {
      console.log(`Converting unsupported audio type ${mimeType} -> audio/wav for Gemini`);
      finalBase64 = await convertToWav(audioBase64, mimeType);
      finalMimeType = "audio/wav";
    }

    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt },
              {
                inline_data: {
                  mime_type: finalMimeType,
                  data: finalBase64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: maxTokens,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text ? text.trim() : "";
  } catch (err) {
    console.error("Gemini audio API error:", err.response?.data || err.message);
    throw new Error("Gemini audio request failed");
  }
}

module.exports = { askClaude, askClaudeAudio };