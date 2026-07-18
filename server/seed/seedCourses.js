require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../models/Course");

const sampleCourses = [
  {
    title: "React Basics",
    description: "Learn React components, props and state from scratch.",
    level: "Beginner",
    languageCode: "ta",
    lessons: [
      { title: "What is a Component?", content: "Component nu sonna, oru reusable UI piece.", order: 1 },
      { title: "Props vs State", content: "Props nu sonna parent kudukura data, State nu sonna component ku ulla irukura data.", order: 2 },
    ],
  },
  {
    title: "Git & GitHub",
    description: "Version control basics every developer needs.",
    level: "Beginner",
    languageCode: "ta",
    lessons: [
      { title: "git init, add, commit", content: "git init - repo create pannum. git add - staging ku kondu varum. git commit - save pannum.", order: 1 },
    ],
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Course.deleteMany({ languageCode: "ta" });
  await Course.insertMany(sampleCourses);
  console.log("Seeded sample Tamil courses.");
  process.exit(0);
};

run().catch((err) => { console.error(err); process.exit(1); });