const { askClaude } = require("../utils/askClaude");
const InterviewAnswer = require("../models/InterviewAnswer");
const { LANGUAGE_NAMES } = require("./translateController");

const QUESTIONS = [
  "Tell me about yourself.",
  "What is the difference between let, const and var in JavaScript?",
  "How do you handle state in a React application?",
  "Describe a challenging bug you fixed recently.",
  "Why do you want to work at our company?",
];

const getQuestions = (req, res) => {
  res.json(QUESTIONS);
};

const submitAnswer = async (req, res) => {
  try {
    const { sessionId, question, answer, languageCode } = req.body;
    if (!sessionId || !question || !answer) {
      return res.status(400).json({ error: "sessionId, question and answer are required" });
    }
    const langName = LANGUAGE_NAMES[languageCode] || "Tamil";

    const feedbackEnglish = await askClaude(
      `You are a supportive interview coach. The candidate was asked: "${question}"
They answered: "${answer}"
Give 2-3 sentences of constructive feedback.`,
      answer, 250
    );
    const feedbackNative = await askClaude(
      `Translate this interview feedback from English to ${langName}. Keep technical terms in English.`,
      feedbackEnglish, 250
    );

    const saved = await InterviewAnswer.create({
      sessionId, question, answer, feedbackEnglish, feedbackNative, languageCode,
    });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getQuestions, submitAnswer };