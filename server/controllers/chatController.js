// const { askClaude } = require("../utils/claude");
// const ChatMessage = require("../models/ChatMessage");
// const { LANGUAGE_NAMES } = require("./translateController");

// const sendChatMessage = async (req, res) => {
//   try {
//     const { sessionId, languageCode, message } = req.body;
//     if (!sessionId || !languageCode || !message) {
//       return res.status(400).json({ error: "sessionId, languageCode and message are required" });
//     }
//     const langName = LANGUAGE_NAMES[languageCode] || languageCode;

//     const userTranslation = await askClaude(
//       `Translate this text from ${langName} to English. Reply with only the translation.`,
//       message, 200
//     );
//     const botReplyEnglish = await askClaude(
//       `You are a friendly English-speaking workplace coach helping a non-native speaker practice daily English conversation.
// The user said (translated to English): "${userTranslation}"
// Reply in 1-2 short sentences.`,
//       userTranslation, 200
//     );
//     const botReplyNative = await askClaude(
//       `Translate this text from English to ${langName}. Keep workplace English terms in English. Reply with only the translation.`,
//       botReplyEnglish, 200
//     );

//     const saved = await ChatMessage.create({
//       sessionId, languageCode, userText: message, userTranslation, botReplyEnglish, botReplyNative,
//     });
//     res.json(saved);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const getChatHistory = async (req, res) => {
//   try {
//     const messages = await ChatMessage.find({ sessionId: req.params.sessionId }).sort({ createdAt: 1 });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { sendChatMessage, getChatHistory };

const { askClaude } = require("../utils/claude");
const ChatMessage = require("../models/ChatMessage");
const { LANGUAGE_NAMES } = require("./translateController");

const sendChatMessage = async (req, res) => {
  try {
    const { sessionId, languageCode, message } = req.body;
    if (!sessionId || !languageCode || !message) {
      return res.status(400).json({ error: "sessionId, languageCode and message are required" });
    }
    const langName = LANGUAGE_NAMES[languageCode] || languageCode;

    // Single combined call instead of 3 sequential ones:
    // 1) translate the user's message to English
    // 2) reply as a workplace English coach
    // 3) translate that reply back to the user's language
    const systemPrompt = `You are a friendly English-speaking workplace coach helping a non-native
speaker (native language: ${langName}) practice daily English conversation.

The user wrote you a message in ${langName}. Do all of the following:
1. Translate the user's message into natural English (userTranslation).
2. As the coach, reply in English in 1-2 short, natural sentences that
   continue the conversation (botReplyEnglish).
3. Translate your English reply into ${langName}, keeping common workplace
   English terms in English (botReplyNative).

Respond with ONLY valid JSON, no markdown, no code fences, no extra text,
in exactly this shape:
{"userTranslation": "...", "botReplyEnglish": "...", "botReplyNative": "..."}`;

    const raw = await askClaude(systemPrompt, message, 500);

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const cleaned = jsonMatch ? jsonMatch[0] : raw.replace(/```json|```/gi, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Chat JSON parse failed. Raw response was:\n", raw);
      return res.status(502).json({
        error: "AI response could not be understood. Please try again.",
      });
    }

    const userTranslation = parsed.userTranslation || message;
    const botReplyEnglish = parsed.botReplyEnglish || "I understand. Can you tell me more?";
    const botReplyNative = parsed.botReplyNative || botReplyEnglish;

    const saved = await ChatMessage.create({
      sessionId,
      languageCode,
      userText: message,
      userTranslation,
      botReplyEnglish,
      botReplyNative,
    });

    res.json(saved);
  } catch (err) {
    console.error("sendChatMessage error:", err);
    res.status(500).json({ error: err.message || "Failed to process chat message" });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ sessionId: req.params.sessionId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error("getChatHistory error:", err);
    res.status(500).json({ error: err.message || "Failed to fetch chat history" });
  }
};

module.exports = { sendChatMessage, getChatHistory };