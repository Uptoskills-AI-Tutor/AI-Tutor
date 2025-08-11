import React, { useState } from 'react';
import './Tabs.css';

const tabs = ['Overview', 'Course Info', 'Download Material', 'Summary', 'Quiz', 'Report'];

function Tabs({ activeTab, setActiveTab }) {
  const [showAnswers, setShowAnswers] = useState({});

  const quizAnswers = {
    1: "Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used for web development, data analysis, artificial intelligence, and automation.",
    2: "Variable scope in Python refers to the region where a variable is accessible. It includes local scope (within a function), global scope (throughout the program), and built-in scope (Python's predefined names).",
    3: "To floor a number in Python, you can use the math.floor() function from the math module, or use the // operator for integer division which automatically floors the result."
  };

  const toggleAnswer = (questionNumber) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionNumber]: !prev[questionNumber]
    }));
  };

  return (
    <div className="tabs-container">
      <nav className="tabs-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
      <div className="tab-content">
        {activeTab === 'Overview' && (
          <div className="overview-content">
            <h2>Course Overview</h2>
            <p>
              Our comprehensive Python Programming course covers everything from the basics of Python syntax and programming concepts to advanced topics like data structures, algorithms, and web development with Python frameworks. You'll build real-world projects and gain the skills needed for a career in software development.
            </p>
          </div>
        )}
        {activeTab === 'Course Info' && (
          <div className="course-info-content">
            <h2>Course Information</h2>
            <p>Duration: 12 weeks</p>
            <p>Skill Level: Beginner to Advanced</p>
            <p>Projects: 8</p>
            <p>Certificate: Yes</p>
            <p>Mentorship: Included</p>
          </div>
        )}
        {activeTab === 'Download Material' && (
          <div className="download-material-content">
            <h2>Course Materials</h2>
            <ul>
              <li>Course slides (PDF)</li>
              <li>Code examples (GitHub)</li>
              <li>Project starter files</li>
              <li>Additional resources and references</li>
            </ul>
            <button className="download-btn">Download All Materials</button>
          </div>
        )}
        {activeTab === 'Summary' && (
          <div className="summary-content">
            <h2>Course Summary</h2>
            <p>
              By the end of this course, you'll be able to build modern, responsive websites and web applications using the latest technologies and best practices in Python programming and development.
            </p>
          </div>
        )}
        {activeTab === 'Quiz' && (
          <div className="quiz-content">
            <h2>Practice Quiz</h2>
            
            <div className="quiz-question">
              <p><strong>Question 1:</strong> What is Python Programming?</p>
              <button 
                className="show-answer-btn"
                onClick={() => toggleAnswer(1)}
              >
                {showAnswers[1] ? 'Hide Answer' : 'Show Answer'}
              </button>
              {showAnswers[1] && (
                <div className="answer-box">
                  <p>{quizAnswers[1]}</p>
                </div>
              )}
            </div>
            
            <div className="quiz-question">
              <p><strong>Question 2:</strong> What is variable scope in Python?</p>
              <button 
                className="show-answer-btn"
                onClick={() => toggleAnswer(2)}
              >
                {showAnswers[2] ? 'Hide Answer' : 'Show Answer'}
              </button>
              {showAnswers[2] && (
                <div className="answer-box">
                  <p>{quizAnswers[2]}</p>
                </div>
              )}
            </div>
            
            <div className="quiz-question">
              <p><strong>Question 3:</strong> How do you floor a number in Python?</p>
              <button 
                className="show-answer-btn"
                onClick={() => toggleAnswer(3)}
              >
                {showAnswers[3] ? 'Hide Answer' : 'Show Answer'}
              </button>
              {showAnswers[3] && (
                <div className="answer-box">
                  <p>{quizAnswers[3]}</p>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'Report' && (
          <div className="report-content">
            <h2>Report an Issue</h2>
            <form>
              <label htmlFor="issueType">Issue Type</label>
              <select id="issueType" name="issueType" defaultValue="Content Error">
                <option value="Content Error">Content Error</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" placeholder="Please describe the issue in detail..." />
              <button type="submit" className="submit-report-btn">Submit Report</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
