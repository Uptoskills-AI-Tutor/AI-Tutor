import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentTab, setCurrentTab] = useState("overview");

  // Tabs configuration
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "course-info", label: "Course Info" },
    { id: "download-material", label: "Download Material" },
    { id: "summary", label: "Summary" },
    { id: "quiz", label: "Quiz" },
    { id: "report", label: "Report" }
  ];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch('/data/list.json');
        const data = await response.json();
        const course = data.courses.find(c => c.id === id);
        if (course) {
          setCurrentCourse(course);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        navigate('/');
      }
    };

    fetchCourse();
  }, [id, navigate]);

  if (!currentCourse) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="course-details">
      <div className="course-header">
        <div className="course-header-content">
          <div className="rating-reviews">
            <div className="star-rating">{"★".repeat(Math.round(currentCourse.rating))}</div>
            <div className="review-count">{currentCourse.rating} ({Math.round(currentCourse.rating * 200)} reviews)</div>
          </div>
          <h1>{currentCourse.title}</h1>
          <p className="course-description">{currentCourse.description}</p>
          <div className="course-features">
            <div className="feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              <span>Comprehensive Curriculum</span>
            </div>
            <div className="feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span>Expert Instructors</span>
            </div>
            <div className="feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              <span>Hands-On Projects</span>
            </div>
            <div className="feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Career-Ready Skills</span>
            </div>
          </div>
          <div className="action-buttons">
            <button className="enroll-button">Enroll Now</button>
            <button className="secondary-button">See Curriculum</button>
          </div>
        </div>
        <div className="course-header-image" onClick={() => window.open('https://www.youtube.com/watch?v=your-course-video-id', '_blank')}>
          <img src={currentCourse.image} alt={currentCourse.title} />
          <div className="play-button">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="course-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {currentTab === 'overview' && (
          <div className="overview-content">
            <div className="overview-wrapper">
              <div className="overview-text">
                <h2>Course Overview</h2>
                <p>Our comprehensive {currentCourse.title} course covers everything from the basics to advanced concepts. You'll build real-world projects and gain the skills needed for a career in this field.</p>
              </div>
              
              <div className="course-content">
                <div className="key-topics">
                  <h3>What You'll Learn</h3>
                  <ul>
                    <li>Fundamentals and core concepts</li>
                    <li>Industry best practices</li>
                    <li>Real-world project development</li>
                    <li>Advanced techniques and optimization</li>
                  </ul>
                </div>

                <div className="prerequisites">
                  <h3>Prerequisites</h3>
                  <ul>
                    <li>Basic understanding of the course</li>
                    <li>Eagerness to learn</li>
                    <li>Dedication to practice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentTab === "course-info" && (
          <div className="course-info-content">
            <p>{currentCourse.overview}</p>
          </div>
        )}
        {currentTab === "download-material" && (
          <div className="materials-content">
            <p>{currentCourse.materials}</p>
          </div>
        )}
        {currentTab === "summary" && (
          <div className="summary-content">
            <p>{currentCourse.summary}</p>
          </div>
        )}
        {currentTab === "quiz" && (
          <div className="quiz-content">
            <div className="quiz-list">
              {currentCourse.quiz?.map((item, index) => (
                <div key={index} className="quiz-item">
                  <h3>Question {index + 1}</h3>
                  <p>{item.question}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentTab === "report" && (
          <div className="report-content">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="issue">Describe the issue:</label>
                <textarea id="issue" rows="4" />
              </div>
              <button type="submit" className="submit-button">Submit Report</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
