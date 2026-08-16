// controllers/translateController.js

const {
  askClaude,
  askClaudeAudio,
} = require("../utils/askClaude");

// ============================================================
// LANGUAGES
// ============================================================

const LANGUAGE_NAMES = {
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
  en: "English",
};

// ============================================================
// CONFIG
// ============================================================

// IMPORTANT:
// Do NOT put every request into one global 4-second queue.
// Tab and mic should be able to process independently.

const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 700;

// Small protection against accidental duplicate requests.
const DUPLICATE_WINDOW_MS = 1200;

const recentRequests = new Map();

let totalCalls = 0;
let totalQuotaErrors = 0;

const sessionStartedAt = Date.now();

// ============================================================
// HELPERS
// ============================================================

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const isQuotaError = (err) => {
  const status =
    err?.response?.status ??
    err?.status;

  const message =
    err?.response?.data?.error?.message ||
    err?.message ||
    "";

  return (
    status === 429 ||
    /RESOURCE_EXHAUSTED|quota|rate.?limit|too many requests/i.test(
      message
    )
  );
};

const isTransientError = (err) => {
  const status =
    err?.response?.status ??
    err?.status;

  const code = err?.code;

  if (status >= 500) return true;

  return [
    "ECONNRESET",
    "ETIMEDOUT",
    "ECONNABORTED",
    "ENOTFOUND",
  ].includes(code);
};

const extractRetryAfter = (err) => {
  const message =
    err?.response?.data?.error?.message ||
    err?.message ||
    "";

  const match =
    message.match(/retry in ([\d.]+)s/i);

  if (!match) return 5;

  return Math.max(
    1,
    Math.ceil(Number(match[1]))
  );
};

// ============================================================
// JSON CLEANER
// ============================================================

const cleanJsonResponse = (raw) => {
  if (!raw) return null;

  let text = String(raw).trim();

  text = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch (_) {}

  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");

  if (
    first !== -1 &&
    last !== -1 &&
    last > first
  ) {
    try {
      return JSON.parse(
        text.slice(first, last + 1)
      );
    } catch (_) {}
  }

  return null;
};

// ============================================================
// AI CALL
// ============================================================

const callAI = async (fn) => {
  let lastError;

  for (
    let attempt = 0;
    attempt <= MAX_RETRIES;
    attempt++
  ) {
    try {
      totalCalls++;

      return await fn();
    } catch (err) {
      lastError = err;

      if (
        attempt < MAX_RETRIES &&
        isTransientError(err)
      ) {
        await sleep(RETRY_DELAY_MS);
        continue;
      }

      throw err;
    }
  }

  throw lastError;
};

// ============================================================
// REQUEST DEDUP
// ============================================================

const isDuplicateRequest = (
  key
) => {
  const now = Date.now();
  const previous =
    recentRequests.get(key);

  recentRequests.set(key, now);

  if (
    previous &&
    now - previous <
      DUPLICATE_WINDOW_MS
  ) {
    return true;
  }

  return false;
};

// Cleanup old duplicate keys.
setInterval(() => {
  const now = Date.now();

  for (const [
    key,
    timestamp,
  ] of recentRequests.entries()) {
    if (
      now - timestamp >
      10000
    ) {
      recentRequests.delete(key);
    }
  }
}, 10000).unref();

// ============================================================
// TEXT TRANSLATION
// ============================================================

