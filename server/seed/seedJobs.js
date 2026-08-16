const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../models/Job");
dotenv.config();

const jobs = [
  { role: "Frontend Developer (React)", company: "TechNova Solutions", location: "Chennai", applyUrl: "https://www.linkedin.com/jobs/" },
  { role: "MERN Stack Intern", company: "CloudBridge IT", location: "Remote", applyUrl: "https://www.naukri.com/" },
  { role: "Junior Web Developer", company: "Madurai Software Park", location: "Madurai", applyUrl: "https://www.indeed.co.in/" },
  { role: "Backend Developer (Node.js)", company: "Skyline Technologies", location: "Bangalore", applyUrl: "https://www.linkedin.com/jobs/" },
  { role: "Full Stack Developer", company: "Orbit Software Solutions", location: "Coimbatore", applyUrl: "https://www.naukri.com/" },
  { role: "Java Developer", company: "InfoWave Systems", location: "Hyderabad", applyUrl: "https://www.indeed.co.in/" },
  { role: "Python Developer", company: "DataCore Analytics", location: "Chennai", applyUrl: "https://www.linkedin.com/jobs/" },
  { role: "QA / Software Tester", company: "BrightPath Tech", location: "Pune", applyUrl: "https://www.naukri.com/" },
  { role: "DevOps Engineer", company: "CloudNine Infra", location: "Remote", applyUrl: "https://www.linkedin.com/jobs/" },
  { role: "UI/UX Designer", company: "PixelCraft Studio", location: "Chennai", applyUrl: "https://www.indeed.co.in/" },
  { role: "Mobile App Developer (React Native)", company: "AppForge Labs", location: "Bangalore", applyUrl: "https://www.naukri.com/" },
  { role: "Data Analyst", company: "InsightWorks", location: "Chennai", applyUrl: "https://www.linkedin.com/jobs/" },
  { role: "Machine Learning Engineer", company: "NeuralArc AI", location: "Hyderabad", applyUrl: "https://www.indeed.co.in/" },
  { role: "Cybersecurity Analyst", company: "SecureNet Systems", location: "Remote", applyUrl: "https://www.naukri.com/" },
  { role: "Database Administrator", company: "DataVault Solutions", location: "Chennai", applyUrl: "https://www.linkedin.com/jobs/" },
  { role: "Cloud Support Engineer", company: "SkyOps Technologies", location: "Bangalore", applyUrl: "https://www.indeed.co.in/" },
  { role: "System Administrator", company: "NetGrid Solutions", location: "Madurai", applyUrl: "https://www.naukri.com/" },
  { role: "Software Engineer Intern", company: "ByteBridge Labs", location: "Remote", applyUrl: "https://www.linkedin.com/jobs/" },
  { role: ".NET Developer", company: "CoreLogic Systems", location: "Coimbatore", applyUrl: "https://www.indeed.co.in/" },
  { role: "Technical Support Engineer", company: "HelpDesk Pro", location: "Chennai", applyUrl: "https://www.naukri.com/" },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Job.deleteMany({});
  await Job.insertMany(jobs);
  console.log("Jobs seeded:", jobs.length);
  process.exit();
});