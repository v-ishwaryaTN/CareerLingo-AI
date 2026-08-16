
// // // ======================================================
// // // server/routes/resume.js
// // // POST /api/resume/generate  -> builds a full resume from candidate details
// // // POST /api/resume/analyze   -> analyzes pasted resume text & returns score/feedback
// // // ======================================================
// // const express = require("express");
// // const router = express.Router();
// // const { askClaude } = require("../utils/askClaude");

// // const LANGUAGE_NAMES = {
// //   en: "English",
// //   ta: "Tamil",
// //   hi: "Hindi",
// //   te: "Telugu",
// //   kn: "Kannada",
// //   ml: "Malayalam",
// //   bn: "Bengali",
// //   mr: "Marathi",
// // };

// // // ------------------------------------------------------
// // // POST /api/resume/generate
// // // Body: { fullName, email, phone, location, linkedin,
// // //         summary, education, experience, skills, jobDescription }
// // // ------------------------------------------------------
// // router.post("/generate", async (req, res) => {
// //   try {
// //     const {
// //       fullName,
// //       email,
// //       phone,
// //       location,
// //       linkedin,
// //       summary,
// //       education,
// //       experience,
// //       skills,
// //       jobDescription,
// //     } = req.body;

// //     if (!fullName || !email) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "fullName and email are required",
// //       });
// //     }

// //     const systemPrompt = `
// // You are an expert resume writer who builds ATS-friendly resumes that get
// // candidates shortlisted by recruiters. Using the candidate details given,
// // write a complete, polished, ready-to-use resume in clean plain text
// // (no markdown tables, no images, no multi-column layout).

// // RULES YOU MUST FOLLOW:
// // 1. Single-column, ATS-friendly layout only.
// // 2. Standard section headings exactly: SUMMARY, SKILLS, EXPERIENCE, EDUCATION
// //    (add PROJECTS or CERTIFICATIONS only if the candidate provided that info).
// // 3. Under SUMMARY: 2-3 lines, professional tone, mention role/field and
// //    years of experience if inferable from the data given.
// // 4. Under EXPERIENCE: convert plain duty descriptions into achievement-style
// //    bullet points. Add quantifiable impact wherever reasonably inferable —
// //    do NOT invent fake statistics; phrase for impact without a fake number
// //    if nothing supports it.
// // 5. Under SKILLS: clean comma-separated or short-line list, grouped by
// //    category if there are many (e.g. "Technical:", "Tools:").
// // 6. Reverse chronological order (most recent first) for EXPERIENCE and EDUCATION.
// // 7. If a target job description is provided, naturally incorporate its
// //    important keywords/tools where truthful and relevant — never fabricate
// //    skills the candidate didn't mention.
// // 8. No first-person pronouns. No generic filler adjectives like
// //    "hardworking" or "team player" without evidence.
// // 9. Keep it to one page worth of content unless experience is extensive.
// // 10. Output ONLY the final resume text, ready to copy-paste. No preamble,
// //     no explanation, no markdown symbols like ** or #.
// //     `.trim();

// //     const userMessage = `
// // CANDIDATE DETAILS:
// // Full Name: ${fullName}
// // Email: ${email}
// // Phone: ${phone || "N/A"}
// // Location: ${location || "N/A"}
// // LinkedIn: ${linkedin || "N/A"}

// // Existing summary/notes from candidate (may be rough, rewrite properly):
// // ${summary || "N/A"}

// // Education:
// // ${education || "N/A"}

// // Experience:
// // ${experience || "N/A"}

// // Skills:
// // ${skills || "N/A"}

// // ${jobDescription ? `Target Job Description (use for keyword alignment):\n${jobDescription}` : ""}
// //     `.trim();

// //     const resumeText = await askClaude(systemPrompt, userMessage, 1500, false);

// //     return res.status(200).json({
// //       success: true,
// //       resume: resumeText,
// //     });
// //   } catch (error) {
// //     console.error("Resume generate error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message || "Failed to generate resume",
// //     });
// //   }
// // });

// // // ------------------------------------------------------
// // // POST /api/resume/analyze
// // // Body: { resumeText, languageCode }
// // // ------------------------------------------------------
// // router.post("/analyze", async (req, res) => {
// //   try {
// //     const { resumeText, languageCode } = req.body;