const translateText = async (
  req,
  res
) => {
  try {
    const {
      text,
      targetLang,
    } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        error: "text is required",
      });
    }

    const lang =
      LANGUAGE_NAMES[targetLang] ||
      "English";

    const prompt = `
Translate the user's text into ${lang}.

Return ONLY JSON:
{
  "translated": "..."
}

Do not explain anything.
Preserve meaning exactly.
`.trim();

    const raw = await callAI(() =>
      askClaude(
        prompt,
        text.trim(),
        180
      )
    );

    const parsed =
      cleanJsonResponse(raw);

    if (!parsed) {
      return res.status(500).json({
        error:
          "Invalid translation response",
      });
    }

    return res.json({
      translated:
        String(
          parsed.translated || ""
        ).trim(),
    });
  } catch (err) {
    console.error(
      "[translateText]",
      err
    );

    if (isQuotaError(err)) {
      totalQuotaErrors++;

      return res.status(429).json({
        error: "quota_exceeded",
        retryAfter:
          extractRetryAfter(err),
      });
    }

    return res.status(500).json({
      error:
        err.message ||
        "Translation failed",
    });
  }
};

// ============================================================
// TEXT SUGGESTIONS
// ============================================================

const suggestReply = async (
  req,
  res
) => {
  try {
    const {
      conversation,
      lang,
    } = req.body;

    if (!conversation?.trim()) {
      return res.status(400).json({
        error:
          "conversation is required",
      });
    }

    const language =
      LANGUAGE_NAMES[lang] ||
      "English";

    const prompt = `
You are a live meeting reply assistant.

Based ONLY on the latest conversation,
create 3 short replies the listener can say next.

Target language: ${language}

Rules:
- professional
- natural
- short
- relevant
- no invented facts

Return ONLY JSON:

{
  "suggestions": [
    {
      "en": "...",
      "own": "..."
    },
    {
      "en": "...",
      "own": "..."
    },
    {
      "en": "...",
      "own": "..."
    }
  ]
}
`.trim();

    const raw = await callAI(() =>
      askClaude(
        prompt,
        conversation.trim(),
        300
      )
    );

    const parsed =
      cleanJsonResponse(raw);

    if (!parsed) {
      return res.status(500).json({
        error:
          "Invalid suggestion response",
      });
    }

    const suggestions =
      Array.isArray(
        parsed.suggestions
      )
        ? parsed.suggestions
            .filter(
              (item) =>
                item?.en &&
                item?.own
            )
            .slice(0, 3)
            .map((item) => ({
              en: String(
                item.en
              ).trim(),
              own: String(
                item.own
              ).trim(),
            }))
        : [];

    return res.json({
      suggestions,
    });
  } catch (err) {
    console.error(
      "[suggestReply]",
      err
    );

    if (isQuotaError(err)) {
      totalQuotaErrors++;

      return res.status(429).json({
        error: "quota_exceeded",
        retryAfter:
          extractRetryAfter(err),
      });
    }

    return res.status(500).json({
      error:
        err.message ||
        "Suggestion failed",
    });
  }
};

// ============================================================
// MEETING PARTICIPANT AUDIO
// ============================================================

const processMeetingAudio = async ({
  audioBase64,
  mimeType,
  targetLang,
  recentConversation,
}) => {
  const language =
    LANGUAGE_NAMES[targetLang] ||
    "Tamil";

  const context =
    recentConversation
      ? `
Recent conversation:
${recentConversation}
`
      : "";

  const prompt = `
You are a real-time meeting translator.

The audio is from the OTHER PERSON.
They normally speak English.

Do these tasks:

1. Transcribe their English speech accurately.
2. Translate it into ${language}.
3. Create 3 short replies the listener can say next.
4. Give every reply in English AND ${language}.

IMPORTANT:
- "original" MUST contain the English speech.
- "translated" MUST contain ${language}.
- Do not put translation inside original.
- Do not invent information.
- If speech is unclear, use empty strings.
- Suggestions must directly respond to the speech.

${context}

Return ONLY JSON:

{
  "original": "",
  "translated": "",
  "suggestions": [
    {
      "en": "",
      "own": ""
    },
    {
      "en": "",
      "own": ""
    },
    {
      "en": "",
      "own": ""
    }
  ]
}
`.trim();

  const raw =
    await callAI(() =>
      askClaudeAudio(
        prompt,
        audioBase64,
        mimeType ||
          "audio/webm",
        450
      )
    );

  const parsed =
    cleanJsonResponse(raw);

  if (!parsed) {
    throw new Error(
      "Invalid meeting audio JSON"
    );
  }

  const suggestions =
    Array.isArray(
      parsed.suggestions
    )
      ? parsed.suggestions
          .filter(
            (item) =>
              item?.en &&
              item?.own
          )
          .slice(0, 3)
          .map((item) => ({
            en: String(
              item.en
            ).trim(),
            own: String(
              item.own
            ).trim(),
          }))
      : [];

  return {
    source: "tab",

    original: String(
      parsed.original || ""
    ).trim(),

    translated: String(
      parsed.translated || ""
    ).trim(),

    suggestions,
  };
};

