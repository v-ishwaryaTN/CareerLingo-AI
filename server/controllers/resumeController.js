const { askClaude } = require("../utils/claude");

const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) return res.status(400).json({ error: "resumeText is required" });

    const systemPrompt = `You are a resume reviewer for IT/tech job applicants.
Analyze the resume text below and respond ONLY in this exact JSON format, no extra text:
{
  "score": <number 0-100>,
  "strengths": ["...", "..."],
  "improvements": ["...", "..."]
}`;

    const raw = await askClaude(systemPrompt, resumeText, 500);
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: "Could not analyze resume: " + err.message });
  }
};

module.exports = { analyzeResume };