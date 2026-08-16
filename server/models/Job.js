const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  applyUrl: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);