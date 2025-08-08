import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faMeteor,
  faCloud,
  faStar,
  faExpand,
  faRing,
  faCircle,
  faFire,
  faAtom,
  faCircleNotch,
  faPause,
  faPlay,
  faVolumeUp,
  faVideo,
  faQuestionCircle,
  faChartBar,
  faCog,
  faExpand as faExpandAlt,
  faInfoCircle,
  faBookOpen,
  faSatelliteDish,
  faBalanceScale,
  faThermometerHalf,
  faFan,
  faSnowman,
  faSpinner,
  faMagnet,
  faEye,
  faChartLine,
  faRuler,
  faPalette,
  faArrowsAlt,
  faSolarPanel,
  faClock,
  faEyeDropper,
  faBolt,
  faHistory,
  faSearch,
  faTachometerAlt,
  faWaveSquare,
  faUserAstronaut,
  faTemperatureHigh,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import "./CosmicClassroom.css";

const CosmicClassroom = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPhase, setCurrentPhase] = useState("nebula");
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [currentTime, setCurrentTime] = useState("2:45");
  const phaseData = {
    nebula: {
      title: "Stellar Nebula: Star Nurseries",
      icon: faCloud,
      about:
        "Stellar nebulae are vast clouds of gas and dust in space, primarily composed of hydrogen and helium with traces of heavier elements. These cosmic nurseries are where stars are born through gravitational collapse. Our own Sun formed in such a nebula approximately 4.6 billion years ago.",
      concepts: [
        {
          icon: faBalanceScale,
          title: "Jeans Mass",
          desc: "The critical mass needed for a cloud to collapse under its own gravity",
        },
        {
          icon: faThermometerHalf,
          title: "Bok Globules",
          desc: "Dark, dense clouds of dust and gas where star formation often begins",
        },
        {
          icon: faFan,
          title: "Solar Winds",
          desc: "How newborn stars clear their neighborhoods of remaining gas",
        },
        {
          icon: faSnowman,
          title: "Molecular Clouds",
          desc: "Giant complexes where thousands of stars may form simultaneously",
        },
      ],
      evidence:
        "Modern telescopes like Hubble and JWST have captured stunning images of stellar nurseries. The Orion Nebula (M42) is one of the most studied and is visible to the naked eye. This section examines the observational techniques astronomers use to study these regions hidden behind thick dust clouds.",
    },
    protostar: {
      title: "Protostar: Stellar Infancy",
      icon: faSun,
      about:
        "As a nebula collapses under gravity, it fragments into smaller clumps that form protostars. These are not yet true stars as nuclear fusion has not begun in their cores. The protostar phase can last for 100,000 to 10 million years depending on the star's mass.",
      concepts: [
        {
          icon: faSpinner,
          title: "Accretion Disk",
          desc: "Rotating disk of matter that feeds the growing protostar",
        },
        {
          icon: faFire,
          title: "Thermal Pressure",
          desc: "Balances gravitational collapse during this phase",
        },
        {
          icon: faMagnet,
          title: "Magnetic Fields",
          desc: "Play crucial role in angular momentum transfer",
        },
        {
          icon: faEye,
          title: "T Tauri Stars",
          desc: "Visible protostars with strong stellar winds",
        },
      ],
      evidence:
        "Infrared telescopes are essential for studying protostars as they are still embedded in their birth clouds. Herbig-Haro objects provide visible evidence of protostellar outflows punching through the surrounding nebula.",
    },
    "main-sequence": {
      title: "Main Sequence: Stellar Adulthood",
      icon: faStar,
      about:
        "When core temperature reaches about 10 million Kelvin, hydrogen fusion begins, marking the start of the main sequence phase. Our Sun will spend about 10 billion years in this stable phase, converting hydrogen to helium through nuclear fusion.",
      concepts: [
        {
          icon: faBalanceScale,
          title: "Hydrostatic Equilibrium",
          desc: "Balance between gravity and radiation pressure",
        },
        {
          icon: faChartLine,
          title: "Hertzsprung-Russell",
          desc: "Diagram showing stellar classification",
        },
        {
          icon: faRuler,
          title: "Mass-Luminosity",
          desc: "Relationship determining star characteristics",
        },
        {
          icon: faPalette,
          title: "Spectral Classes",
          desc: "OBAFGKM classification system explained",
        },
      ],
      evidence:
        "Spectroscopic analysis reveals the composition and temperature of main sequence stars. The Harvard Classification System organizes stars based on their spectral characteristics which correlate with surface temperature.",
    },
    "red-giant": {
      title: "Red Giant: Stellar Expansion",
      icon: faExpand,
      about:
        "When a star exhausts the hydrogen in its core, it leaves the main sequence and begins fusing hydrogen in a shell around the core. This causes the outer layers to expand dramatically, cooling as they expand and turning red. Our Sun will enter this phase in about 5 billion years.",
      concepts: [
        {
          icon: faFire,
          title: "Helium Flash",
          desc: "The explosive ignition of helium fusion in degenerate cores",
        },
        {
          icon: faArrowsAlt,
          title: "Stellar Expansion",
          desc: "How stars can grow to hundreds of times their original size",
        },
        {
          icon: faThermometerHalf,
          title: "Core Contraction",
          desc: "Why the core shrinks while the outer layers expand",
        },
        {
          icon: faSolarPanel,
          title: "Shell Burning",
          desc: "Fusion occurs in shells around the inert core",
        },
      ],
      evidence:
        "Famous red giants like Aldebaran and Arcturus are easily visible to the naked eye. Their large sizes can be measured directly using interferometry, and their cool temperatures are evident from their red color and spectral class.",
    },
    "planetary-nebula": {
      title: "Planetary Nebula: Stellar Farewell",
      icon: faRing,
      about:
        "In the final stages of a Sun-like star's life, it sheds its outer layers in a series of pulsations, creating an expanding shell of gas illuminated by the hot stellar remnant. Despite the name, these nebulae have nothing to do with planets - early astronomers thought they resembled planetary disks.",
      concepts: [
        {
          icon: faFan,
          title: "Mass Loss",
          desc: "How stars lose up to 50% of their mass in this phase",
        },
        {
          icon: faAtom,
          title: "Ionization",
          desc: "Why these nebulae glow with characteristic colors",
        },
        {
          icon: faClock,
          title: "Transient Phase",
          desc: "These beautiful structures last only about 10,000 years",
        },
        {
          icon: faEyeDropper,
          title: "Chemical Enrichment",
          desc: "How they distribute heavy elements into the interstellar medium",
        },
      ],
      evidence:
        "The Ring Nebula (M57) and Helix Nebula are classic examples visible through amateur telescopes. Hubble images reveal their incredible complexity, showing knots, jets, and intricate patterns in the expelled gas.",
    },
    "white-dwarf": {
      title: "White Dwarf: Stellar Remnant",
      icon: faCircle,
      about:
        "After shedding its outer layers, the hot core of the star remains as a white dwarf - an Earth-sized object with about half the original mass of the Sun. No longer producing energy through fusion, it slowly cools over billions of years.",
      concepts: [
        {
          icon: "compress",
          title: "Electron Degeneracy",
          desc: "The quantum mechanical pressure supporting the dense remnant",
        },
        {
          icon: faThermometerHalf,
          title: "Cooling Curve",
          desc: "How white dwarfs gradually fade over time",
        },
        {
          icon: faBalanceScale,
          title: "Chandrasekhar Limit",
          desc: "The maximum mass (1.4 solar masses) a white dwarf can have",
        },
        {
          icon: faStar,
          title: "Sirius B",
          desc: "The first white dwarf discovered, companion to Sirius A",
        },
      ],
      evidence:
        "White dwarfs were first identified by their high surface temperatures and small sizes. Their extreme densities cause gravitational redshift, which provides direct evidence for general relativity.",
    },
    supernova: {
      title: "Supernova: Stellar Cataclysm",
      icon: faFire,
      about:
        "For stars more massive than about 8 solar masses, the end comes in a spectacular supernova explosion. In seconds, the core collapses while the outer layers rebound in the most energetic event since the Big Bang, briefly outshining entire galaxies.",
      concepts: [
        {
          icon: faBolt,
          title: "Neutrino Burst",
          desc: "99% of the energy is carried away by neutrinos",
        },
        {
          icon: faAtom,
          title: "R-Process",
          desc: "How rapid neutron capture creates heavy elements",
        },
        {
          icon: faHistory,
          title: "Historical Supernovae",
          desc: "SN 1054, 1572, 1604 and their impact on astronomy",
        },
        {
          icon: faSearch,
          title: "Supernova Types",
          desc: "Type Ia vs core-collapse (II, Ib, Ic) classification",
        },
      ],
      evidence:
        "Supernova 1987A in the Large Magellanic Cloud was the closest observed in modern times, detected by its neutrino burst hours before light reached Earth. Supernova remnants like the Crab Nebula show expanding debris clouds.",
    },
    "neutron-star": {
      title: "Neutron Star: Extreme Physics",
      icon: faAtom,
      about:
        "When the core of a massive star collapses, protons and electrons combine to form neutrons under the incredible pressure. The result is a neutron star - a city-sized object so dense that a sugar-cube-sized amount would weigh as much as a mountain.",
      concepts: [
        {
          icon: faTachometerAlt,
          title: "Rapid Rotation",
          desc: "Some spin hundreds of times per second (pulsars)",
        },
        {
          icon: faMagnet,
          title: "Magnetic Fields",
          desc: "Trillions of times stronger than Earth's",
        },
        {
          icon: faSatelliteDish,
          title: "Pulsar Timing",
          desc: "How they serve as cosmic clocks for testing relativity",
        },
        {
          icon: faWaveSquare,
          title: "Gravitational Waves",
          desc: "Neutron star mergers detected by LIGO",
        },
      ],
      evidence:
        "The first neutron star was discovered as a pulsar (PSR B1919+21) by Jocelyn Bell in 1967. The Hulse-Taylor binary provided indirect evidence for gravitational waves decades before direct detection.",
    },
    "black-hole": {
      title: "Black Hole: Ultimate Gravity",
      icon: faCircleNotch,
      about:
        "For the most massive stars, even neutron degeneracy pressure cannot halt the collapse. The core continues collapsing until it forms a singularity - a point of infinite density where space-time curvature becomes extreme and an event horizon forms.",
      concepts: [
        {
          icon: "border-none",
          title: "Event Horizon",
          desc: "The point of no return where escape velocity equals light speed",
        },
        {
          icon: faUserAstronaut,
          title: "No-Hair Theorem",
          desc: "Black holes are characterized only by mass, charge, and spin",
        },
        {
          icon: faTemperatureHigh,
          title: "Hawking Radiation",
          desc: "How quantum effects cause black holes to evaporate",
        },
        {
          icon: faEye,
          title: "Event Horizon Telescope",
          desc: "First image of M87's black hole shadow",
        },
      ],
      evidence:
        "Cygnus X-1 was the first strong black hole candidate. Gravitational wave detections from merging black holes provide direct evidence. The EHT image of M87* matches predictions of general relativity.",
    },
  };

  const starItems = [
    {
      phase: "nebula",
      icon: faCloud,
      title: "Stellar Nebula",
      desc: "Birthplace of stars",
    },
    {
      phase: "protostar",
      icon: faSun,
      title: "Protostar Phase",
      desc: "Gravity takes hold",
    },
    {
      phase: "main-sequence",
      icon: faStar,
      title: "Main Sequence",
      desc: "Hydrogen fusion begins",
    },
    {
      phase: "red-giant",
      icon: faExpand,
      title: "Red Giant Phase",
      desc: "Helium fusion starts",
    },
    {
      phase: "planetary-nebula",
      icon: faRing,
      title: "Planetary Nebula",
      desc: "Outer layers expelled",
    },
    {
      phase: "white-dwarf",
      icon: faCircle,
      title: "White Dwarf",
      desc: "Final stellar remnant",
    },
    {
      phase: "supernova",
      icon: faFire,
      title: "Supernova",
      desc: "Massive star explosion",
    },
    {
      phase: "neutron-star",
      icon: faAtom,
      title: "Neutron Star",
      desc: "Incredibly dense core",
    },
    {
      phase: "black-hole",
      icon: faCircleNotch,
      title: "Black Hole",
      desc: "Event horizon forms",
    },
  ];

  const [activeTab, setActiveTab] = useState("stellar-phases");
  const [nextPhase, setNextPhase] = useState("Red Giant");

  const handlePhaseChange = (phase) => {
    setCurrentPhase(phase);
    const currentIndex = starItems.findIndex((item) => item.phase === phase);
    if (currentIndex < starItems.length - 1) {
      setNextPhase(starItems[currentIndex + 1].title);
    } else {
      setNextPhase("Course Complete");
    }
  };

  const handleNextPhase = () => {
    const currentIndex = starItems.findIndex(
      (item) => item.phase === currentPhase
    );
    if (currentIndex < starItems.length - 1) {
      handlePhaseChange(starItems[currentIndex + 1].phase);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleTimelineClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setProgress(pos * 100);

    // Update time display (simplified for demo)
    const duration = phaseData[currentPhase].duration.split(":");
    const totalSeconds = parseInt(duration[0]) * 60 + parseInt(duration[1]);
    const currentSeconds = Math.floor(pos * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    setCurrentTime(`${mins}:${secs < 10 ? "0" + secs : secs}`);
  };

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const currentData = phaseData[currentPhase];

  return (
    <div className={`cosmic-container ${darkMode ? "" : "light-mode"}`}>
      {/* Stellar Navigation */}
      <div className="star-nav">
        <div className="cosmic-header">
          <button
            className="mode-toggle"
            id="modeToggle"
            onClick={toggleDarkMode}
          >
            <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
          </button>
          <h1>COSMIC CLASSROOM</h1>
          <p>Stellar Evolution & Lifecycles</p>
        </div>

        <div className="current-star">
          <h2>NEXT PHASE</h2>
          <button
            className="supernova-btn"
            id="nextPhaseBtn"
            onClick={handleNextPhase}
          >
            <FontAwesomeIcon icon={faMeteor} />
            {nextPhase}
          </button>
        </div>

        <div className="cosmic-tabs">
          <div
            className={`cosmic-tab ${
              activeTab === "stellar-phases" ? "active" : ""
            }`}
            onClick={() => setActiveTab("stellar-phases")}
          >
            <FontAwesomeIcon icon={faStar} /> STELLAR PHASES
          </div>
          <div
            className={`cosmic-tab ${activeTab === "starlog" ? "active" : ""}`}
            onClick={() => setActiveTab("starlog")}
          >
            <FontAwesomeIcon icon={faBookOpen} /> STARLOG
          </div>
          <div
            className={`cosmic-tab ${activeTab === "quiz" ? "active" : ""}`}
            onClick={() => setActiveTab("quiz")}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> QUIZ
          </div>
        </div>

        <div className="star-system">
          {starItems.map((item) => (
            <div
              key={item.phase}
              className={`star-item ${
                currentPhase === item.phase ? "active" : ""
              }`}
              onClick={() => handlePhaseChange(item.phase)}
              data-phase={item.phase}
            >
              <div className="star-icon">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div className="star-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="star-duration">{item.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cosmic Viewer */}
      <div className="cosmic-viewer">
        <div className="stellar-display">
          <div className="nebula-video">
            <div className="video-space">
              <FontAwesomeIcon icon={currentData.icon} size="3x" />
              <h2>{currentData.title}</h2>
              <p>
                Lecture{" "}
                {starItems.findIndex((item) => item.phase === currentPhase) + 1}{" "}
                • {currentData.duration}
              </p>
            </div>
          </div>

          <div className="cosmic-controls">
            <button
              className={`control-btn ${isPlaying ? "active" : ""}`}
              id="playBtn"
              onClick={togglePlay}
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button className="control-btn">
              <FontAwesomeIcon icon={faVolumeUp} />
            </button>
            <div className="time-display">
              {currentTime} / {currentData.duration}
            </div>
            <div className="timeline" onClick={handleTimelineClick}>
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <button className="control-btn">
              <FontAwesomeIcon icon={faCog} />
            </button>
            <button className="control-btn">
              <FontAwesomeIcon icon={faExpandAlt} />
            </button>
          </div>
        </div>

        <div className="stellar-display">
          <div className="stellar-content">
            <div className="content-section">
              <h3>
                <FontAwesomeIcon icon={faInfoCircle} /> About This Stellar Phase
              </h3>
              <p>{currentData.about}</p>
            </div>

            <div className="content-section">
              <h3>
                <FontAwesomeIcon icon={faBookOpen} /> Resources
              </h3>
              <div className="cosmic-grid">
                <div className="cosmic-card">
                  <h4>
                    <FontAwesomeIcon icon={faFilePdf} /> Lecture Slides
                  </h4>
                  <p>Download the complete presentation</p>
                </div>
                <div className="cosmic-card">
                  <h4>
                    <FontAwesomeIcon icon={faVideo} /> Telescope Tour
                  </h4>
                  <p>Video tour of relevant observations</p>
                </div>
                <div className="cosmic-card">
                  <h4>
                    <FontAwesomeIcon icon={faChartBar} /> Data Analysis
                  </h4>
                  <p>Practice interpreting spectral data</p>
                </div>
                <div className="cosmic-card">
                  <h4>
                    <FontAwesomeIcon icon={faQuestionCircle} /> Quiz
                  </h4>
                  <p>Test your knowledge</p>
                </div>
              </div>
            </div>
            <div class="cosmic-feedback">
              <h3>Send Us Your Thoughts</h3>
              <form class="feedback-form">
                <input type="email" placeholder="Your Email" required />
                <textarea
                  placeholder="Your Comment..."
                  rows="4"
                  required
                ></textarea>
                <button type="submit" class="supernova-btn">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicClassroom;
