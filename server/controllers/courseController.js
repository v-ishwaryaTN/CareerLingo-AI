const Course = require("../models/Course");

const getCourses = async (req, res) => {
  try {
    const lang = req.query.lang || "ta";
    const courses = await Course.find({ languageCode: lang }).select("title description level languageCode");
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

module.exports = { getCourses, getCourseById, createCourse };