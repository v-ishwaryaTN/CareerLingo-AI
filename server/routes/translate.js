const express = require("express");

const router = express.Router();

const {
  translateText,
  suggestReply,
  transcribeAndTranslate,
  health,
} = require("../controllers/translateController");

router.post("/", translateText);

router.post(
  "/suggest",
  suggestReply
);

router.post(
  "/audio",
  transcribeAndTranslate
);

router.get(
  "/health",
  health
);

module.exports = router;