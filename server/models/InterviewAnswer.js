const mongoose = require("mongoose");

const interviewAnswerSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    feedbackEnglish: { type: String },
    feedbackNative: { type: String },
    languageCode: { type: String, default: "ta" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InterviewAnswer", interviewAnswerSchema);