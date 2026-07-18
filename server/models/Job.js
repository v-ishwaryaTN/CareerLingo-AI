const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);