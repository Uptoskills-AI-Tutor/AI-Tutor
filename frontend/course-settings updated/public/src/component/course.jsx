import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './course.css';
import { useLanguage } from '../context/LanguageContext';

const Course = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const { language, translatedTexts, translateAllTexts } = useLanguage();

  const courseTexts = {
    searchPlaceholder: "Search your courses...",
    myCourses: "My Courses",
    all: "All",
    active: "Active",
    upcoming: "Upcoming",
    completed: "Completed",
    instructor: "Instructor",
    starts: "Starts",
    viewMore: "View More",
    courseStatus: {
      active: "Active",
      upcoming: "Upcoming",
      completed: "Completed"
    }
  };

  useEffect(() => {
    translateAllTexts(courseTexts, language);
  }, [language]);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/data/list.json');
        const data = await response.json();
        // Add logging to see the fetched data
        console.log('Fetched courses:', data.courses);
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs once when component mounts


  useEffect(() => {
    console.log('Active Filter:', activeFilter);
  }, [activeFilter]);

  // Filter courses based on search query and active filter
  const filteredCourses = courses.filter(course => {
    // First check if course matches search query
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    // If not matching search, filter it out
    if (!matchesSearch) return false;

    // If showing all courses, keep it
    if (activeFilter === 'all') return true;

    // Check status match
    const courseStatus = course.status?.toLowerCase().trim();
    return courseStatus === activeFilter.toLowerCase();
  });

  // Log filtered results for debugging
  useEffect(() => {
    if (courses.length > 0) {
      const statusCounts = courses.reduce((acc, course) => {
        const status = course.status?.toLowerCase().trim() || 'unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
      console.log('Status counts:', statusCounts);
      console.log('Current filter:', activeFilter);
      console.log('Filtered courses count:', filteredCourses.length);
    }
  }, [courses, activeFilter, filteredCourses.length]);

  const navigate = useNavigate();

  const handleViewMore = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="course-container">
      <div className="header-section">
        <div className="search-section fixed-width">
          <div className="search-wrapper">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder={translatedTexts.searchPlaceholder || courseTexts.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`search-input ${isSearchFocused ? 'focused' : ''}`}
            />
          </div>
        </div>
        <div className="user-badge">
          <img src="data:image/png;base64,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" alt="User" className="user-avatar" />
        </div>
      </div>

      <div className="courses-header">
        <h1 className="courses-title">{translatedTexts.myCourses || courseTexts.myCourses}</h1>
        <div className="courses-filter">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            {translatedTexts.all || courseTexts.all}
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => setActiveFilter('active')}
          >
            {translatedTexts.active || courseTexts.active}
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveFilter('upcoming')}
          >
            {translatedTexts.upcoming || courseTexts.upcoming}
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            {translatedTexts.completed || courseTexts.completed}
          </button>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card" data-status={course.status} onClick={() => handleViewMore(course.id)}>
            <div className="course-image-container">
              <img src={course.image} alt={course.title} className="course-image" />
            </div>
            <div className="course-content">
              <h2 className="course-titles">{course.title}</h2>
              <p className="course-descriptions">{course.description}</p>
              <div className="course-footer">
                <div className="course-top-info">
                  <div className="course-start-date">
                    <h3>Start date</h3>
                    <p>{new Date(course.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="course-rating">
                    <div className="rating-stars">{'★'.repeat(Math.floor(course.rating))}</div>
                    <span className="rating-numbers">{course.rating}</span>
                  </div>
                </div>
                <button className="view-more-btn" onClick={(e) => { e.stopPropagation(); handleViewMore(course.id); }}>
                  {translatedTexts.viewMore || courseTexts.viewMore}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
