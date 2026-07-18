const { askClaude } = require("../utils/claude");

const LANGUAGE_NAMES = {
  ta: "Tamil", hi: "Hindi", te: "Telugu", kn: "Kannada", ml: "Malayalam",
  bn: "Bengali", mr: "Marathi", es: "Spanish", fr: "French", ar: "Arabic",
  zh: "Chinese", pt: "Portuguese",
};

const translateText = async (req, res) => {
  try {
    const { text, from, to } = req.body;
    if (!text || !from || !to) {
      return res.status(400).json({ error: "text, from and to are required" });
    }
    const fromName = from === "en" ? "English" : LANGUAGE_NAMES[from] || from;
    const toName = to === "en" ? "English" : LANGUAGE_NAMES[to] || to;
    const systemPrompt = `You are a precise translation engine for a career/workplace app.
Translate the user's message from ${fromName} to ${toName}.
Keep technical or professional terms in English even inside the translation.
Reply with ONLY the translated text. No explanations, no quotes, no preamble.`;
    const translated = await askClaude(systemPrompt, text, 300);
    res.json({ original: text, translated, from, to });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { translateText, LANGUAGE_NAMES };