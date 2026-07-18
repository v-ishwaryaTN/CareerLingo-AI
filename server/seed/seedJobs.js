require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/Job");

const sampleJobs = [
  { role: "Frontend Developer (React)", company: "TechNova Solutions", location: "Chennai", description: "React, JS, CSS." },
  { role: "MERN Stack Intern", company: "CloudBridge IT", location: "Remote", description: "MongoDB, Express, React, Node." },
  { role: "Junior Web Developer", company: "Madurai Software Park", location: "Madurai", description: "HTML, CSS, JS basics." },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Job.deleteMany();
  await Job.insertMany(sampleJobs);
  console.log("Seeded sample jobs.");
  process.exit(0);
};

run().catch((err) => { console.error(err); process.exit(1); });