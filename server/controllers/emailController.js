const { askClaude } = require("../utils/askClaude");

const LANGUAGE_NAMES = {
  en: "English",
  ta: "Tamil",
  hi: "Hindi",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  bn: "Bengali",
  mr: "Marathi",
  es: "Spanish",
  fr: "French",
  ar: "Arabic",
  zh: "Chinese",
  pt: "Portuguese",
};

exports.generateEmail = async (req, res) => {
  const { prompt, tone, language } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt kaali irukka koodathu" });
  }

  const langName = LANGUAGE_NAMES[language] || "English";

  try {
    const systemPrompt = `You are an email-writing assistant. Write a professional, ready-to-send email based on the user's request below.
Tone: ${tone || "professional"}.
Write the ENTIRE email (subject and body) in ${langName} language.
Respond ONLY in strict JSON format, no markdown, no code fences, no extra text:
{"subject": "short subject line in ${langName}", "body": "full email body in ${langName} with proper greeting and sign-off"}`;

    const rawText = await askClaude(systemPrompt, prompt, 800);
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      parsed = { subject: "Draft Email", body: rawText };
    }

    res.json({ subject: parsed.subject, body: parsed.body });
  } catch (err) {
    console.error("generateEmail error:", err.message);
    res.status(500).json({ error: "Server error - email generate panna mudiyala" });
  }
};