// //     if (!resumeText || !resumeText.trim()) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "resumeText is required",
// //       });
// //     }

// //     const langName = LANGUAGE_NAMES[languageCode] || "English";

// //     const systemPrompt = `
// // You are an expert resume reviewer. Analyze the resume text given below and
// // return your feedback STRICTLY as a valid JSON object with this exact shape
// // and nothing else (no markdown, no preamble, no code fences):

// // {
// //   "score": <number 0-100>,
// //   "strengths": ["point 1", "point 2", ...],
// //   "improvements": ["point 1", "point 2", ...]
// // }

// // Write the strengths and improvements in ${langName}. Be specific and
// // practical. Do not include any text outside the JSON object.
// //     `.trim();

// //     const raw = await askClaude(systemPrompt, resumeText, 1200, false);

// //     // Extract just the JSON object even if Gemini adds extra text around it
// //     const jsonMatch = raw.match(/\{[\s\S]*\}/);
// //     const cleaned = jsonMatch ? jsonMatch[0] : raw.replace(/```json|```/g, "").trim();

// //     let parsed;
// //     try {
// //       parsed = JSON.parse(cleaned);
// //     } catch (parseErr) {
// //       console.error("Failed to parse resume analysis JSON. Raw response was:\n", raw);
// //       return res.status(500).json({
// //         success: false,
// //         message: "Could not parse analysis result",
// //       });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       score: parsed.score,
// //       strengths: parsed.strengths || [],
// //       improvements: parsed.improvements || [],
// //     });
// //   } catch (error) {
// //     console.error("Resume analyze error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message || "Failed to analyze resume",
// //     });
// //   }
// // });

// // module.exports = router;


// // ======================================================
// // server/routes/resume.js
// // POST /api/resume/generate  -> builds a full resume from candidate details
// // POST /api/resume/analyze   -> analyzes pasted resume text & returns score/feedback
// // ======================================================
// const express = require("express");
// const router = express.Router();
// const { askClaude } = require("../utils/askClaude");

// const LANGUAGE_NAMES = {
//   en: "English",
//   ta: "Tamil",
//   hi: "Hindi",
//   te: "Telugu",
//   kn: "Kannada",
//   ml: "Malayalam",
//   bn: "Bengali",
//   mr: "Marathi",
// };

// // ------------------------------------------------------
// // POST /api/resume/generate
// // Body: { fullName, email, phone, location, linkedin,
// //         summary, education, experience, skills, jobDescription }
// // ------------------------------------------------------
// router.post("/generate", async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       phone,
//       location,
//       linkedin,
//       summary,
//       education,
//       experience,
//       skills,
//       jobDescription,
//     } = req.body;

//     if (!fullName || !email) {
//       return res.status(400).json({
//         success: false,
//         message: "fullName and email are required",
//       });
//     }

//     // Detect fresher / no-experience candidates so the prompt can
//     // adapt tone instead of forcing fake "years of experience" language.
//     const noExperienceProvided =
//       !experience ||
//       /^\s*0\s*(years?|yrs?)?\s*$/i.test(experience.trim()) ||
//       /no experience/i.test(experience);

//     const systemPrompt = `
// You are an expert resume writer who builds ATS-friendly resumes that get
// candidates shortlisted by recruiters. Using the candidate details given,
// write a complete, polished, ready-to-use resume in clean plain text
// (no markdown tables, no images, no multi-column layout, no asterisks or
// hash symbols anywhere in the output).

// RULES YOU MUST FOLLOW:

// 1. Single-column, ATS-friendly layout only.

// 2. Use these exact section headings, each on its own line, in this order,
//    and ALWAYS include a blank line after every heading:
//    SUMMARY
//    SKILLS
//    ${noExperienceProvided ? "PROJECTS" : "EXPERIENCE"}
//    EDUCATION
//    (add CERTIFICATIONS at the end only if the candidate provided that info)

// 3. SUMMARY: exactly 2-3 lines. ${
//       noExperienceProvided
//         ? `This candidate has no formal work experience yet (student / fresher). 
//            Frame the summary around their field of study, the specific skills/stack
//            they know, and genuine enthusiasm backed by what they've built or learned —
//            never say "0 years of experience" and never apologize for being a fresher.
//            Use a confident title like "Aspiring <Role>" or "<Field> Graduate" instead.`
//         : `Mention their role/field and years of experience as inferable from the data.`
//     }

