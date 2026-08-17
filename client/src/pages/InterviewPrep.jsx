import React, { useEffect, useRef, useState } from "react";
import "./InterviewPrep.css";

/* =====================================================
   LANGUAGES
===================================================== */

const languages = [
  {
    code: "en",
    name: "English",
    speechCode: "en-IN",
  },
  {
    code: "ta",
    name: "தமிழ்",
    speechCode: "ta-IN",
  },
  {
    code: "te",
    name: "తెలుగు",
    speechCode: "te-IN",
  },
  {
    code: "ml",
    name: "മലയാളം",
    speechCode: "ml-IN",
  },
  {
    code: "hi",
    name: "हिन्दी",
    speechCode: "hi-IN",
  },
  {
    code: "kn",
    name: "ಕನ್ನಡ",
    speechCode: "kn-IN",
  },
  {
    code: "bn",
    name: "বাংলা",
    speechCode: "bn-IN",
  },
];

/* =====================================================
   INTERVIEW ROLES
===================================================== */

const interviewRoles = [
  {
    id: "frontend",
    name: "Frontend Developer",
    icon: "🎨",
  },
  {
    id: "backend",
    name: "Backend Developer",
    icon: "⚙️",
  },
  {
    id: "fullstack",
    name: "Full Stack Developer",
    icon: "🚀",
  },
  {
    id: "react",
    name: "React Developer",
    icon: "⚛️",
  },
  {
    id: "javascript",
    name: "JavaScript Developer",
    icon: "🟨",
  },
  {
    id: "java",
    name: "Java Developer",
    icon: "☕",
  },
  {
    id: "python",
    name: "Python Developer",
    icon: "🐍",
  },
  {
    id: "hr",
    name: "HR Interview",
    icon: "👨‍💼",
  },
];

/* =====================================================
   QUESTIONS BY ROLE
===================================================== */

const roleQuestions = {
  frontend: [
    "Tell me about yourself and your frontend development experience.",
    "What is HTML, CSS and JavaScript and how do they work together?",
    "What frontend project have you worked on recently?",
    "How do you make a website responsive?",
    "How do you improve frontend performance?",
  ],

  backend: [
    "Tell me about yourself and your backend development experience.",
    "What is an API and how does it work?",
    "Which backend technologies have you worked with?",
    "How do you handle errors in a backend application?",
    "How do you secure a backend API?",
  ],

  fullstack: [
    "Tell me about yourself and your Full Stack development experience.",
    "Explain a full-stack project that you have worked on.",
    "Why did you choose your frontend and backend technologies?",
    "How does the frontend communicate with your backend?",
    "How do you manage authentication in a full-stack application?",
  ],

  react: [
    "Tell me about yourself and your experience with React.",
    "What is a React component?",
    "What is the difference between useState and useEffect?",
    "Tell me about a React project you have built.",
    "How do you optimize a React application?",
  ],

  javascript: [
    "Tell me about yourself and your JavaScript experience.",
    "What is the difference between let, const and var?",
    "What are JavaScript promises?",
    "Explain async and await.",
    "Tell me about a project where you used JavaScript.",
  ],

  java: [
    "Tell me about yourself and your Java experience.",
    "What is the difference between JDK, JRE and JVM?",
    "What is OOP in Java?",
    "Explain inheritance and polymorphism.",
    "Tell me about a Java project you have worked on.",
  ],

  python: [
    "Tell me about yourself and your Python experience.",
    "What are lists and tuples in Python?",
    "What is a Python dictionary?",
    "What are functions in Python?",
    "Tell me about a Python project you have built.",
  ],

  hr: [
    "Tell me about yourself.",
    "What are your strengths?",
    "What is your biggest weakness?",
    "Why should we hire you?",
    "Where do you see yourself in five years?",
  ],
};

