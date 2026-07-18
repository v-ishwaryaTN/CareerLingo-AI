const Job = require("../models/Job");
const Application = require("../models/Application");

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const applyToJob = async (req, res) => {
  try {
    const application = await Application.create({ userId: req.userId, jobId: req.params.id });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.userId }).populate("jobId");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getJobs, applyToJob, getMyApplications };