// 4. SKILLS: group into short labeled lines when there are several distinct
//    categories (e.g. "Languages:", "Frameworks:", "Tools:", "Database:").
//    Comma-separate within each line. Do not invent skills not implied by
//    the candidate's input.

// 5. ${
//       noExperienceProvided
//         ? `PROJECTS: Turn whatever project/coursework/stack info the candidate gave
//            into 2-4 achievement-style bullet points per project (what was built,
//            which technologies, what it does). If the candidate gave only a target
//            stack/role with no specific project, construct ONE plausible, clearly
//            labeled academic/practice project consistent with that stack, phrased
//            so it reads as real hands-on work — but do not claim a specific employer,
//            client, or fabricated metrics.`
//         : `EXPERIENCE: convert plain duty descriptions into achievement-style bullet
//            points, most recent role first. Add quantifiable impact wherever reasonably
//            inferable — do NOT invent fake statistics; phrase for impact without a
//            fake number if nothing supports it.`
//     }

// 6. EDUCATION: reverse chronological order (most recent first). Include
//    degree, field, and year/status exactly as given (e.g. "3rd year", 
//    "Final year", "Graduated 2023") — never invent a graduation year.

// 7. If a target job description is provided, naturally incorporate its
//    important keywords/tools into SUMMARY/SKILLS/PROJECTS or EXPERIENCE
//    wherever truthful and relevant — never fabricate skills the candidate
//    didn't mention.

// 8. No first-person pronouns ("I", "my"). No generic filler adjectives like
//    "hardworking" or "team player" without a concrete bullet backing it up.

// 9. Keep it to one page worth of content unless experience is extensive.

// 10. Output ONLY the final resume text, ready to copy-paste, starting
//     directly with the candidate's name on the first line. No preamble,
//     no explanation, no markdown symbols, no trailing commentary after
//     the resume ends.
//     `.trim();

//     const userMessage = `
// CANDIDATE DETAILS:
// Full Name: ${fullName}
// Email: ${email}
// Phone: ${phone || "N/A"}
// Location: ${location || "N/A"}
// LinkedIn: ${linkedin && linkedin.includes("/checkpoint/") ? "N/A (link was invalid/broken, omit it)" : linkedin || "N/A"}

// Existing summary/notes from candidate (may be rough, rewrite properly):
// ${summary || "N/A"}

// Education:
// ${education || "N/A"}

// Experience:
// ${experience || "N/A"}

// Skills:
// ${skills || "N/A"}

// ${jobDescription ? `Target Job Description (use for keyword alignment):\n${jobDescription}` : ""}
//     `.trim();

//     // 2200 tokens gives enough headroom for SUMMARY + SKILLS + PROJECTS/EXPERIENCE
//     // + EDUCATION without truncating mid-sentence for longer candidate inputs.
//     const resumeText = await askClaude(systemPrompt, userMessage, 2200, false);

//     return res.status(200).json({
//       success: true,
//       resume: resumeText.trim(),
//     });
//   } catch (error) {
//     console.error("Resume generate error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to generate resume",
//     });
//   }
// });

// // ------------------------------------------------------
// // POST /api/resume/analyze
// // Body: { resumeText, languageCode }
// // ------------------------------------------------------
// router.post("/analyze", async (req, res) => {
//   try {
//     const { resumeText, languageCode } = req.body;

//     if (!resumeText || !resumeText.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "resumeText is required",
//       });
//     }

//     const langName = LANGUAGE_NAMES[languageCode] || "English";

//     const systemPrompt = `
// You are an expert resume reviewer. Analyze the resume text given below and
// return your feedback STRICTLY as a valid JSON object with this exact shape
// and nothing else (no markdown, no preamble, no code fences):

// {
//   "score": <number 0-100>,
//   "strengths": ["point 1", "point 2", ...],
//   "improvements": ["point 1", "point 2", ...]
// }

// Write the strengths and improvements in ${langName}. Be specific and
// practical. Do not include any text outside the JSON object.
//     `.trim();

