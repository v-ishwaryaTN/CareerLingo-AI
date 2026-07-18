require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const translateRoutes = require("./routes/translate");
const chatRoutes = require("./routes/chat");
const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const interviewRoutes = require("./routes/interview");
const resumeRoutes = require("./routes/resume");
const jobRoutes = require("./routes/jobs");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "CareerLingo API running" });
});

app.use("/api/translate", translateRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`CareerLingo server running on http://localhost:${PORT}`);
  });
});