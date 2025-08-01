import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine, faDatabase, faFileCsv, faCode, faTable,
  faProjectDiagram, faClipboardList, faCogs, faSun, faMoon,
  faPlay, faPause, faVolumeUp, faCog, faExpand, faBookOpen,
  faVideo, faChartBar, faQuestionCircle, faFilePdf, faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import './CourseDoubt.css';

const ReactDataAnalystClassroom = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPhase, setCurrentPhase] = useState("data-intro");
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(40);
  const [currentTime, setCurrentTime] = useState("1:45");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("topics");

  const topicData = {
    "data-intro": {
      title: "Introduction to Data Analysis",
      about: "Understanding the role of a data analyst and key responsibilities.",
      duration: "4:00",
      icon: faChartLine
    },
    "data-collection": {
      title: "Data Collection & CSV Handling",
      about: "Learn how to gather and clean data, work with CSVs using pandas.",
      duration: "5:15",
      icon: faFileCsv
    },
    "sql-basics": {
      title: "SQL Basics",
      about: "Querying data using SELECT, JOINs, and filtering.",
      duration: "5:00",
      icon: faDatabase
    },
    "data-visualization": {
      title: "Data Visualization",
      about: "Creating charts and dashboards using Matplotlib, Seaborn.",
      duration: "5:30",
      icon: faChartBar
    },
    "excel-analytics": {
      title: "Excel for Data Analysis",
      about: "Excel formulas, pivot tables, and basic analytics.",
      duration: "4:30",
      icon: faTable
    },
    "python-data": {
      title: "Python for Analysis",
      about: "Using Python libraries like pandas and numpy.",
      duration: "6:00",
      icon: faCode
    },
    "data-reporting": {
      title: "Reporting & Insights",
      about: "How to generate insights and present data to stakeholders.",
      duration: "4:45",
      icon: faClipboardList
    },
    "project-overview": {
      title: "Capstone Project",
      about: "Final project: analyze, visualize, and present real-world data.",
      duration: "6:30",
      icon: faProjectDiagram
    },
  };

  const topicItems = Object.entries(topicData).map(([key, data]) => ({ topic: key, ...data }));

  const handlePhaseChange = (phase) => setCurrentPhase(phase);

  const handleNextPhase = () => {
    const index = topicItems.findIndex(item => item.topic === currentPhase);
    if (index < topicItems.length - 1) {
      setCurrentPhase(topicItems[index + 1].topic);
    }
  };

  const handleTimelineClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setProgress(pos * 100);

    const [min, sec] = (topicData[currentPhase].duration || "3:00").split(":").map(Number);
    const totalSeconds = min * 60 + sec;
    const currentSeconds = Math.floor(pos * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    setCurrentTime(`${mins}:${secs < 10 ? "0" + secs : secs}`);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/doubts/submit", {
        username: "Learner",
        email,
        courseTitle: topicData[currentPhase]?.title || "Doubt Classroom",
        doubtText: comment,
        source: "dataanalyst"
      });
      alert("✅ Your doubt was submitted!");
      setEmail("");
      setComment("");
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("❌ Failed to submit doubt. Please try again.");
    }
  };

  const currentData = topicData[currentPhase];
  const nextTopic = (() => {
    const index = topicItems.findIndex(item => item.topic === currentPhase);
    return topicItems[index + 1]?.title || "All Topics Complete";
  })();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setDarkMode(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`cosmic-container ${darkMode ? "" : "light-mode"}`}>
      <nav className="star-nav">
        <header className="cosmic-header">
          <button className="mode-toggle" onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
          </button>
          <h1>Doubt Classroom</h1>
          <p>Master the Tools of a Modern Analyst</p>
        </header>

        <section className="current-star">
          <h2>NEXT TOPIC</h2>
          <button className="supernova-btn" onClick={handleNextPhase}>
            <FontAwesomeIcon icon={faPlay} /> {nextTopic}
          </button>
        </section>

        <section className="cosmic-tabs">
          <div className={`cosmic-tab ${activeTab === "topics" ? "active" : ""}`} onClick={() => setActiveTab("topics")}>
            <FontAwesomeIcon icon={faBookOpen} /> TOPICS
          </div>
          <div className={`cosmic-tab ${activeTab === "resources" ? "active" : ""}`} onClick={() => setActiveTab("resources")}>
            <FontAwesomeIcon icon={faChartBar} /> RESOURCES
          </div>
          <div className={`cosmic-tab ${activeTab === "quiz" ? "active" : ""}`} onClick={() => setActiveTab("quiz")}>
            <FontAwesomeIcon icon={faQuestionCircle} /> QUIZ
          </div>
        </section>

        <section className="star-system">
          {topicItems.map(({ topic, icon, title, about }) => (
            <div key={topic} className={`star-item ${currentPhase === topic ? "active" : ""}`} onClick={() => handlePhaseChange(topic)}>
              <div className="star-icon"><FontAwesomeIcon icon={icon} /></div>
              <div className="star-info">
                <h3>{title}</h3>
                <p>{about}</p>
              </div>
            </div>
          ))}
        </section>
      </nav>

      <main className="cosmic-viewer">
        <section className="stellar-display">
          <div className="nebula-video">
            <div className="video-space">
              <FontAwesomeIcon icon={currentData.icon} size="3x" />
              <h2>{currentData.title}</h2>
              <p>Module {topicItems.findIndex(item => item.topic === currentPhase) + 1} • {currentData.duration}</p>
            </div>
          </div>

          <div className="cosmic-controls">
            <button className={`control-btn ${isPlaying ? "active" : ""}`} onClick={togglePlay}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button className="control-btn"><FontAwesomeIcon icon={faVolumeUp} /></button>
            <div className="time-display">{currentTime} / {currentData.duration}</div>
            <div className="timeline" onClick={handleTimelineClick}>
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <button className="control-btn"><FontAwesomeIcon icon={faCog} /></button>
            <button className="control-btn"><FontAwesomeIcon icon={faExpand} /></button>
          </div>
        </section>

        <section className="stellar-content">
          <div className="content-section">
            <h3><FontAwesomeIcon icon={faInfoCircle} /> About This Topic</h3>
            <p>{currentData.about}</p>
          </div>

          <div className="content-section">
            <h3><FontAwesomeIcon icon={faBookOpen} /> Resources</h3>
            <div className="cosmic-grid">
              <div className="cosmic-card"><h4><FontAwesomeIcon icon={faFilePdf} /> Notes</h4><p>Downloadable PDF notes</p></div>
              <div className="cosmic-card"><h4><FontAwesomeIcon icon={faVideo} /> Tutorial Video</h4><p>Watch topic explanation</p></div>
              <div className="cosmic-card"><h4><FontAwesomeIcon icon={faChartBar} /> Charts</h4><p>Graphical visualizations</p></div>
              <div className="cosmic-card"><h4><FontAwesomeIcon icon={faQuestionCircle} /> Practice</h4><p>Try quiz questions</p></div>
            </div>
          </div>

          <div className="cosmic-feedback">
            <h3>Ask a Question</h3>
            <form className="feedback-form" onSubmit={handleSubmit}>
              <input type="email" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <textarea placeholder="Type your doubt here..." rows="4" required value={comment} onChange={(e) => setComment(e.target.value)} />
              <button type="submit" className="supernova-btn">Submit</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReactDataAnalystClassroom;