//     const raw = await askClaude(systemPrompt, resumeText, 1200, false);

//     const jsonMatch = raw.match(/\{[\s\S]*\}/);
//     const cleaned = jsonMatch ? jsonMatch[0] : raw.replace(/```json|```/g, "").trim();

//     let parsed;
//     try {
//       parsed = JSON.parse(cleaned);
//     } catch (parseErr) {
//       console.error("Failed to parse resume analysis JSON. Raw response was:\n", raw);
//       return res.status(500).json({
//         success: false,
//         message: "Could not parse analysis result",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       score: parsed.score,
//       strengths: parsed.strengths || [],
//       improvements: parsed.improvements || [],
//     });
//   } catch (error) {
//     console.error("Resume analyze error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to analyze resume",
//     });
//   }
// });

// module.exports = router;


// // ======================================================
// // server/routes/resume.js
// // POST /api/resume/generate  -> builds a full resume from candidate details
// // POST /api/resume/analyze   -> analyzes pasted resume text & returns score/feedback
// // ======================================================
// const express = require("express");
// const router = express.Router();
// const { askClaude } = require("../utils/askClaude");

// const LANGUAGE_NAMES = {
//   en: "English",
//   ta: "Tamil",
//   hi: "Hindi",
//   te: "Telugu",
//   kn: "Kannada",
//   ml: "Malayalam",
//   bn: "Bengali",
//   mr: "Marathi",
// };

// // ------------------------------------------------------
// // POST /api/resume/generate
// // Body: { fullName, email, phone, location, linkedin,
// //         summary, education, experience, skills, jobDescription }
// // ------------------------------------------------------
// router.post("/generate", async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       phone,
//       location,
//       linkedin,
//       summary,
//       education,
//       experience,
//       skills,
//       jobDescription,
//     } = req.body;

//     if (!fullName || !email) {
//       return res.status(400).json({
//         success: false,
//         message: "fullName and email are required",
//       });
//     }

//     const systemPrompt = `
// You are an expert resume writer who builds ATS-friendly resumes that get
// candidates shortlisted by recruiters. Using the candidate details given,
// write a complete, polished, ready-to-use resume in clean plain text
// (no markdown tables, no images, no multi-column layout).

// RULES YOU MUST FOLLOW:
// 1. Single-column, ATS-friendly layout only.
// 2. Standard section headings exactly: SUMMARY, SKILLS, EXPERIENCE, EDUCATION
//    (add PROJECTS or CERTIFICATIONS only if the candidate provided that info).
// 3. Under SUMMARY: 2-3 lines, professional tone, mention role/field and
//    years of experience if inferable from the data given.
// 4. Under EXPERIENCE: convert plain duty descriptions into achievement-style
//    bullet points. Add quantifiable impact wherever reasonably inferable —
//    do NOT invent fake statistics; phrase for impact without a fake number
//    if nothing supports it.
// 5. Under SKILLS: clean comma-separated or short-line list, grouped by
//    category if there are many (e.g. "Technical:", "Tools:").
// 6. Reverse chronological order (most recent first) for EXPERIENCE and EDUCATION.
// 7. If a target job description is provided, naturally incorporate its
//    important keywords/tools where truthful and relevant — never fabricate
//    skills the candidate didn't mention.
// 8. No first-person pronouns. No generic filler adjectives like
//    "hardworking" or "team player" without evidence.
// 9. Keep it to one page worth of content unless experience is extensive.
// 10. Output ONLY the final resume text, ready to copy-paste. No preamble,
//     no explanation, no markdown symbols like ** or #.
//     `.trim();

//     const userMessage = `
// CANDIDATE DETAILS:
// Full Name: ${fullName}
// Email: ${email}
// Phone: ${phone || "N/A"}
// Location: ${location || "N/A"}
// LinkedIn: ${linkedin || "N/A"}

// Existing summary/notes from candidate (may be rough, rewrite properly):
// ${summary || "N/A"}

// Education:
// ${education || "N/A"}

// Experience:
// ${experience || "N/A"}

// Skills:
// ${skills || "N/A"}

// ${jobDescription ? `Target Job Description (use for keyword alignment):\n${jobDescription}` : ""}
//     `.trim();

