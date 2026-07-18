const axios = require("axios");

const CLAUDE_URL = "https://api.anthropic.com/v1/messages";

async function askClaude(systemPrompt, userMessage, maxTokens = 500) {
  try {
    const response = await axios.post(
      CLAUDE_URL,
      {
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
      }
    );
    const textBlock = response.data.content.find((c) => c.type === "text");
    return textBlock ? textBlock.text.trim() : "";
  } catch (err) {
    console.error("Claude API error:", err.response?.data || err.message);
    throw new Error("Claude API request failed");
  }
}

module.exports = { askClaude };