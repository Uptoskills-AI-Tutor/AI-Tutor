import React, { useState, useEffect } from 'react';
import './CourseDetails.css';

const CourseDetails = () => {
  // State management
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentTab, setCurrentTab] = useState("overview");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Tabs configuration
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "course-info", label: "Course Info" },
    { id: "download-material", label: "Download Material" },
    { id: "summary", label: "Summary" },
    { id: "quiz", label: "Quiz" },
    { id: "report", label: "Report" }
  ];

  // Course data
  const courses = [
    {
      id: "web-development",
      title: "Web Development",
      description: "Learn modern web development with HTML, CSS, JavaScript, React, and Next.js. Our AI Tutor provides personalized guidance and feedback to help you master web development skills at your own pace.",
      rating: 5.0,
      reviews: 976,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wd.jpg-PudFkG3CahYXwPEERrmyhO8x7Ktaap.jpeg",
      overview: "Our comprehensive Web Development course covers everything from the basics of HTML and CSS to advanced JavaScript frameworks like React and Next.js. You'll build real-world projects and gain the skills needed for a career in web development.",
      courseInfo: "Duration: 12 weeks\nSkill Level: Beginner to Advanced\nProjects: 8\nCertificate: Yes\nMentorship: Included",
      materials: "Course slides (PDF)\nCode examples (GitHub)\nProject starter files\nAdditional resources and references",
      summary: "By the end of this course, you'll be able to build modern, responsive websites and web applications using the latest technologies and best practices in web development.",
      quiz: [
        { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
        { question: "Which property is used to change the background color in CSS?", answer: "background-color" },
        { question: "What is the purpose of JavaScript in web development?", answer: "To add interactivity to websites" }
      ]
    },
    // ... other courses data
  ];

  useEffect(() => {
    // Get course ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const course = courses.find(c => c.id === courseId) || courses[0];
    setCurrentCourse(course);
  }, []);

  const generateStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="star">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="star">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      }
    }
    return stars;
  };

  const renderTabContent = () => {
    if (!currentCourse) return null;

    switch (currentTab) {
      case 'overview':
        return (
          <div className="tab-panel active">
            <h2 className="tab-title">Course Overview</h2>
            <p className="tab-text">{currentCourse.overview}</p>
          </div>
        );

      case 'course-info':
        return (
          <div className="tab-panel active">
            <h2 className="tab-title">Course Information</h2>
            <p className="tab-text">{currentCourse.courseInfo}</p>
          </div>
        );

      case 'download-material':
        return (
          <div className="tab-panel active">
            <h2 className="tab-title">Course Materials</h2>
            <p className="tab-text">{currentCourse.materials}</p>
            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary">Download All Materials</button>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="tab-panel active">
            <h2 className="tab-title">Course Summary</h2>
            <p className="tab-text">{currentCourse.summary}</p>
          </div>
        );

      case 'quiz':
        return (
          <div className="tab-panel active">
            <h2 className="tab-title">Practice Quiz</h2>
            <div className="quiz-container">
              {currentCourse.quiz.map((item, index) => (
                <QuizItem key={index} question={item.question} answer={item.answer} index={index} />
              ))}
            </div>
          </div>
        );

      case 'report':
        return (
          <div className="tab-panel active">
            <h2 className="tab-title">Report an Issue</h2>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="issue-type" className="form-label">Issue Type</label>
                <select id="issue-type" className="form-select">
                  <option>Content Error</option>
                  <option>Technical Problem</option>
                  <option>Suggestion</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  className="form-textarea"
                  placeholder="Please describe the issue in detail..."
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit Report</button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  const QuizItem = ({ question, answer, index }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    return (
      <div className="quiz-item">
        <h3 className="quiz-question">Question {index + 1}: {question}</h3>
        <button
          className="show-answer-button"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        <p className={`quiz-answer ${showAnswer ? 'show' : ''}`}>
          {answer}
        </p>
      </div>
    );
  };

  if (!currentCourse) return null;

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <a href="/">
                <h1 className="logo-text">AI Tutor</h1>
              </a>
            </div>

            <nav className="nav-desktop">
              <div className="dropdown">
                <button className="dropdown-trigger" onClick={() => setShowDropdown(!showDropdown)}>
                  Courses <span className="chevron-down">▼</span>
                </button>
                <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
                  {courses.map(course => (
                    <a
                      key={course.id}
                      href={`?id=${course.id}`}
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentCourse(course);
                        setShowDropdown(false);
                      }}
                    >
                      {course.title}
                    </a>
                  ))}
                </div>
              </div>

              <a href="#" className="nav-link">What we offer</a>
              <a href="#" className="nav-link">Blog</a>
            </nav>

            <div>
              <button className="btn btn-outline">Enroll now</button>
            </div>

            <div className="mobile-menu-button">
              <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className={`mobile-menu ${showMobileMenu ? 'show' : ''}`}>
            <div className="mobile-menu-courses">
              <h3 className="mobile-menu-heading">Courses</h3>
              {courses.map(course => (
                <a
                  key={course.id}
                  href={`?id=${course.id}`}
                  className="mobile-menu-item"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentCourse(course);
                    setShowMobileMenu(false);
                  }}
                >
                  {course.title}
                </a>
              ))}
            </div>
            <a href="#" className="mobile-menu-item">What we offer</a>
            <a href="#" className="mobile-menu-item">Blog</a>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="course-hero">
            <div className="course-info">
              <div className="course-rating">
                <div className="stars">
                  {generateStarRating(currentCourse.rating)}
                </div>
                <span className="reviews">
                  {currentCourse.rating.toFixed(1)} ({currentCourse.reviews} reviews)
                </span>
              </div>

              <h1 className="course-title">{currentCourse.title}</h1>
              <p className="course-description">{currentCourse.description}</p>

              <div className="course-features">
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Comprehensive Curriculum</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Expert Instructors</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Hands-On Projects</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Career-Ready Skills</span>
                </div>
              </div>

              <div className="course-actions">
                <button className="btn btn-primary">Enroll Now</button>
                <button className="btn btn-outline">See Curriculum</button>
              </div>
            </div>

            <div className="course-image-container">
              <img src={currentCourse.image} alt={`${currentCourse.title} course`} className="course-image" />
              <div className="play-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="play-icon">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </div>

          <div className="course-tabs-container">
            <div className="tabs-navigation">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-button ${tab.id === currentTab ? 'active' : ''}`}
                  onClick={() => setCurrentTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="tab-content">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CourseDetails; 