//     const resumeText = await askClaude(systemPrompt, userMessage, 1500, false);

//     return res.status(200).json({
//       success: true,
//       resume: resumeText,
//     });
//   } catch (error) {
//     console.error("Resume generate error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to generate resume",
//     });
//   }
// });

// // ------------------------------------------------------
// // POST /api/resume/analyze
// // Body: { resumeText, languageCode }
// // ------------------------------------------------------
// router.post("/analyze", async (req, res) => {
//   try {
//     const { resumeText, languageCode } = req.body;

//     if (!resumeText || !resumeText.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "resumeText is required",
//       });
//     }

//     const langName = LANGUAGE_NAMES[languageCode] || "English";

//     const systemPrompt = `
// You are an expert resume reviewer. Analyze the resume text given below and
// return your feedback STRICTLY as a valid JSON object with this exact shape
// and nothing else (no markdown, no preamble, no code fences):

// {
//   "score": <number 0-100>,
//   "strengths": ["point 1", "point 2", ...],
//   "improvements": ["point 1", "point 2", ...]
// }

// Write the strengths and improvements in ${langName}. Be specific and
// practical. Do not include any text outside the JSON object.
//     `.trim();

//     const raw = await askClaude(systemPrompt, resumeText, 1200, false);

//     // Extract just the JSON object even if Gemini adds extra text around it
//     const jsonMatch = raw.match(/\{[\s\S]*\}/);
//     const cleaned = jsonMatch ? jsonMatch[0] : raw.replace(/```json|```/g, "").trim();

//     let parsed;
//     try {
//       parsed = JSON.parse(cleaned);
//     } catch (parseErr) {
//       console.error("Failed to parse resume analysis JSON. Raw response was:\n", raw);
//       return res.status(500).json({
//         success: false,
//         message: "Could not parse analysis result",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       score: parsed.score,
//       strengths: parsed.strengths || [],
//       improvements: parsed.improvements || [],
//     });
//   } catch (error) {
//     console.error("Resume analyze error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to analyze resume",
//     });
//   }
// });

// module.exports = router;


// ======================================================
// server/routes/resume.js
// POST /api/resume/generate  -> builds a full resume from candidate details
// POST /api/resume/analyze   -> analyzes pasted resume text & returns score/feedback
// ======================================================
const express = require("express");
const router = express.Router();
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
};

