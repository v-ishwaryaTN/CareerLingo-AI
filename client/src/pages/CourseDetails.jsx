import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courses, getCourseVideo, isEmbeddableVideo } from "../data/courses";
import "./CourseDetails.css";

const languages = {
  en: "English",
  ta: "தமிழ்",
  hi: "हिन्दी",
  te: "తెలుగు",
  ml: "മലയാളം",
  kn: "ಕನ್ನಡ",
  bn: "বাংলা",
  mr: "मराठी",
  gu: "ગુજરાતી",
  pa: "ਪੰਜਾਬੀ",
  or: "ଓଡ଼ିଆ",
  as: "অসমীয়া"
};

const speechLangMap = {
  en: "en-US",
  ta: "ta-IN",
  hi: "hi-IN",
  te: "te-IN",
  ml: "ml-IN",
  kn: "kn-IN",
  bn: "bn-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  pa: "pa-IN",
  or: "or-IN",
  as: "as-IN",
};

export default function CourseDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((item) => item.id === id);

  const [language, setLanguage] = useState("ta");
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState([]);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState("");

  const [isDubbing, setIsDubbing] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);

  if (!course) {
    return (
      <div className="not-found">
        <h2>Course Not Found</h2>
        <button onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  const lesson = course.lessons[activeLesson];

  const content =
    lesson.content[language] || lesson.content.en;

  const isCompleted = completed.includes(lesson.id);

  // Main embedded video is ALWAYS the English video (this is the one we
  // most often have a real, working embeddable link for). Some courses
  // only have a YouTube SEARCH link even for English (no verified video
  // ID yet) — isEmbeddableVideo() tells us which case we're in, so we
  // never try to <iframe> a search-results page (YouTube blocks that
  // with X-Frame-Options, which showed up as a broken image icon).
  const videoSrc = getCourseVideo(course, "en");
  const videoIsEmbeddable = isEmbeddableVideo(videoSrc);

  // Language-specific "watch in your language" link. If the course data
  // already has a link saved for this language, use it; otherwise build a
  // YouTube search link on the fly so this works for all 12 languages,
  // not just the ones baked into courses.js.
  const getLanguageWatchLink = (langCode) => {
    if (langCode === "en") return null;
    const savedLink =
      typeof course.video === "object" ? course.video[langCode] : null;
    if (savedLink) return savedLink;

    const query = `${course.title} tutorial in ${languages[langCode]}`;
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  };

  const languageWatchLink = getLanguageWatchLink(language);

  const markComplete = () => {

    if (!completed.includes(lesson.id)) {
      setCompleted([
        ...completed,
        lesson.id
      ]);
    }

    if (activeLesson < course.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
      setSelectedAnswer(null);
      setQuizResult("");
    }
  };

  const checkAnswer = () => {

    if (selectedAnswer === null) {
      setQuizResult("Please select an answer.");
      return;
    }

    if (
      selectedAnswer === lesson.quiz.answer
    ) {
      setQuizResult("🎉 Correct Answer! +10 XP");
    } else {
      setQuizResult("❌ Wrong Answer. Try Again!");
    }
  };

  // ---- Load available voices, waiting for the async 'voiceschanged'
  // event if the browser hasn't populated the list yet (common on first
  // page load in Chrome) ----
  const getVoicesAsync = () =>
    new Promise((resolve) => {
      const existing = window.speechSynthesis.getVoices();
      if (existing.length > 0) {
        resolve(existing);
        return;
      }
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
      // Safety timeout in case voiceschanged never fires
      setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1000);
    });

  // ---- Audio / Dubbing: narrate the lesson explanation in selected language ----
  const toggleDubbing = async () => {
    if (!window.speechSynthesis) {
      alert("Voice playback browser support pannala. Chrome use pannunga.");
      return;
    }

    if (isDubbing) {
      window.speechSynthesis.cancel();
      setIsDubbing(false);
      return;
    }

    window.speechSynthesis.cancel();

    const voices = await getVoicesAsync();
    const targetLang = speechLangMap[language] || "en-US";
    const matchingVoice = voices.find((v) => v.lang === targetLang);
    const partialMatch =
      matchingVoice || voices.find((v) => v.lang.startsWith(targetLang.split("-")[0]));

    if (!matchingVoice && !partialMatch) {
      console.warn(
        `No installed voice found for ${targetLang}. Falling back to the browser's default voice — audio will play, but likely in a different accent/language.`
      );
    }

    // Chrome-la cancel() udane speak() call pannna sometimes silent-a fail aagum,
    // konjam delay kudukkanum
    setTimeout(() => {
      const textToSpeak = `${content.title}. ${content.description} ${content.explanation}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      if (partialMatch) utterance.voice = partialMatch;

      utterance.lang = targetLang;
      utterance.rate = 0.95;
      utterance.volume = 1;
      utterance.pitch = 1;

      utterance.onstart = () => console.log("Speech started");
      utterance.onend = () => setIsDubbing(false);
      utterance.onerror = (e) => {
        console.error("Speech error:", e);
        setIsDubbing(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsDubbing(true);
    }, 150);
  };

  const toggleSubtitles = () => {
    setShowSubtitles((prev) => !prev);
  };

  const progress =
    Math.round(
      (completed.length / course.lessons.length) * 100
    );

  return (
    <div className="course-details-page">

      {/* HEADER */}

      <header className="course-topbar">

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← All Courses
        </button>

        <div className="course-title">
          {course.icon} {course.title}
        </div>

        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            window.speechSynthesis?.cancel();
            setIsDubbing(false);
          }}
        >

          {Object.entries(languages).map(
            ([key, value]) => (
              <option
                key={key}
                value={key}
              >
                {value}
              </option>
            )
          )}

        </select>

      </header>


      {/* COURSE HERO */}

      <section className="course-details-hero">

        <span>
          {course.category}
        </span>

        <h1>
          {course.title}
        </h1>

        <p>
          {course.description}
        </p>

        <div className="hero-stats">
          <span>
            📚 {course.lessons.length} Lessons
          </span>

          <span>
            🎯 {course.level}
          </span>

          <span>
            🌐 {languages[language]}
          </span>

          <span>
            ⭐ {progress}% Complete
          </span>
        </div>

      </section>


      {/* PROGRESS */}

      <div className="progress-container">

        <div className="progress-header">
          <span>
            Course Progress
          </span>

          <strong>
            {progress}%
          </strong>
        </div>

        <div className="progress-bar">
          <div
            style={{
              width: `${progress}%`
            }}
          />
        </div>

      </div>


      <div className="learning-layout">

        {/* SIDEBAR */}

        <aside className="lesson-sidebar">

          <h2>
            Course Content
          </h2>

          <p>
            {completed.length}/{course.lessons.length} Lessons Completed
          </p>

          {course.lessons.map(
            (item, index) => (

              <button
                key={item.id}
                className={
                  `lesson-item ${
                    activeLesson === index
                      ? "active"
                      : ""
                  }`
                }
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsDubbing(false);
                  setActiveLesson(index);
                  setSelectedAnswer(null);
                  setQuizResult("");
                }}
              >

                <div className="lesson-number">
                  {completed.includes(item.id)
                    ? "✓"
                    : index + 1}
                </div>

                <div>
                  <small>
                    Lesson {index + 1}
                  </small>

                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    ⏱ {item.duration}
                  </span>
                </div>

              </button>

            )
          )}

        </aside>


        {/* MAIN CONTENT */}

        <main className="lesson-content">

          {/* VIDEO */}

          <section className="video-section">

            <div className="video-header">
              <h2>
                🎬 Video Lesson
              </h2>

              <span>
                🌐 {languages[language]} Learning
              </span>
            </div>

            <div className="video-wrapper">

              {videoIsEmbeddable ? (
                <iframe
                  src={videoSrc}
                  title={course.title}
                  allowFullScreen
                />
              ) : (
                <a
                  className="video-fallback-card"
                  href={videoSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="video-fallback-topleft">
                    <span className="video-fallback-icon">{course.icon}</span>
                    <div>
                      <span className="video-fallback-title">{course.title} Full Course</span>
                      <span className="video-fallback-sub">CareerLingo AI · Tutorial</span>
                    </div>
                  </div>

                  <span className="video-fallback-play">▶</span>

                  <span className="video-fallback-badge">▶ Watch on YouTube</span>
                </a>
              )}

            </div>

            {languageWatchLink && (
              <a
                href={languageWatchLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  color: "#93c5fd",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                🌐 Watch this topic in {languages[language]} on YouTube ↗
              </a>
            )}

            <div className="video-tools">

              <button
                onClick={toggleDubbing}
                className={isDubbing ? "dubbing-active" : ""}
              >
                {isDubbing ? "⏹ Stop Narration" : "🔊 Audio / Dubbing"}
              </button>

              <button
                onClick={toggleSubtitles}
                className={showSubtitles ? "subtitles-active" : ""}
              >
                💬 Subtitles {showSubtitles ? "(On)" : ""}
              </button>

              <span>
                🌐 Lesson narrated in {languages[language]}
              </span>

            </div>

            {showSubtitles && (
              <div className="subtitle-box">
                {content.explanation}
              </div>
            )}

          </section>


          {/* LESSON */}

          <section className="lesson-card">

            <div className="lesson-card-header">

              <div>
                <span>
                  Lesson {activeLesson + 1}
                </span>

                <h1>
                  {content.title}
                </h1>
              </div>

              <div className="xp-badge">
                ⭐ +10 XP
              </div>

            </div>

            <div className="language-notice">
              🌐 This lesson is available in your preferred language:
              <strong>
                {" "}{languages[language]}
              </strong>
            </div>

            <h2>
              📖 What You Will Learn
            </h2>

            <p>
              {content.description}
            </p>

            <div className="explanation-box">

              <h3>
                💡 Explanation
              </h3>

              <p>
                {content.explanation}
              </p>

            </div>


            {/* CODE */}

            <div className="code-section">

              <h3>
                💻 Practical Code Example
              </h3>

              <pre>
                <code>
                  {content.example}
                </code>
              </pre>

            </div>


            {/* QUIZ */}

            <div className="quiz-section">

              <h2>
                🧠 Quick Test
              </h2>

              <p>
                {lesson.quiz.question}
              </p>

              <div className="quiz-options">

                {lesson.quiz.options.map(
                  (option, index) => (

                    <label
                      key={option}
                      className={
                        selectedAnswer === index
                          ? "selected-answer"
                          : ""
                      }
                    >

                      <input
                        type="radio"
                        name="quiz"
                        checked={
                          selectedAnswer === index
                        }
                        onChange={() =>
                          setSelectedAnswer(index)
                        }
                      />

                      {option}

                    </label>

                  )
                )}

              </div>

              <button
                className="check-answer-btn"
                onClick={checkAnswer}
              >
                Check Answer
              </button>

              {quizResult && (
                <div className="quiz-result">
                  {quizResult}
                </div>
              )}

            </div>


            {/* COMPLETE */}

            <div className="lesson-actions">

              <button
                className="complete-btn"
                onClick={markComplete}
              >
                {isCompleted
                  ? "✓ Lesson Completed"
                  : "✓ Mark Lesson Complete"}
              </button>

              {activeLesson < course.lessons.length - 1 && (

                <button
                  className="next-btn"
                  onClick={markComplete}
                >
                  Next Lesson →
                </button>

              )}

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}