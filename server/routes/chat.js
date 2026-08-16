// // const express = require("express");
// // const router = express.Router();
// // const { askClaude } = require("../utils/askClaude");

// // // Map short language codes -> full names for the prompt
// // const languageNames = {
// //   ta: "Tamil",
// //   te: "Telugu",
// //   ml: "Malayalam",
// //   hi: "Hindi",
// //   kn: "Kannada",
// //   bn: "Bengali",
// //   en: "English",
// // };

// // router.post("/", async (req, res) => {
// //   try {
// //     const { message, language, conversation, mode } = req.body;

// //     console.log("CHAT REQUEST:", message);

// //     if (!message) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Message is required",
// //       });
// //     }

// //     const nativeLanguage = languageNames[language] || "Tamil";

// //     // Build a short conversation history string for context
// //     const history = Array.isArray(conversation)
// //       ? conversation
// //           .filter((m) => m.content && (m.role === "user" || m.role === "assistant"))
// //           .slice(-10) // keep last 10 turns to stay light
// //       : [];

// //     const historyText = history
// //       .map((m) => `${m.role === "user" ? "Learner" : "Coach"}: ${m.content}`)
// //       .join("\n");

// //     const systemPrompt = `You are CareerLingo AI, a friendly and encouraging English speaking practice coach for a learner whose native language is ${nativeLanguage}.

// // ${historyText ? `Recent conversation so far:\n${historyText}\n` : ""}
// // The learner just said: "${message}"

// // Your job:
// // 1. Continue the conversation naturally in English (reply).
// // 2. Translate your reply into ${nativeLanguage} (translation).
// // 3. If the learner's sentence had grammar/spelling mistakes, give the corrected version (correction). If it was already correct, return an empty string.
// // 4. Suggest a more natural/fluent way to phrase what they said, if useful (betterEnglish). If not needed, return an empty string.
// // 5. Ask a relevant follow-up question to keep the practice going (nextQuestion).
// // 6. Give 3 short example replies the learner could tap to respond (suggestions), as an array of strings.

// // Respond with ONLY valid JSON, no markdown formatting, no code fences, no extra text outside the JSON object. Use exactly this shape:

// // {
// //   "reply": "...",
// //   "translation": "...",
// //   "correction": "...",
// //   "betterEnglish": "...",
// //   "nextQuestion": "...",
// //   "suggestions": ["...", "...", "..."]
// // }`;

// //     const raw = await askClaude(systemPrompt, message, 600);

// //     // Extract just the JSON object even if Gemini adds extra text around it
// //     const jsonMatch = raw.match(/\{[\s\S]*\}/);
// //     const cleaned = jsonMatch ? jsonMatch[0] : raw.replace(/```json|```/g, "").trim();

// //     let aiData;
// //     try {
// //       aiData = JSON.parse(cleaned);
// //     } catch (parseError) {
// //       console.error("JSON PARSE ERROR:", parseError, "RAW:", raw);
// //       // Fallback: still return something usable instead of failing hard
// //       aiData = {
// //         reply: raw || "I understand. Can you tell me more?",
// //         translation: "",
// //         correction: "",
// //         betterEnglish: "",
// //         nextQuestion: "Can you tell me more?",
// //         suggestions: ["Tell me more", "Give me an example", "Why do you think so?"],
// //       };
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       reply: aiData.reply || "I understand. Can you tell me more?",
// //       translation: aiData.translation || "",
// //       correction: aiData.correction || "",
// //       betterEnglish: aiData.betterEnglish || "",
// //       nextQuestion: aiData.nextQuestion || "",
// //       suggestions:
// //         Array.isArray(aiData.suggestions) && aiData.suggestions.length
// //           ? aiData.suggestions
// //           : ["Tell me more", "Give me an example", "Why do you think so?"],
// //     });
// //   } catch (error) {
// //     console.error("CHAT ERROR:", error);

// //     return res.status(500).json({
// //       success: false,
// //       message: "Internal server error",
// //     });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { askClaude } = require("../utils/askClaude");

// const languageNames = {
//   ta: "Tamil", te: "Telugu", ml: "Malayalam",
//   hi: "Hindi", kn: "Kannada", bn: "Bengali", en: "English",
// };

// router.post("/", async (req, res) => {
//   try {
//     const { message, language, conversation } = req.body;
//     console.log("CHAT REQUEST:", message);

//     if (!message) {
//       return res.status(400).json({ success: false, message: "Message is required" });
//     }

//     const nativeLanguage = languageNames[language] || "Tamil";
//     const history = Array.isArray(conversation)
//       ? conversation.filter((m) => m.content && (m.role === "user" || m.role === "assistant")).slice(-10)
//       : [];
//     const historyText = history.map((m) => `${m.role === "user" ? "Learner" : "Coach"}: ${m.content}`).join("\n");

//     const systemPrompt = `You are CareerLingo AI, a friendly English speaking practice coach for a learner whose native language is ${nativeLanguage}.
// ${historyText ? `Recent conversation:\n${historyText}\n` : ""}
// The learner just said: "${message}"