// ------------------------------------------------------
// POST /api/resume/generate
// Body: { fullName, email, phone, location, linkedin,
//         summary, education, experience, skills, jobDescription }
// ------------------------------------------------------
router.post("/generate", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      linkedin,
      summary,
      education,
      experience,
      skills,
      jobDescription,
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "fullName and email are required",
      });
    }

    // Detect fresher / no-experience candidates so the prompt can
    // adapt tone instead of forcing fake "years of experience" language.
    const noExperienceProvided =
      !experience ||
      /^\s*0\s*(years?|yrs?)?\s*$/i.test(experience.trim()) ||
      /no experience/i.test(experience);

    const systemPrompt = `
You are an expert resume writer who builds ATS-friendly resumes that get
candidates shortlisted by recruiters. Using the candidate details given,
write a complete, polished, ready-to-use resume in clean plain text
(no markdown tables, no images, no multi-column layout, no asterisks or
hash symbols anywhere in the output).

RULES YOU MUST FOLLOW:

1. Single-column, ATS-friendly layout only.

2. Use these exact section headings, each on its own line, in this order,
   and ALWAYS include a blank line after every heading:
   SUMMARY
   SKILLS
   ${noExperienceProvided ? "PROJECTS" : "EXPERIENCE"}
   EDUCATION
   (add CERTIFICATIONS at the end only if the candidate provided that info)

3. SUMMARY: exactly 2-3 lines. ${
      noExperienceProvided
        ? `This candidate has no formal work experience yet (student / fresher). 
           Frame the summary around their field of study, the specific skills/stack
           they know, and genuine enthusiasm backed by what they've built or learned —
           never say "0 years of experience" and never apologize for being a fresher.
           Use a confident title like "Aspiring <Role>" or "<Field> Graduate" instead.`
        : `Mention their role/field and years of experience as inferable from the data.`
    }

4. SKILLS: group into short labeled lines when there are several distinct
   categories (e.g. "Languages:", "Frameworks:", "Tools:", "Database:").
   Comma-separate within each line. Do not invent skills not implied by
   the candidate's input.

5. ${
      noExperienceProvided
        ? `PROJECTS: Turn whatever project/coursework/stack info the candidate gave
           into 2-4 achievement-style bullet points per project (what was built,
           which technologies, what it does). If the candidate gave only a target
           stack/role with no specific project, construct ONE plausible, clearly
           labeled academic/practice project consistent with that stack, phrased
           so it reads as real hands-on work — but do not claim a specific employer,
           client, or fabricated metrics.`
        : `EXPERIENCE: convert plain duty descriptions into achievement-style bullet
           points, most recent role first. Add quantifiable impact wherever reasonably
           inferable — do NOT invent fake statistics; phrase for impact without a
           fake number if nothing supports it.`
    }

6. EDUCATION: reverse chronological order (most recent first). Include
   degree, field, and year/status exactly as given (e.g. "3rd year", 
   "Final year", "Graduated 2023") — never invent a graduation year.

7. If a target job description is provided, naturally incorporate its
   important keywords/tools into SUMMARY/SKILLS/PROJECTS or EXPERIENCE
   wherever truthful and relevant — never fabricate skills the candidate
   didn't mention.

8. No first-person pronouns ("I", "my"). No generic filler adjectives like
   "hardworking" or "team player" without a concrete bullet backing it up.

9. Keep it to one page worth of content unless experience is extensive.

10. Output ONLY the final resume text, ready to copy-paste, starting
    directly with the candidate's name on the first line. No preamble,
    no explanation, no markdown symbols, no trailing commentary after
    the resume ends.
    `.trim();

    const userMessage = `
CANDIDATE DETAILS:
Full Name: ${fullName}
Email: ${email}
Phone: ${phone || "N/A"}
Location: ${location || "N/A"}
LinkedIn: ${linkedin && linkedin.includes("/checkpoint/") ? "N/A (link was invalid/broken, omit it)" : linkedin || "N/A"}

Existing summary/notes from candidate (may be rough, rewrite properly):
${summary || "N/A"}

Education:
${education || "N/A"}

Experience:
${experience || "N/A"}

Skills:
${skills || "N/A"}

${jobDescription ? `Target Job Description (use for keyword alignment):\n${jobDescription}` : ""}
    `.trim();

    // 2200 tokens gives enough headroom for SUMMARY + SKILLS + PROJECTS/EXPERIENCE
    // + EDUCATION without truncating mid-sentence for longer candidate inputs.
    const resumeText = await askClaude(systemPrompt, userMessage, 2200, false);

    return res.status(200).json({
      success: true,
      resume: resumeText.trim(),
    });
  } catch (error) {
    console.error("Resume generate error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate resume",
    });
  }
});

// ------------------------------------------------------
// POST /api/resume/analyze
// Body: { resumeText, languageCode }
// ------------------------------------------------------
router.post("/analyze", async (req, res) => {
  try {
    const { resumeText, languageCode } = req.body;

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: "resumeText is required",
      });
    }

    const langName = LANGUAGE_NAMES[languageCode] || "English";

    const systemPrompt = `
You are an expert resume reviewer. Analyze the resume text given below and
return your feedback STRICTLY as a valid JSON object with this exact shape
and nothing else (no markdown, no preamble, no code fences):

{
  "score": <number 0-100>,
  "strengths": ["point 1", "point 2", ...],
  "improvements": ["point 1", "point 2", ...]
}

Write the strengths and improvements in ${langName}. Be specific and
practical. Do not include any text outside the JSON object.
    `.trim();

    const raw = await askClaude(systemPrompt, resumeText, 1200, false);

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const cleaned = jsonMatch ? jsonMatch[0] : raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse resume analysis JSON. Raw response was:\n", raw);
      return res.status(500).json({
        success: false,
        message: "Could not parse analysis result",
      });
    }

    return res.status(200).json({
      success: true,
      score: parsed.score,
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
    });
  } catch (error) {
    console.error("Resume analyze error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to analyze resume",
    });
  }
});

module.exports = router;