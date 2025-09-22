// src/components/Dashboard/Dashboard1.jsx
import React from "react";
import { BookOpen, Star, Clock, Award, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard1.css";

import MLFundamentals from "../../assets/ML_fundamentals.png";
import FullStackWebDev from "../../assets/full_stack_web_dev.png";
import DataAnalytics from "../../assets/data_analytics.png";
import ReactLogo from "../../assets/react_fundamentals_logo.png";
import PythonLogo from "../../assets/python_for_ai_logo.png";

const Dashboard1 = () => {
  const navigate = useNavigate();

  const popularCourses = [
    {
      id: "ml-fundamentals",
      title: "Machine Learning Fundamentals",
      lessons: 24,
      level: "Intermediate",
      price: 1999,
      rating: 4.8,
      category: "AI & ML",
      image: MLFundamentals,
    },
    {
      id: "fullstack",
      title: "Full Stack Web Development",
      lessons: 36,
      level: "Beginner",
      price: 1299,
      rating: 4.9,
      category: "Development",
      image: FullStackWebDev,
    },
    {
      id: "data-analytics",
      title: "Data Analytics Masterclass",
      lessons: 28,
      level: "Advanced",
      price: 1499,
      rating: 4.7,
      category: "Data Science",
      image: DataAnalytics,
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-icon blue">
              <BookOpen size={20} />
            </div>
            <div className="stat-info">
              <h3>8</h3>
              <p>Ongoing Courses</p>
            </div>
          </div>
          <span className="stat-change">+12%</span>
        </div>

        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-icon green">
              <CheckCircle size={20} />
            </div>
            <div className="stat-info">
              <h3>24</h3>
              <p>Completed</p>
            </div>
          </div>
          <span className="stat-change">+5</span>
        </div>

        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-icon purple">
              <Award size={20} />
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Certificates</p>
            </div>
          </div>
          <span className="stat-change">+2</span>
        </div>

        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-icon orange">
              <Clock size={20} />
            </div>
            <div className="stat-info">
              <h3>142</h3>
              <p>Hours Spent</p>
            </div>
          </div>
          <span className="stat-change">+18h</span>
        </div>
      </div>

      <section className="popular-section">
        <h2>Popular Courses</h2>
        <div className="popular-grid">
          {popularCourses.map((course) => (
            <div
              key={course.id}
              className="course-card cursor-pointer"
              onClick={() => navigate("/app/enroll", { state: { course } })}
            >
              <img src={course.image} alt={course.title} />
              <div className="course-info">
                <span className="tag blue">{course.category}</span>
                <h3>{course.title}</h3>
                <p>
                  {course.lessons} lessons • {course.level}
                </p>
                <div className="course-footer">
                  <span className="price">₹{course.price}</span>
                  <span className="rating">
                    <Star size={14} fill="#fbbf24" stroke="none" /> {course.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="topics-card">
            <h3>Course Topics</h3>
            <div className="donut multi">
              <div className="donut-center">
                <span>15</span>
                <p>Total Courses</p>
              </div>
            </div>
            <div className="donut-legend">
              <div>
                <span className="dot code"></span> Code (70%)
              </div>
              <div>
                <span className="dot data"></span> Data (20%)
              </div>
              <div>
                <span className="dot design"></span> Design (10%)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-courses-section">
        <h2>My Courses</h2>
        <table className="my-courses-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Progress</th>
              <th>Lessons</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="course-cell">
                  <img src={ReactLogo} alt="React Fundamentals" />
                  <div>
                    <p className="course-name">React Fundamentals</p>
                    <span className="course-sub">Frontend Development</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "75%" }}></div>
                </div>
                75%
              </td>
              <td>18/24</td>
              <td>
                <span className="badge green">Intermediate</span>
              </td>
            </tr>
            <tr>
              <td>
                <div className="course-cell">
                  <img src={PythonLogo} alt="Python for AI" />
                  <div>
                    <p className="course-name">Python for AI</p>
                    <span className="course-sub">Artificial Intelligence</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="progress-bar">
                  <div className="progress purple" style={{ width: "45%" }}></div>
                </div>
                45%
              </td>
              <td>9/20</td>
              <td>
                <span className="badge blue">Beginner</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="continue-learning-section">
        <h2>Continue Learning</h2>
        <div className="continue-grid">
          <div className="continue-card">
            <div>
              <h4>React Fundamentals</h4>
              <p>Lesson 18: State Management</p>
            </div>
            <button
              className="continue-btn"
              onClick={() => navigate("/app/study/react")}
            >
              Continue
            </button>
          </div>
          <div className="continue-card">
            <div>
              <h4>Python for AI</h4>
              <p>Lesson 9: Neural Networks</p>
            </div>
            <button
              className="continue-btn"
              onClick={() => navigate("/app/study/python-ai")}
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard1;




