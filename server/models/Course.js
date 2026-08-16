const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   level: { type: String, default: "BEGINNER" },
//   courseUrl: { type: String, default: "" },
//   language: { type: String, default: "ta" }, // ta, en, hi, etc.
//   videoPath: { type: String, default: "" }, // local server path for uploaded video
// }, { timestamps: true });



const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    languageCode: { type: String, required: true, default: "ta" },
    videoId: { type: String, default: "SqcY0GlETPk" },
    lessons: [],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Course", courseSchema);