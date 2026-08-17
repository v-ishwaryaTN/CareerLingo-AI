import { useState } from "react";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ResumeGenerate() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
    jobDescription: "",
  });

  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!form.fullName || !form.email) {
      setError("Name and email are required.");
      return;
    }

    setLoading(true);
    setError("");
    setResumeText("");

    try {
      const res = await fetch(`${API_BASE}/api/resume/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to generate resume");
      }

      setResumeText(data.resume);
    } catch (err) {
      console.error("Resume generate error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
  };

  const handleDownload = () => {
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.fullName.replace(/\s+/g, "_") || "resume"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Create Resume
      </h2>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Fill in your details and we'll build an ATS-friendly resume for you.
      </p>

      <div style={{ display: "grid", gap: 12 }}>
        <input name="fullName" placeholder="Full Name *" value={form.fullName} onChange={handleChange} />
        <input name="email" placeholder="Email *" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="location" placeholder="Location (e.g. Chennai, India)" value={form.location} onChange={handleChange} />
        <input name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} />
        <textarea name="summary" placeholder="Brief summary about yourself (role, years of experience, strengths)" rows={3} value={form.summary} onChange={handleChange} />
        <textarea name="education" placeholder="Education (degree, college, year — one per line)" rows={3} value={form.education} onChange={handleChange} />
        <textarea name="experience" placeholder="Work experience (company, role, dates, what you did)" rows={5} value={form.experience} onChange={handleChange} />
        <textarea name="skills" placeholder="Skills (comma separated: e.g. React, Node.js, SQL)" rows={2} value={form.skills} onChange={handleChange} />
        <textarea name="jobDescription" placeholder="Optional: paste a target job description to tailor keywords" rows={4} value={form.jobDescription} onChange={handleChange} />
      </div>

      {error && <p style={{ color: "#c0392b", marginTop: 12 }}>{error}</p>}

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginTop: 16,
          padding: "12px 20px",
          background: "#1a1a2e",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Resume"}
      </button>

      {resumeText && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Your Resume</h3>
          <pre style={{ whiteSpace: "pre-wrap", background: "#f7f7f7", padding: 16, borderRadius: 6, border: "1px solid #ddd", fontFamily: "inherit", fontSize: 14, lineHeight: 1.5 }}>
            {resumeText}
          </pre>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button onClick={handleCopy}>Copy</button>
            <button onClick={handleDownload}>Download .txt</button>
          </div>
        </div>
      )}
    </div>
  );
}
