const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    languageCode: { type: String, required: true },
    userText: { type: String, required: true },
    userTranslation: { type: String },
    botReplyEnglish: { type: String },
    botReplyNative: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatMessage", chatMessageSchema);