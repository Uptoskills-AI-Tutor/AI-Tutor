import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon, faSun, faMeteor, faCloud, faStar, faExpand, faRing, faCircle,
  faFire, faAtom, faCircleNotch, faPause, faPlay, faVolumeUp, faVideo,
  faQuestionCircle, faChartBar, faCog, faExpand as faExpandAlt, faInfoCircle,
  faBookOpen, faFilePdf
} from "@fortawesome/free-solid-svg-icons";
import './CosmicClassroom.css';

const CosmicClassroom = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPhase, setCurrentPhase] = useState("nebula");
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [currentTime, setCurrentTime] = useState("2:45");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("stellar-phases");

  const phaseData = {
    nebula: { title: "Stellar Nebula", about: "Birthplace of stars.", duration: "3:00", icon: faCloud },
    protostar: { title: "Protostar Phase", about: "Gravity takes hold.", duration: "4:10", icon: faSun },
    "main-sequence": { title: "Main Sequence", about: "Stable hydrogen fusion phase.", duration: "5:30", icon: faStar },
    "red-giant": { title: "Red Giant Phase", about: "Helium fusion starts.", duration: "4:45", icon: faExpand },
    "planetary-nebula": { title: "Planetary Nebula", about: "Outer layers expelled.", duration: "2:30", icon: faRing },
    "white-dwarf": { title: "White Dwarf", about: "Cooling remnant of the star.", duration: "3:15", icon: faCircle },
    supernova: { title: "Supernova", about: "Massive star explosion.", duration: "5:00", icon: faFire },
    "neutron-star": { title: "Neutron Star", about: "Extremely dense remnant.", duration: "4:20", icon: faAtom },
    "black-hole": { title: "Black Hole", about: "Event horizon forms.", duration: "4:40", icon: faCircleNotch }
  };

  const starItems = Object.entries(phaseData).map(([phase, data]) => ({
    phase,
    ...data
  }));

  const handlePhaseChange = (phase) => {
    setCurrentPhase(phase);
  };

  const handleNextPhase = () => {
    const currentIndex = starItems.findIndex(item => item.phase === currentPhase);
    if (currentIndex < starItems.length - 1) {
      setCurrentPhase(starItems[currentIndex + 1].phase);
    }
  };

  const handleTimelineClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setProgress(pos * 100);

    const [min, sec] = (phaseData[currentPhase].duration || "3:00").split(":").map(Number);
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
      await axios.post("/api/doubts/submit", {
        username: "Course User",
        email,
        courseTitle: phaseData[currentPhase]?.title || "Cosmic Classroom",
        doubtText: comment,
        source: "cosmic"
      });
      alert("✅ Your doubt was submitted!");
      setEmail("");
      setComment("");
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("❌ Failed to submit doubt. Please try again.");
    }
  };

  const currentData = phaseData[currentPhase];
  const nextPhase = (() => {
    const index = starItems.findIndex(item => item.phase === currentPhase);
    return starItems[index + 1]?.title || "Course Complete";
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
      {/* Sidebar Navigation */}
      <nav className="star-nav">
        <header className="cosmic-header">
          <button className="mode-toggle" onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
          </button>
          <h1>COSMIC CLASSROOM</h1>
          <p>Stellar Evolution & Lifecycles</p>
        </header>

        <section className="current-star">
          <h2>NEXT PHASE</h2>
          <button className="supernova-btn" onClick={handleNextPhase}>
            <FontAwesomeIcon icon={faMeteor} /> {nextPhase}
          </button>
        </section>

        <section className="cosmic-tabs">
          <div className={`cosmic-tab ${activeTab === "stellar-phases" ? "active" : ""}`} onClick={() => setActiveTab("stellar-phases")}>
            <FontAwesomeIcon icon={faStar} /> STELLAR PHASES
          </div>
          <div className={`cosmic-tab ${activeTab === "starlog" ? "active" : ""}`} onClick={() => setActiveTab("starlog")}>
            <FontAwesomeIcon icon={faBookOpen} /> STARLOG
          </div>
          <div className={`cosmic-tab ${activeTab === "quiz" ? "active" : ""}`} onClick={() => setActiveTab("quiz")}>
            <FontAwesomeIcon icon={faInfoCircle} /> QUIZ
          </div>
        </section>

        <section className="star-system">
          {starItems.map(({ phase, icon, title, about }) => (
            <div key={phase} className={`star-item ${currentPhase === phase ? "active" : ""}`} onClick={() => handlePhaseChange(phase)}>
              <div className="star-icon"><FontAwesomeIcon icon={icon} /></div>
              <div className="star-info">
                <h3>{title}</h3>
                <p>{about}</p>
              </div>
            </div>
          ))}
        </section>
      </nav>

      {/* Main Viewer */}
      <main className="cosmic-viewer">
        {/* Phase Video & Controls */}
        <section className="stellar-display">
          <div className="nebula-video">
            <div className="video-space">
              <FontAwesomeIcon icon={currentData.icon} size="3x" />
              <h2>{currentData.title}</h2>
              <p>Lecture {starItems.findIndex(item => item.phase === currentPhase) + 1} • {currentData.duration}</p>
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
            <button className="control-btn"><FontAwesomeIcon icon={faExpandAlt} /></button>
          </div>
        </section>

        {/* Content Area */}
        <section className="stellar-content">
          {/* About Section */}
          <div className="content-section">
            <h3><FontAwesomeIcon icon={faInfoCircle} /> About This Stellar Phase</h3>
            <p>{currentData.about}</p>
          </div>

          {/* Resources */}
          <div className="content-section">
            <h3><FontAwesomeIcon icon={faBookOpen} /> Resources</h3>
            <div className="cosmic-grid">
              <div className="cosmic-card"><h4><FontAwesomeIcon icon={faFilePdf} /> Lecture Slides</h4><p>Download the complete presentation</p></div>
              <div className="cosmic-card"><h4><FontAwesomeIcon icon={faVideo} /> Telescope Tour</h4><p>Video tour of relevant observations</p></div>
              <div className="cosmic-card"><h4><FontAwesomeIcon icon={faChartBar} /> Data Analysis</h4><p>Practice interpreting spectral data</p></div>
              <div className="cosmic-card"><h4><FontAwesomeIcon icon={faQuestionCircle} /> Quiz</h4><p>Test your knowledge</p></div>
            </div>
          </div>

          {/* Feedback */}
          <div className="cosmic-feedback">
            <h3>Send Us Your Thoughts</h3>
            <form className="feedback-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Your Doubt or Comment..."
                rows="4"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit" className="supernova-btn">Send</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CosmicClassroom;
