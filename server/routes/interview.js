const express = require("express");
const router = express.Router();
const { getQuestions, submitAnswer } = require("../controllers/interviewController");
router.get("/questions", getQuestions);
router.post("/feedback", submitAnswer);
module.exports = router;