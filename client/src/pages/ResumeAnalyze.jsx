import React, { useState } from "react";
// import "./ResumeCreate.css";
import "./Resume.css";
import jsPDF from "jspdf";

const API_URL = "http://localhost:5000";

// Splits the plain-text resume (headings like SUMMARY, SKILLS, EXPERIENCE,
// EDUCATION, PROJECTS on their own line) into { heading, lines[] } sections
// for the pretty structured view. Falls back gracefully if headings aren't found.
function parseResumeSections(resumeText) {
  const knownHeadings = [
    "SUMMARY",
    "SKILLS",
    "EXPERIENCE",
    "PROJECTS",
    "EDUCATION",
    "CERTIFICATIONS",
  ];

  const lines = resumeText.split("\n");
  const sections = [];
  let current = null;

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    const isHeading = knownHeadings.includes(line.toUpperCase()) && line === line.toUpperCase();

    if (isHeading) {
      current = { heading: line.toUpperCase(), lines: [] };
      sections.push(current);
    } else if (line) {
      if (!current) {
        current = { heading: "", lines: [] };
        sections.push(current);
      }
      current.lines.push(line);
    }
  });

  return sections;
}

function ResumeCreate() {
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
    certifications: "",
    jobDescription: "",
  });

  const [resume, setResume] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState("structured"); // "structured" | "raw"

  const handleChange = (field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const generateResume = async () => {
    setError("");

    if (!form.fullName.trim() || !form.email.trim()) {
      setError("Name and Email தேவை (required).");
      return;
    }

    setIsGenerating(true);
    setResume("");

    try {
      const response = await fetch(`${API_URL}/api/resume/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resume generate backend error:", errorText);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.resume) {
        throw new Error(data.message || "Resume generation failed");
      }

      setResume(data.resume.trim());
    } catch (err) {
      console.error("Resume generate error:", err);
      setError(
        "Resume generate பண்ண முடியல. Backend server running-ல் இருக்கிறதா check பண்ணுங்க."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const copyResume = async () => {
    if (!resume) return;
    try {
      await navigator.clipboard.writeText(resume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const downloadResume = () => {
    if (!resume) return;
    const blob = new Blob([resume], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeName = (form.fullName || "resume").trim().replace(/\s+/g, "_");
    link.download = `${safeName}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Client-side PDF generation using jsPDF — no server call involved.
  const downloadResumePDF = () => {
    if (!resume) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginLeft = 40;
    const marginTop = 50;
    const pageHeight = doc.internal.pageSize.height;
    const maxWidth = 515; // A4 width (595) - margins

    let y = marginTop;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(form.fullName || "Resume", marginLeft, y);
    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const contactLine = [form.email, form.phone, form.location, form.linkedin]
      .filter(Boolean)
      .join("  |  ");
    if (contactLine) {
      doc.text(contactLine, marginLeft, y);
      y += 20;
    }

    doc.setFontSize(11);

    const pdfSections = parseResumeSections(resume);

    pdfSections.forEach((section) => {
      // Section heading
      if (section.heading) {
        if (y > pageHeight - 60) {
          doc.addPage();
          y = marginTop;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        y += 8;
        doc.text(section.heading, marginLeft, y);
        y += 6;
        doc.setDrawColor(180);
        doc.line(marginLeft, y, marginLeft + maxWidth, y);
        y += 14;
      }

      // Section lines (bulleted)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);

      section.lines.forEach((line) => {
        const cleanLine = line.replace(/^[-•]\s*/, "");
        const wrapped = doc.splitTextToSize(`• ${cleanLine}`, maxWidth - 10);

        wrapped.forEach((wLine) => {
          if (y > pageHeight - 40) {
            doc.addPage();
            y = marginTop;
          }
          doc.text(wLine, marginLeft + 5, y);
          y += 14;
        });
      });

      y += 6;
    });

    const safeName = (form.fullName || "resume").trim().replace(/\s+/g, "_");
    doc.save(`${safeName}_Resume.pdf`);
  };

  const sections = resume ? parseResumeSections(resume) : [];

  return (
    <div className="resume-page">
      <h2>Create Resume</h2>
      <p className="subtitle">
        Fill in your details and we'll build an ATS-friendly resume for you.
      </p>

      {error && <div className="resume-error">⚠️ {error}</div>}

      <input
        type="text"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange("fullName")}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange("email")}
      />
      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange("phone")}
      />
      <input
        type="text"
        placeholder="Location (city, country)"
        value={form.location}
        onChange={handleChange("location")}
      />
      <input
        type="text"
        placeholder="LinkedIn profile URL (optional)"
        value={form.linkedin}
        onChange={handleChange("linkedin")}
      />
      <textarea
        placeholder="Summary / strengths"
        value={form.summary}
        onChange={handleChange("summary")}
      />
      <textarea
        placeholder="Education (e.g. B.Sc Computer Science, 3rd year)"
        value={form.education}
        onChange={handleChange("education")}
      />
      <textarea
        placeholder="Experience (write '0' or 'fresher' if none)"
        value={form.experience}
        onChange={handleChange("experience")}
      />
      <textarea
        placeholder="Skills (comma separated: e.g. React, Node.js, SQL)"
        value={form.skills}
        onChange={handleChange("skills")}
      />
      <textarea
        placeholder="Certifications (comma separated, optional: e.g. AWS Certified, Manual Testing Fundamentals)"
        value={form.certifications}
        onChange={handleChange("certifications")}
      />
      <textarea
        placeholder="Optional: paste a target job description to tailor keywords"
        value={form.jobDescription}
        onChange={handleChange("jobDescription")}
      />

      <button className="resume-btn" onClick={generateResume} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Resume"}
      </button>

      {resume && (
        <div className="resume-result">
          <h3>Your Resume</h3>

          <div className="resume-action-row" style={{ marginTop: 0, marginBottom: 14 }}>
            <button onClick={() => setViewMode("structured")}>Structured View</button>
            <button onClick={() => setViewMode("raw")}>Raw Text</button>
          </div>

          {viewMode === "structured" ? (
            sections.map((section, index) => (
              <div key={index}>
                {section.heading && <p className="section-label">{section.heading}</p>}
                <ul>
                  {section.lines.map((line, lineIndex) => (
                    <li key={lineIndex}>{line.replace(/^[-•]\s*/, "")}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            // Guaranteed complete, no truncation — whole resume in one block.
            <div className="resume-output-box">{resume}</div>
          )}

          <div className="resume-action-row">
            <button onClick={copyResume}>{copied ? "Copied!" : "Copy"}</button>
            <button onClick={downloadResume}>Download .txt</button>
            <button onClick={downloadResumePDF}>Download PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeCreate;