// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Course = require("../models/Course");
// dotenv.config();

// function ytSearch(query) {
//   return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
// }

// const courses = [
//   { title: "React Basics", description: "Learn React components, props and state from scratch.", level: "BEGINNER", courseUrl: ytSearch("React basics tutorial in Tamil") },
//   { title: "Git & GitHub", description: "Version control basics every developer needs.", level: "BEGINNER", courseUrl: ytSearch("Git and GitHub tutorial in Tamil") },
//   { title: "Node.js Basics", description: "Learn server-side JavaScript with Node.js.", level: "BEGINNER", courseUrl: ytSearch("Node.js tutorial in Tamil") },
//   { title: "JavaScript Fundamentals", description: "Core JavaScript concepts every developer must know.", level: "BEGINNER", courseUrl: ytSearch("JavaScript full course in Tamil") },
//   { title: "HTML & CSS Basics", description: "Build the structure and style of web pages.", level: "BEGINNER", courseUrl: ytSearch("HTML CSS full course in Tamil") },
//   { title: "Python for Beginners", description: "Learn Python programming from scratch.", level: "BEGINNER", courseUrl: ytSearch("Python full course in Tamil") },
//   { title: "SQL & Databases", description: "Learn to query and manage relational databases.", level: "BEGINNER", courseUrl: ytSearch("SQL tutorial in Tamil") },
//   { title: "MongoDB Basics", description: "Work with NoSQL databases using MongoDB.", level: "BEGINNER", courseUrl: ytSearch("MongoDB tutorial in Tamil") },
//   { title: "Express.js Backend Development", description: "Build REST APIs using Express.js and Node.", level: "INTERMEDIATE", courseUrl: ytSearch("Express.js tutorial in Tamil") },
//   { title: "Data Structures & Algorithms", description: "Master DSA concepts for coding interviews.", level: "INTERMEDIATE", courseUrl: ytSearch("Data structures and algorithms in Tamil") },
//   { title: "Java Programming", description: "Learn object-oriented programming with Java.", level: "BEGINNER", courseUrl: ytSearch("Java full course in Tamil") },
//   { title: "REST API Design", description: "Learn to design and build RESTful APIs.", level: "INTERMEDIATE", courseUrl: ytSearch("REST API tutorial in Tamil") },
//   { title: "Docker Basics", description: "Containerize applications using Docker.", level: "INTERMEDIATE", courseUrl: ytSearch("Docker tutorial in Tamil") },
//   { title: "AWS Cloud Fundamentals", description: "Get started with Amazon Web Services cloud computing.", level: "BEGINNER", courseUrl: ytSearch("AWS tutorial in Tamil") },
//   { title: "Linux Command Line", description: "Learn essential Linux commands for developers.", level: "BEGINNER", courseUrl: ytSearch("Linux commands tutorial in Tamil") },
//   { title: "Machine Learning Basics", description: "Introduction to machine learning concepts and models.", level: "INTERMEDIATE", courseUrl: ytSearch("Machine learning tutorial in Tamil") },
//   { title: "Cybersecurity Fundamentals", description: "Learn the basics of information security.", level: "BEGINNER", courseUrl: ytSearch("Cybersecurity basics tutorial in Tamil") },
//   { title: "TypeScript for JavaScript Developers", description: "Add static typing to your JavaScript projects.", level: "INTERMEDIATE", courseUrl: ytSearch("TypeScript tutorial in Tamil") },
//   { title: "Software Testing Basics", description: "Learn manual and automated testing fundamentals.", level: "BEGINNER", courseUrl: ytSearch("Software testing tutorial in Tamil") },
//   { title: "System Design Basics", description: "Learn how to design scalable software systems.", level: "ADVANCED", courseUrl: ytSearch("System design tutorial in Tamil") },
// ];

