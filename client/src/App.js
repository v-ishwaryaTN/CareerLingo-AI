import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import Auth from "./pages/Auth";
import Skills from "./pages/Skills";
import CourseDetails from "./pages/CourseDetails";
import EmailWriter from "./pages/EmailWriter";



import Dailychat from "./pages/Dailychat";
import InterviewPrep from "./pages/InterviewPrep";
import ResumeAnalyze from "./pages/ResumeAnalyze";
import Jobs from "./pages/Jobs";
import MeetingTranslator from "./pages/MeetingTranslator";
import ResumeGenerate from "./components/ResumeGenerate";
import "./App.css";

const TABS = [
  { id: "skills", label: "Skills" },
  { id: "chat", label: "Daily Chat" },
  { id: "interview", label: "Interview Prep" },
  { id: "resume", label: "Resume" },
  { id: "jobs", label: "Jobs" },
  { id: "meeting", label: "Meeting" },
  { id: "email", label: "Email" }
 
];


function MainApp({ user, token, handleLogout }) {

  const navigate = useNavigate();

  const [tab, setTab] = useState("skills");

  const handleTab = (id) => {
    setTab(id);

    const routes = {
      skills: "/",
      chat: "/chat",
      interview: "/interview",
      resume: "/resume",
      jobs: "/jobs",
      meeting: "/meeting",
      email: "/email",
    };

    navigate(routes[id]);
  };

  return (
    <div>

      {/* NAVBAR */}

      <nav className="main-navbar">

        <div className="brand">
          🚀 CareerLingo AI
        </div>


        <div className="nav-tabs">

          {TABS.map((item) => (

            <button
              key={item.id}
              onClick={() =>
                handleTab(item.id)
              }
              className={
                tab === item.id
                  ? "nav-tab active"
                  : "nav-tab"
              }
            >
              {item.label}
            </button>

          ))}

        </div>


        <div className="user-area">

          <span>
            Hi, {user.name}
          </span>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      <Routes>

        {/* COURSES */}

        <Route
          path="/"
          element={<Skills />}
        />

        <Route
          path="/course/:id"
          element={<CourseDetails />}
        />


        {/* OTHER PAGES */}

        <Route
          path="/chat"
          element={<Dailychat />}
        />

        <Route
          path="/interview"
          element={<InterviewPrep />}
        />

        <Route
          path="/resume"
          element={<ResumeAnalyze />}
        />

        <Route
          path="/resume/create"
          element={<ResumeGenerate />}
        />

        <Route
          path="/jobs"
          element={<Jobs token={token} />}
        />

        <Route
          path="/meeting"
          element={<MeetingTranslator />}
        />

        <Route
          path="/email"
          element={<EmailWriter />}
        />

      </Routes>

    </div>
  );
}


function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {

    const savedToken =
      localStorage.getItem("token");

    const savedUser =
      localStorage.getItem("user");


    if (
      savedToken &&
      savedUser
    ) {

      setToken(savedToken);

      setUser(
        JSON.parse(savedUser)
      );

    }

  }, []);


  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken(null);

    setUser(null);

  };


  if (!user) {

    return (
      <Auth
        onLoggedIn={(u, t) => {

          setUser(u);

          setToken(t);

        }}
      />
    );

  }


  return (

    <BrowserRouter>

      <MainApp
        user={user}
        token={token}
        handleLogout={handleLogout}
      />

    </BrowserRouter>

  );

}


export default App;