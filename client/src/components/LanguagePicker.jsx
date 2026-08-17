import React from "react";

const languages = [
  { code: "ta", name: "தமிழ்", english: "Tamil" },
  { code: "en", name: "English", english: "English" },
  { code: "hi", name: "हिन्दी", english: "Hindi" },
  { code: "te", name: "తెలుగు", english: "Telugu" },
  { code: "ml", name: "മലയാളം", english: "Malayalam" },
  { code: "kn", name: "ಕನ್ನಡ", english: "Kannada" },
];

export default function LanguagePicker({ value, onChange }) {
  return (
    <div className="language-picker">
      <span className="language-icon">🌐</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="language-select"
      >
        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
          >
            {language.name} · {language.english}
          </option>
        ))}
      </select>
    </div>
  );
}