/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {
  en: {
    title: "AI Interview Preparation",
    subtitle:
      "Practice interviews with an AI interviewer",
    selectRole: "Select Interview Role",
    selectLanguage: "Select Language",
    start: "Start Interview",
    question: "Interview Question",
    answer: "Your Answer",
    placeholder:
      "Type your answer or use the microphone...",
    voice: "Speak Answer",
    stop: "Stop Listening",
    analyze: "Analyze My Answer",
    analyzing: "Analyzing...",
    feedback: "AI Feedback",
    suggestion: "How to Improve",
    next: "Next Question",
    restart: "Restart Interview",
    score: "Score",
    listening: "Listening... Please speak",
    completed: "Interview Completed!",
    completedText:
      "Great job! You have completed your practice interview.",
  },

  ta: {
    title: "AI நேர்காணல் பயிற்சி",
    subtitle:
      "AI Interviewer உடன் நேர்காணல் பயிற்சி செய்யுங்கள்",
    selectRole: "நேர்காணல் துறையை தேர்வு செய்யவும்",
    selectLanguage: "மொழியை தேர்வு செய்யவும்",
    start: "நேர்காணலை தொடங்கவும்",
    question: "நேர்காணல் கேள்வி",
    answer: "உங்கள் பதில்",
    placeholder:
      "உங்கள் பதிலை type செய்யுங்கள் அல்லது microphone பயன்படுத்துங்கள்...",
    voice: "பதில் பேசுங்கள்",
    stop: "கேட்பதை நிறுத்து",
    analyze: "என் பதிலை Analyze செய்",
    analyzing: "Analyze செய்கிறது...",
    feedback: "AI Feedback",
    suggestion: "எப்படி Improve செய்வது",
    next: "அடுத்த கேள்வி",
    restart: "மீண்டும் தொடங்கு",
    score: "மதிப்பெண்",
    listening: "கேட்கிறேன்... பேசுங்கள்",
    completed: "Interview முடிந்தது!",
    completedText:
      "சிறப்பாக செய்துள்ளீர்கள்! உங்கள் practice interview முடிந்தது.",
  },

  te: {
    title: "AI ఇంటర్వ్యూ ప్రాక్టీస్",
    subtitle: "AI Interviewer తో practice చేయండి",
    selectRole: "Interview Role ఎంచుకోండి",
    selectLanguage: "భాషను ఎంచుకోండి",
    start: "Interview ప్రారంభించండి",
    question: "Interview Question",
    answer: "మీ సమాధానం",
    placeholder: "మీ answer type చేయండి లేదా microphone ఉపయోగించండి...",
    voice: "Answer మాట్లాడండి",
    stop: "Listening ఆపండి",
    analyze: "నా Answer Analyze చేయండి",
    analyzing: "Analyze చేస్తోంది...",
    feedback: "AI Feedback",
    suggestion: "ఎలా Improve చేయాలి",
    next: "Next Question",
    restart: "Restart Interview",
    score: "Score",
    listening: "వింటున్నాను... మాట్లాడండి",
    completed: "Interview పూర్తయింది!",
    completedText:
      "Great job! మీ practice interview పూర్తయింది.",
  },

  ml: {
    title: "AI ഇന്റർവ്യൂ പരിശീലനം",
    subtitle: "AI Interviewer ഉപയോഗിച്ച് practice ചെയ്യാം",
    selectRole: "Interview Role തിരഞ്ഞെടുക്കുക",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    start: "Interview ആരംഭിക്കുക",
    question: "Interview Question",
    answer: "നിങ്ങളുടെ ഉത്തരം",
    placeholder: "Answer type ചെയ്യുക അല്ലെങ്കിൽ microphone ഉപയോഗിക്കുക...",
    voice: "Answer സംസാരിക്കുക",
    stop: "Listening നിർത്തുക",
    analyze: "Answer Analyze ചെയ്യുക",
    analyzing: "Analyze ചെയ്യുന്നു...",
    feedback: "AI Feedback",
    suggestion: "എങ്ങനെ Improve ചെയ്യാം",
    next: "Next Question",
    restart: "Restart Interview",
    score: "Score",
    listening: "കേൾക്കുന്നു... സംസാരിക്കൂ",
    completed: "Interview പൂർത്തിയായി!",
    completedText:
      "Great job! നിങ്ങളുടെ practice interview പൂർത്തിയായി.",
  },

  hi: {
    title: "AI इंटरव्यू प्रैक्टिस",
    subtitle: "AI Interviewer के साथ practice करें",
    selectRole: "Interview Role चुनें",
    selectLanguage: "भाषा चुनें",
    start: "Interview शुरू करें",
    question: "Interview Question",
    answer: "आपका Answer",
    placeholder:
      "अपना answer type करें या microphone का उपयोग करें...",
    voice: "Answer बोलें",
    stop: "Listening बंद करें",
    analyze: "मेरा Answer Analyze करें",
    analyzing: "Analyze हो रहा है...",
    feedback: "AI Feedback",
    suggestion: "कैसे Improve करें",
    next: "Next Question",
    restart: "Restart Interview",
    score: "Score",
    listening: "सुन रहा हूँ... बोलिए",
    completed: "Interview पूरा हुआ!",
    completedText:
      "Great job! आपका practice interview पूरा हो गया।",
  },

  kn: {
    title: "AI ಸಂದರ್ಶನ ಅಭ್ಯಾಸ",
    subtitle: "AI Interviewer ಜೊತೆ practice ಮಾಡಿ",
    selectRole: "Interview Role ಆಯ್ಕೆಮಾಡಿ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
    start: "Interview ಪ್ರಾರಂಭಿಸಿ",
    question: "Interview Question",
    answer: "ನಿಮ್ಮ Answer",
    placeholder:
      "ನಿಮ್ಮ answer type ಮಾಡಿ ಅಥವಾ microphone ಬಳಸಿ...",
    voice: "Answer ಮಾತನಾಡಿ",
    stop: "Listening ನಿಲ್ಲಿಸಿ",
    analyze: "ನನ್ನ Answer Analyze ಮಾಡಿ",
    analyzing: "Analyze ಮಾಡುತ್ತಿದೆ...",
    feedback: "AI Feedback",
    suggestion: "ಹೇಗೆ Improve ಮಾಡುವುದು",
    next: "Next Question",
    restart: "Restart Interview",
    score: "Score",
    listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ... ಮಾತನಾಡಿ",
    completed: "Interview ಪೂರ್ಣಗೊಂಡಿದೆ!",
    completedText:
      "Great job! ನಿಮ್ಮ practice interview ಪೂರ್ಣಗೊಂಡಿದೆ.",
  },

  bn: {
    title: "AI ইন্টারভিউ প্র্যাকটিস",
    subtitle: "AI Interviewer এর সাথে practice করুন",
    selectRole: "Interview Role নির্বাচন করুন",
    selectLanguage: "ভাষা নির্বাচন করুন",
    start: "Interview শুরু করুন",
    question: "Interview Question",
    answer: "আপনার Answer",
    placeholder:
      "আপনার answer type করুন অথবা microphone ব্যবহার করুন...",
    voice: "Answer বলুন",
    stop: "Listening বন্ধ করুন",
    analyze: "আমার Answer Analyze করুন",
    analyzing: "Analyze হচ্ছে...",
    feedback: "AI Feedback",
    suggestion: "কীভাবে Improve করবেন",
    next: "Next Question",
    restart: "Restart Interview",
    score: "Score",
    listening: "শুনছি... বলুন",
    completed: "Interview সম্পূর্ণ!",
    completedText:
      "Great job! আপনার practice interview সম্পূর্ণ হয়েছে।",
  },
};

