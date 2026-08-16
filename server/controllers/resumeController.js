const { askClaude } = require("../utils/claude.js");

async function analyzeResume(req, res) {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ error: "Resume text is required" });
    }

    const systemPrompt = `You are an expert resume reviewer. Analyze the given resume and respond ONLY with valid JSON, no extra text, no markdown, in this exact format:
{"strengths": ["point1", "point2"], "weaknesses": ["point1", "point2"], "suggestions": ["point1", "point2"], "overallScore": 75}`;

    const rawResponse = await askClaude(systemPrompt, resumeText, 1500, true);

    let cleanText = rawResponse.trim();
    cleanText = cleanText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();

    const firstBrace = cleanText.indexOf("{");
    const lastBrace = cleanText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }

    let analysis;
    try {
      analysis = JSON.parse(cleanText);
    } catch (parseErr) {
      console.error("Failed to parse Gemini response as JSON:", cleanText);
      return res.status(500).json({ error: "AI response was not valid JSON. Please try again." });
    }

    return res.status(200).json(analysis);
  } catch (err) {
    console.error("Error analyzing resume:", err.message);
    return res.status(500).json({ error: "Could not analyze resume: " + err.message });
  }
}

module.exports = { analyzeResume };