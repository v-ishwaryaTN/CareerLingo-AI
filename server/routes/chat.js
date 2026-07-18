const express = require("express");
const router = express.Router();
const { sendChatMessage, getChatHistory } = require("../controllers/chatController");
router.post("/", sendChatMessage);
router.get("/:sessionId", getChatHistory);
module.exports = router;