/* =====================================================
   COMPONENT
===================================================== */

function InterviewPrep() {
  const [language, setLanguage] = useState("en");

  const [role, setRole] = useState("");

  const [started, setStarted] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");

  const [suggestion, setSuggestion] = useState("");

  const [score, setScore] = useState(null);

  const [isListening, setIsListening] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef(null);

  const t = translations[language];

  const selectedLanguage = languages.find(
    (item) => item.code === language
  );

  const currentQuestions =
    roleQuestions[role] || [];

  const currentQuestion =
    currentQuestions[questionIndex];

  /* ===================================================
     CLEANUP
  =================================================== */

  useEffect(() => {
    return () => {
      stopListening();

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /* ===================================================
     START INTERVIEW
  =================================================== */

  const startInterview = () => {
    if (!role) {
      alert("Please select an interview role.");
      return;
    }

    setStarted(true);
    setQuestionIndex(0);
    setAnswer("");
    setFeedback("");
    setSuggestion("");
    setScore(null);

    speakText(
      currentQuestions[0]
    );
  };

  /* ===================================================
     VOICE INPUT
  =================================================== */

  const toggleVoice = () => {
    if (isListening) {
      stopListening();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported. Please use Google Chrome."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      selectedLanguage?.speechCode ||
      "en-IN";

    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.maxAlternatives = 1;

    recognitionRef.current =
      recognition;

    setIsListening(true);

    try {
      recognition.start();
    } catch (error) {
      console.log(error);
    }

    recognition.onresult = (event) => {
      let finalText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const text =
          event.results[i][0]
            .transcript;

        if (
          event.results[i].isFinal
        ) {
          finalText += text;
        }
      }

      if (finalText) {
        setAnswer(
          (previous) =>
            previous
              ? `${previous} ${finalText}`
              : finalText
        );
      }
    };

    recognition.onerror = (
      event
    ) => {
      console.log(
        "Voice error:",
        event.error
      );

      setIsListening(false);
      recognitionRef.current =
        null;
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current =
        null;
    };
  };

  /* ===================================================
     STOP VOICE
  =================================================== */

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();

      recognitionRef.current =
        null;
    }

    setIsListening(false);
  };

  /* ===================================================
     AI VOICE
  =================================================== */

  const speakText = (text) => {
    if (!window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    speech.lang =
      selectedLanguage?.speechCode ||
      "en-IN";

    speech.rate = 0.95;

    speech.pitch = 1;

    speech.volume = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(
      speech
    );
  };

  /* ===================================================
     ANALYZE ANSWER
  =================================================== */

  const analyzeAnswer = () => {
    if (!answer.trim()) {
      alert(
        "Please answer the question first."
      );
      return;
    }

    setIsAnalyzing(true);

    stopListening();

    setTimeout(() => {
      const wordCount =
        answer
          .trim()
          .split(/\s+/)
          .length;

      let calculatedScore = 5;

      if (wordCount >= 10)
        calculatedScore = 6;

      if (wordCount >= 20)
        calculatedScore = 7;

      if (wordCount >= 35)
        calculatedScore = 8;

      if (wordCount >= 50)
        calculatedScore = 9;

      if (wordCount >= 70)
        calculatedScore = 10;

      let feedbackText = "";

      let suggestionText = "";

      /* ===============================================
         ROLE BASED ANALYSIS
      =============================================== */

      if (
        role === "react" &&
        answer.toLowerCase().includes("react")
      ) {
        feedbackText =
          "Good answer! You have mentioned React clearly. Your answer shows that you understand the technology.";

        suggestionText =
          "Try explaining a real React project you worked on. Mention components, hooks, API calls, and the challenges you faced.";
      }

      else if (
        role === "fullstack" &&
        (
          answer
            .toLowerCase()
            .includes("react") ||
          answer
            .toLowerCase()
            .includes("node")
        )
      ) {
        feedbackText =
          "Good answer! You mentioned your frontend and backend technologies.";

        suggestionText =
          "Make your answer stronger by explaining how your frontend communicates with your backend API and database.";
      }

      else if (
        role === "java" &&
        answer
          .toLowerCase()
          .includes("java")
      ) {
        feedbackText =
          "Good answer! You have mentioned your Java experience.";

        suggestionText =
          "Try giving a real Java project example and explain the OOP concepts or frameworks you used.";
      }

      else if (
        role === "hr"
      ) {
        feedbackText =
          "Your answer is a good start. Try to answer confidently and give a specific example from your experience.";

        suggestionText =
          "Use the STAR method: Situation, Task, Action, and Result. Keep your answer structured and positive.";
      }

      else if (
        wordCount < 10
      ) {
        feedbackText =
          "Your answer is too short. You have started well, but the interviewer needs more information.";

        suggestionText =
          "Try to explain your experience, skills, project, and the result you achieved.";
      }

      else if (
        wordCount < 25
      ) {
        feedbackText =
          "Good start! Your answer is understandable, but it can be more detailed.";

        suggestionText =
          "Add a specific example or project to support your answer.";
      }

      else {
        feedbackText =
          "Good answer! You provided enough information. Try to speak confidently and organize your answer clearly.";

        suggestionText =
          "Improve your answer by adding measurable results, specific examples, and your personal contribution.";
      }

      setScore(
        calculatedScore
      );

      setFeedback(
        feedbackText
      );

      setSuggestion(
        suggestionText
      );

      setIsAnalyzing(false);

      speakText(
        feedbackText +
          " " +
          suggestionText
      );
    }, 700);
  };

  /* ===================================================
     NEXT RELEVANT QUESTION
  =================================================== */

  const nextQuestion = () => {
    if (
      questionIndex <
      currentQuestions.length - 1
    ) {
      const nextIndex =
        questionIndex + 1;

      setQuestionIndex(
        nextIndex
      );

      setAnswer("");
      setFeedback("");
      setSuggestion("");
      setScore(null);

      speakText(
        currentQuestions[nextIndex]
      );
    }
  };

  /* ===================================================
     RESTART
  =================================================== */

  const restartInterview = () => {
    stopListening();

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setStarted(false);
    setRole("");
    setQuestionIndex(0);
    setAnswer("");
    setFeedback("");
    setSuggestion("");
    setScore(null);
  };

  /* ===================================================
     START SCREEN
  =================================================== */

  if (!started) {
    return (
      <div className="interview-page">

        <div className="setup-card">

          <div className="setup-icon">
            🤖
          </div>

          <h1>
            {t.title}
          </h1>

          <p>
            {t.subtitle}
          </p>

          {/* LANGUAGE */}

          <label>
            {t.selectLanguage}
          </label>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
          >
            {languages.map(
              (item) => (
                <option
                  key={item.code}
                  value={item.code}
                >
                  {item.name}
                </option>
              )
            )}
          </select>

          {/* ROLE */}

          <label>
            {t.selectRole}
          </label>

          <div className="role-grid">

            {interviewRoles.map(
              (item) => (

                <button
                  key={item.id}
                  className={
                    role === item.id
                      ? "role-card selected"
                      : "role-card"
                  }
                  onClick={() =>
                    setRole(
                      item.id
                    )
                  }
                >

                  <span>
                    {item.icon}
                  </span>

                  {item.name}

                </button>

              )
            )}

          </div>

          <button
            className="start-button"
            onClick={
              startInterview
            }
          >
            🚀 {t.start}
          </button>

        </div>

      </div>
    );
  }

  /* ===================================================
     INTERVIEW SCREEN
  =================================================== */

  return (
    <div className="interview-page">

      <div className="interview-wrapper">

        {/* HEADER */}

        <div className="interview-header">

          <div>

            <h1>
              🤖 {t.title}
            </h1>

            <p>
              {interviewRoles.find(
                (item) =>
                  item.id === role
              )?.name}
            </p>

          </div>

          <button
            className="restart-button"
            onClick={
              restartInterview
            }
          >
            🔄 {t.restart}
          </button>

        </div>

        {/* PROGRESS */}

        <div className="progress-card">

          <div>
            Question{" "}
            {questionIndex + 1} /{" "}
            {currentQuestions.length}
          </div>

          <div className="progress-bar">

            <div
              style={{
                width: `${
                  ((questionIndex + 1) /
                    currentQuestions.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

        {/* QUESTION */}

        <div className="question-card">

          <span>
            {t.question}
          </span>

          <h2>
            {currentQuestion}
          </h2>

          <button
            className="question-speak"
            onClick={() =>
              speakText(
                currentQuestion
              )
            }
          >
            🔊 Listen Question
          </button>

        </div>

        {/* ANSWER */}

        <div className="answer-card">

          <h3>
            🎤 {t.answer}
          </h3>

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }
            placeholder={
              t.placeholder
            }
          />

          <div className="answer-actions">

            <button
              className={
                isListening
                  ? "voice-button listening"
                  : "voice-button"
              }
              onClick={
                toggleVoice
              }
            >
              {isListening
                ? `🔴 ${t.stop}`
                : `🎤 ${t.voice}`}
            </button>

            <button
              className="analyze-button"
              disabled={
                !answer.trim() ||
                isAnalyzing
              }
              onClick={
                analyzeAnswer
              }
            >
              {isAnalyzing
                ? t.analyzing
                : `✨ ${t.analyze}`}
            </button>

          </div>

          {isListening && (

            <div className="listening-status">
              🔴 {t.listening}
            </div>

          )}

        </div>

        {/* FEEDBACK */}

        {feedback && (

          <div className="feedback-card">

            <div className="feedback-top">

              <h2>
                🤖 {t.feedback}
              </h2>

              <div className="score-circle">

                {score}/10

              </div>

            </div>

            <p>
              {feedback}
            </p>

            <div className="suggestion-box">

              <h3>
                💡 {t.suggestion}
              </h3>

              <p>
                {suggestion}
              </p>

            </div>

            <button
              className="feedback-voice"
              onClick={() =>
                speakText(
                  feedback +
                    " " +
                    suggestion
                )
              }
            >
              🔊 Listen Feedback
            </button>

          </div>

        )}

        {/* NEXT */}

        <div className="bottom-actions">

          {questionIndex <
          currentQuestions.length - 1 ? (

            <button
              className="next-button"
              disabled={
                !feedback
              }
              onClick={
                nextQuestion
              }
            >
              {t.next} →
            </button>

          ) : (

            <div className="completed-box">

              🎉 {t.completed}

              <p>
                {t.completedText}
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default InterviewPrep;