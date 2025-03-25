import React, { useState } from 'react';
import './course.css';

const Course = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "John Doe",
      rating: 4.5,
      startDate: "2024-02-15",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3m3I1Et0DkUoOZxASehgMZqHlPn6Ah7vjw&s",
      description: "Learn the basics of web development with HTML, CSS, and JavaScript.",
      status: "active"
    },
    {
      id: 2,
      title: "React.js Mastery",
      instructor: "Jane Smith",
      rating: 4.8,
      startDate: "2024-02-20",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3m3I1Et0DkUoOZxASehgMZqHlPn6Ah7vjw&s",
      description: "Master React.js and build modern web applications.",
      status: "active"
    },
    {
      id: 3,
      title: "Python Programming",
      instructor: "Mike Johnson",
      rating: 4.6,
      startDate: "2024-02-18",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3m3I1Et0DkUoOZxASehgMZqHlPn6Ah7vjw&s",
      description: "Learn Python programming from scratch to advanced concepts.",
      status: "completed"
    },
    {
      id: 4,
      title: "Data Science Essentials",
      instructor: "Sarah Wilson",
      rating: 4.7,
      startDate: "2024-02-25",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3m3I1Et0DkUoOZxASehgMZqHlPn6Ah7vjw&s",
      description: "Master data analysis, visualization, and machine learning fundamentals.",
      status: "completed"
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      instructor: "Alex Chen",
      rating: 4.9,
      startDate: "2024-03-01",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3m3I1Et0DkUoOZxASehgMZqHlPn6Ah7vjw&s",
      description: "Learn to create beautiful and user-friendly interface designs.",
      status: "completed"
    },
    {
      id: 6,
      title: "Mobile App Development",
      instructor: "Emily Brown",
      rating: 4.4,
      startDate: "2024-03-05",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3m3I1Et0DkUoOZxASehgMZqHlPn6Ah7vjw&s",
      description: "Build iOS and Android apps using React Native.",
      status: "active"
    },
    {
      id: 7,
      title: "Digital Marketing Strategy",
      instructor: "David Lee",
      rating: 4.7,
      startDate: "2024-03-10",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3m3I1Et0DkUoOZxASehgMZqHlPn6Ah7vjw&s",
      description: "Learn effective digital marketing techniques and strategies.",
      status: "upcoming"
    },
    {
      id: 8,
      title: "Cybersecurity Fundamentals",
      instructor: "Maria Garcia",
      rating: 4.8,
      startDate: "2024-03-15",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3m3I1Et0DkUoOZxASehgMZqHlPn6Ah7vjw&s",
      description: "Understand cybersecurity basics and protect against threats.",
      status: "upcoming"
    },
    {
      id: 9,
      title: "Cloud Computing AWS",
      instructor: "Tom Anderson",
      rating: 4.6,
      startDate: "2024-03-20",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3m3I1Et0DkUoOZxASehgMZqHlPn6Ah7vjw&s",
      description: "Master Amazon Web Services cloud platform and services.",
      status: "active"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && course.status === activeFilter;
  });

  const handleViewMore = (courseId) => {
    // Navigate to course details page
    window.location.href = `/course/${courseId}`;
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
              placeholder="Search your courses..."
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
        <h1 className="courses-title">My Courses</h1>
        <div className="courses-filter">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => setActiveFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card" data-status={course.status}>
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-content">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-instructor">Instructor: {course.instructor}</p>
              <div className="course-rating">
                <span>★ {course.rating}</span>
              </div>
              <p className="course-description">{course.description}</p>
              <div className="course-footer">
                <p className="course-start-date">
                  Starts: {new Date(course.startDate).toLocaleDateString()}
                </p>
                <button 
                  className="view-more-btn"
                  onClick={() => handleViewMore(course.id)}
                >
                  View More
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
