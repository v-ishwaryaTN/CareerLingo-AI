const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    languageCode: { type: String, required: true, default: "ta" },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);