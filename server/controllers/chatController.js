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

    const userTranslation = await askClaude(
      `Translate this text from ${langName} to English. Reply with only the translation.`,
      message, 200
    );
    const botReplyEnglish = await askClaude(
      `You are a friendly English-speaking workplace coach helping a non-native speaker practice daily English conversation.
The user said (translated to English): "${userTranslation}"
Reply in 1-2 short sentences.`,
      userTranslation, 200
    );
    const botReplyNative = await askClaude(
      `Translate this text from English to ${langName}. Keep workplace English terms in English. Reply with only the translation.`,
      botReplyEnglish, 200
    );

    const saved = await ChatMessage.create({
      sessionId, languageCode, userText: message, userTranslation, botReplyEnglish, botReplyNative,
    });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ sessionId: req.params.sessionId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendChatMessage, getChatHistory };