// mongoose.connect(process.env.MONGO_URI).then(async () => {
//   await Course.deleteMany({});
//   await Course.insertMany(courses);
//   console.log("Courses seeded:", courses.length);
//   process.exit();
// });

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Course = require("../models/Course");
dotenv.config();

function ytSearch(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

const courses = [
  { title: "React Basics", description: "Learn React components, props and state from scratch.", level: "BEGINNER", courseUrl: ytSearch("React basics tutorial in Tamil") },
  { title: "Git & GitHub", description: "Version control basics every developer needs.", level: "BEGINNER", courseUrl: ytSearch("Git and GitHub tutorial in Tamil") },
  { title: "Node.js Basics", description: "Learn server-side JavaScript with Node.js.", level: "BEGINNER", courseUrl: ytSearch("Node.js tutorial in Tamil") },
  { title: "JavaScript Fundamentals", description: "Core JavaScript concepts every developer must know.", level: "BEGINNER", courseUrl: ytSearch("JavaScript full course in Tamil") },
  { title: "HTML & CSS Basics", description: "Build the structure and style of web pages.", level: "BEGINNER", courseUrl: ytSearch("HTML CSS full course in Tamil") },
  { title: "Python for Beginners", description: "Learn Python programming from scratch.", level: "BEGINNER", courseUrl: ytSearch("Python full course in Tamil") },
  { title: "SQL & Databases", description: "Learn to query and manage relational databases.", level: "BEGINNER", courseUrl: ytSearch("SQL tutorial in Tamil") },
  { title: "MongoDB Basics", description: "Work with NoSQL databases using MongoDB.", level: "BEGINNER", courseUrl: ytSearch("MongoDB tutorial in Tamil") },
  { title: "Express.js Backend Development", description: "Build REST APIs using Express.js and Node.", level: "INTERMEDIATE", courseUrl: ytSearch("Express.js tutorial in Tamil") },
  { title: "Data Structures & Algorithms", description: "Master DSA concepts for coding interviews.", level: "INTERMEDIATE", courseUrl: ytSearch("Data structures and algorithms in Tamil") },
  { title: "Java Programming", description: "Learn object-oriented programming with Java.", level: "BEGINNER", courseUrl: ytSearch("Java full course in Tamil") },
  { title: "REST API Design", description: "Learn to design and build RESTful APIs.", level: "INTERMEDIATE", courseUrl: ytSearch("REST API tutorial in Tamil") },
  { title: "Docker Basics", description: "Containerize applications using Docker.", level: "INTERMEDIATE", courseUrl: ytSearch("Docker tutorial in Tamil") },
  { title: "AWS Cloud Fundamentals", description: "Get started with Amazon Web Services cloud computing.", level: "BEGINNER", courseUrl: ytSearch("AWS tutorial in Tamil") },
  { title: "Linux Command Line", description: "Learn essential Linux commands for developers.", level: "BEGINNER", courseUrl: ytSearch("Linux commands tutorial in Tamil") },
  { title: "Machine Learning Basics", description: "Introduction to machine learning concepts and models.", level: "INTERMEDIATE", courseUrl: ytSearch("Machine learning tutorial in Tamil") },
  { title: "Cybersecurity Fundamentals", description: "Learn the basics of information security.", level: "BEGINNER", courseUrl: ytSearch("Cybersecurity basics tutorial in Tamil") },
  { title: "TypeScript for JavaScript Developers", description: "Add static typing to your JavaScript projects.", level: "INTERMEDIATE", courseUrl: ytSearch("TypeScript tutorial in Tamil") },
  { title: "Software Testing Basics", description: "Learn manual and automated testing fundamentals.", level: "BEGINNER", courseUrl: ytSearch("Software testing tutorial in Tamil") },
  { title: "System Design Basics", description: "Learn how to design scalable software systems.", level: "ADVANCED", courseUrl: ytSearch("System design tutorial in Tamil") },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Course.deleteMany({});
  await Course.insertMany(courses);
  console.log("Courses seeded:", courses.length);
  process.exit();
});