// Reply with ONLY valid JSON, no markdown, no extra text, exactly this shape:
// {
//   "reply": "...",
//   "translation": "...",
//   "correction": "...",
//   "betterEnglish": "...",
//   "nextQuestion": "...",
//   "suggestions": ["...", "...", "..."]
// }`;

//     const raw = await askClaude(systemPrompt, message, 1000);
//     const jsonMatch = raw.match(/\{[\s\S]*\}/);
//     const cleaned = jsonMatch ? jsonMatch[0] : raw.replace(/```json|```/g, "").trim();

//     let aiData;
//     try {
//       aiData = JSON.parse(cleaned);
//     } catch (parseError) {
//       console.error("JSON PARSE ERROR:", parseError, "RAW:", raw);
//       aiData = {
//         reply: raw || "I understand. Can you tell me more?",
//         translation: "", correction: "", betterEnglish: "",
//         nextQuestion: "Can you tell me more?",
//         suggestions: ["Tell me more", "Give me an example", "Why do you think so?"],
//       };
//     }

//     return res.status(200).json({
//       success: true,
//       reply: aiData.reply || "I understand. Can you tell me more?",
//       translation: aiData.translation || "",
//       correction: aiData.correction || "",
//       betterEnglish: aiData.betterEnglish || "",
//       nextQuestion: aiData.nextQuestion || "",
//       suggestions: Array.isArray(aiData.suggestions) && aiData.suggestions.length
//         ? aiData.suggestions
//         : ["Tell me more", "Give me an example", "Why do you think so?"],
//     });
//   } catch (error) {
//     console.error("CHAT ERROR:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { askClaude } = require("../utils/askClaude");

const languageNames = {
  ta: "Tamil", te: "Telugu", ml: "Malayalam",
  hi: "Hindi", kn: "Kannada", bn: "Bengali", en: "English",
};

router.post("/", async (req, res) => {
  try {
    const { message, language, conversation } = req.body;
    console.log("CHAT REQUEST:", message);

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const nativeLanguage = languageNames[language] || "Tamil";
    const history = Array.isArray(conversation)
      ? conversation.filter((m) => m.content && (m.role === "user" || m.role === "assistant")).slice(-10)
      : [];
    const historyText = history.map((m) => `${m.role === "user" ? "Learner" : "Coach"}: ${m.content}`).join("\n");

    const systemPrompt = `You are CareerLingo AI, a friendly English practice coach for a learner whose native language is ${nativeLanguage}.
${historyText ? `Recent conversation:\n${historyText}\n` : ""}
The learner just said: "${message}"

IMPORTANT LENGTH LIMITS (follow strictly, so the JSON always stays short and complete):
- "reply": maximum 2 short sentences (about 25 words).
- "translation": the ${nativeLanguage} translation of "reply" only — not a grammar explanation, just the translation itself, same short length.
- "correction": maximum 1 short sentence, or "" if nothing to correct.
- "betterEnglish": maximum 1 short sentence, or "" if not needed.
- "nextQuestion": maximum 1 short sentence.
- "suggestions": exactly 3 very short phrases (2-4 words each).

Reply with ONLY valid JSON, no markdown, no extra text, exactly this shape:
{
  "reply": "...",
  "translation": "...",
  "correction": "...",
  "betterEnglish": "...",
  "nextQuestion": "...",
  "suggestions": ["...", "...", "..."]
}`;

    const raw = await askClaude(systemPrompt, message, 1500);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const cleaned = jsonMatch ? jsonMatch[0] : raw.replace(/```json|```/g, "").trim();

    let aiData;
    let parseFailed = false;

    try {
      aiData = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON PARSE ERROR:", parseError, "RAW:", raw);
      parseFailed = true;
      aiData = {
        reply: "Sorry, I couldn't process that fully. Could you say that again?",
        translation: "",
        correction: "",
        betterEnglish: "",
        nextQuestion: "Can you tell me more?",
        suggestions: ["Tell me more", "Give me an example", "Why do you think so?"],
      };
    }

    // Safety net: never let a raw/partial JSON string leak into the reply field,
    // even if JSON.parse happened to succeed on a malformed-but-parseable fragment.
    if (!parseFailed && typeof aiData.reply === "string" && aiData.reply.trim().startsWith("{")) {
      aiData.reply = "Sorry, I couldn't process that fully. Could you say that again?";
      aiData.translation = "";
    }

    return res.status(200).json({
      success: true,
      reply: aiData.reply || "I understand. Can you tell me more?",
      translation: aiData.translation || "",
      correction: aiData.correction || "",
      betterEnglish: aiData.betterEnglish || "",
      nextQuestion: aiData.nextQuestion || "",
      suggestions: Array.isArray(aiData.suggestions) && aiData.suggestions.length
        ? aiData.suggestions
        : ["Tell me more", "Give me an example", "Why do you think so?"],
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;