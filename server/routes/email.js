const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/generate", emailController.generateEmail);

module.exports = router;