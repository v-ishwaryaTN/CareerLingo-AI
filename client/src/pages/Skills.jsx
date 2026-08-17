import React from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import "./CourseDetails.css";

export default function Skills() {
  const navigate = useNavigate();

  return (
    <div className="courses-page">

      <div className="courses-hero">
        <div>
          <span className="hero-badge">🚀 CareerLingo AI Learning</span>

          <h1>
            Learn Skills in <span>Your Own Language</span>
          </h1>

          <p>
            Learn programming and technology courses with videos,
            lessons, quizzes and practical examples in your preferred language.
          </p>
        </div>
      </div>

      <div className="courses-container">

        <div className="course-heading">
          <div>
            <h2>Explore All Courses</h2>
            <p>Choose a course and start learning today.</p>
          </div>

          <div className="course-count">
            {courses.length} Courses
          </div>
        </div>

        <div className="course-grid">

          {courses.map((course) => (
            <div className="course-card" key={course.id}>

              <div className="course-icon">
                {course.icon}
              </div>

              <span className="course-category">
                {course.category}
              </span>

              <h3>{course.title}</h3>

              <p>{course.description}</p>

              <div className="course-info">
                <span>📚 {course.lessons.length} Lessons</span>
                <span>🎯 {course.level}</span>
              </div>

              <div className="course-features">
                <span>🌐 Multiple Languages</span>
                <span>📝 Quiz</span>
                <span>💻 Practice</span>
              </div>

              <button
                className="start-course-btn"
                onClick={() =>
                  navigate(`/course/${course.id}`)
                }
              >
                Start Learning →
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}