// ============================================================
// USER MICROPHONE AUDIO
// ============================================================

const processMicAudio = async ({
  audioBase64,
  mimeType,
}) => {
  const prompt = `
You are transcribing the user's microphone.

The user may speak Tamil, Hindi, Telugu,
Kannada, Malayalam, or another language.

Do these tasks:

1. Detect the language automatically.
2. Transcribe exactly what the user said.
3. Translate it into English.

Do NOT generate replies.
Do NOT invent words.

Return ONLY JSON:

{
  "original": "",
  "translated": ""
}
`.trim();

  const raw =
    await callAI(() =>
      askClaudeAudio(
        prompt,
        audioBase64,
        mimeType ||
          "audio/webm",
        350
      )
    );

  const parsed =
    cleanJsonResponse(raw);

  if (!parsed) {
    throw new Error(
      "Invalid microphone JSON"
    );
  }

  return {
    source: "mic",

    original: String(
      parsed.original || ""
    ).trim(),

    translated: String(
      parsed.translated || ""
    ).trim(),

    suggestions: [],
  };
};

// ============================================================
// AUDIO ENDPOINT
// ============================================================

const transcribeAndTranslate =
  async (req, res) => {
    try {
      const {
        audioBase64,
        mimeType,
        targetLang,
        source,
        recentConversation,
      } = req.body;

      if (!audioBase64) {
        return res.status(400).json({
          error:
            "audioBase64 is required",
        });
      }

      // Prevent accidental duplicate submission.
      const requestKey = `${source || "unknown"}:${audioBase64.slice(
        0,
        80
      )}`;

      if (
        isDuplicateRequest(
          requestKey
        )
      ) {
        return res.json({
          source:
            source === "tab"
              ? "tab"
              : "mic",
          original: "",
          translated: "",
          suggestions: [],
          duplicate: true,
        });
      }

      let result;

      if (source === "tab") {
        result =
          await processMeetingAudio({
            audioBase64,
            mimeType,
            targetLang,
            recentConversation,
          });
      } else {
        result =
          await processMicAudio({
            audioBase64,
            mimeType,
          });
      }

      return res.json(result);
    } catch (err) {
      console.error(
        "================================"
      );

      console.error(
        "[AUDIO TRANSLATION ERROR]"
      );

      console.error(
        err?.message || err
      );

      console.error(
        "================================"
      );

      if (isQuotaError(err)) {
        totalQuotaErrors++;

        return res.status(429).json({
          error:
            "quota_exceeded",
          retryAfter:
            extractRetryAfter(err),
        });
      }

      return res.status(500).json({
        error:
          err.message ||
          "Audio processing failed",
      });
    }
  };

// ============================================================
// HEALTH
// ============================================================

const health = (_req, res) => {
  const uptimeMinutes =
    (
      (Date.now() -
        sessionStartedAt) /
      60000
    ).toFixed(1);

  res.json({
    ok: true,
    uptimeMinutes,
    totalCalls,
    totalQuotaErrors,
  });
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  LANGUAGE_NAMES,
  translateText,
  suggestReply,
  transcribeAndTranslate,
  health,
};