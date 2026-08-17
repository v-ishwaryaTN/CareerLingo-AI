import React, { useState, useEffect } from "react";
import { getJobs, applyToJob } from "../api/api";
import "./Jobs.css";

export default function Jobs({ token }) {
  const [jobs, setJobs] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);

  useEffect(() => {
    getJobs().then(setJobs).catch(() => setJobs([]));
  }, []);

  const handleApply = async (jobId, applyUrl) => {
    if (!token) {
      alert("Please login first to apply.");
      return;
    }
    try {
      await applyToJob(jobId, token);
      setAppliedIds((prev) => [...prev, jobId]);
      if (applyUrl) {
        window.open(applyUrl, "_blank");
      }
    } catch (err) {
      alert("Apply failed: " + err.message);
    }
  };

  return (
    <div className="jobs-page">
      <h1>Jobs</h1>
      <p className="jobs-subtitle">Handpicked opportunities matched to your profile</p>

      {jobs.map((j, i) => {
        const isApplied = appliedIds.includes(j._id);
        return (
          <div
            className="job-card"
            key={j._id}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="job-card-top">
              <div className="job-icon">{j.company?.[0]?.toUpperCase() || "J"}</div>
              <div>
                <div className="job-title">{j.role}</div>
                <div className="job-meta">
                  {j.company} <span className="dot">·</span> {j.location}
                </div>
                {j.location?.toLowerCase() === "remote" && (
                  <span className="job-tag">Remote</span>
                )}
              </div>
            </div>
            <button
              className={`apply-btn ${isApplied ? "applied" : ""}`}
              onClick={() => handleApply(j._id, j.applyUrl)}
              disabled={isApplied}
            >
              {isApplied ? "Applied ✓" : "Apply"}
            </button>
          </div>
        );
      })}
    </div>
  );
}