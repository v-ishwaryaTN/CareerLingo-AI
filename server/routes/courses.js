const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { getCourses, getCourseById, createCourse, completeCourse, getCertificate, getLesson } = require("../controllers/courseController");
// ...existing routes...
router.get("/:id/lesson", getLesson);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.post("/:id/complete", protect, completeCourse);
router.get("/:id/certificate", protect, getCertificate);

module.exports = router;