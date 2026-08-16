const Course = require("../models/Course");
const CourseCompletion = require("../models/CourseCompletion");
const PDFDocument = require("pdfkit");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().select("title description level courseUrl");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const completeCourse = async (req, res) => {
  try {
    const existing = await CourseCompletion.findOne({ userId: req.userId, courseId: req.params.id });
    if (existing) {
      return res.json({ message: "Already completed", completion: existing });
    }
    const completion = await CourseCompletion.create({ userId: req.userId, courseId: req.params.id });
    res.status(201).json({ message: "Course marked as completed", completion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCertificate = async (req, res) => {
  try {
    const completion = await CourseCompletion.findOne({ userId: req.userId, courseId: req.params.id });
    if (!completion) {
      return res.status(403).json({ error: "Course not completed yet" });
    }
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const User = require("../models/User");
    const user = await User.findById(req.userId);

    const doc = new PDFDocument({ layout: "landscape", size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="certificate-${course.title}.pdf"`);
    doc.pipe(res);

    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke("#1D3557");
    doc.fontSize(30).fillColor("#1D3557").text("Certificate of Completion", 0, 100, { align: "center" });
    doc.moveDown(2);
    doc.fontSize(18).fillColor("#333").text("This certifies that", { align: "center" });
    doc.moveDown();
    doc.fontSize(26).fillColor("#000").text(user?.name || "Learner", { align: "center" });
    doc.moveDown();
    doc.fontSize(18).fillColor("#333").text("has successfully completed the course", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(22).fillColor("#1D3557").text(course.title, { align: "center" });
    doc.moveDown(2);
    doc.fontSize(12).fillColor("#666").text(`Issued on ${new Date(completion.completedAt).toDateString()}`, { align: "center" });
    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const { askClaude } = require("../utils/askClaude");

const getLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const langCode = req.query.lang || "ta";
    const LANGUAGE_NAMES = { ta: "Tamil", hi: "Hindi", te: "Telugu", en: "English" };
    const langName = LANGUAGE_NAMES[langCode] || "Tamil";

    const systemPrompt = `You are a patient teacher. Write a structured lesson in ${langName} for the topic "${course.title}" (${course.description}).
Cover it from BASIC to ADVANCED, in clear numbered sections. Each section should have a short title and 3-5 sentences of explanation with a simple example.
Keep technical/programming terms in English even inside ${langName} text.
Format as plain text with section headers like "1. <title>", "2. <title>" etc. No markdown symbols.`;

    const lesson = await askClaude(systemPrompt, `Topic: ${course.title}`, 2000);
    res.json({ courseTitle: course.title, lesson });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCourses, getCourseById, createCourse, completeCourse, getCertificate, getLesson };