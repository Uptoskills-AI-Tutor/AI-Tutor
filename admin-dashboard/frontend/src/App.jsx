import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// 🔧 Core Components
import Sidebar from './components/Sidebar.jsx';
import UserForm from './components/UserForm.jsx';
import CourseForm from './components/CourseForm.jsx';
import MentorForm from './components/MentorForm.jsx';
import QuizSection from './components/QuizSection.jsx';
import ForumSection from './components/ForumSection.jsx';
import NotificationBox from './components/NotificationBox.jsx';

// 🧩 Page Components
import AdminDashboard from './pages/AdminDashboard.jsx';
import ThankYou from './pages/ThankYou.jsx';
import AdminDoubtPanel from './pages/AdminDoubtPanel.jsx';
import ResolvedDoubts from './pages/ResolvedDoubts.jsx';
import CosmicClassroom from './pages/CosmicClassroom.jsx';

// 🎥 Video Management
import VideoList from './pages/VideoList.jsx';
import VideoDetail from './pages/VideoDetail.jsx';

// 🔐 Static Page
const Login = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h2>🎉 Thank you for visiting</h2>
    <p>This is just a placeholder to avoid routing errors.</p>
  </div>
);

// 🧠 Main App Logic & Layout
const AppContent = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // 🔁 Load Data from Local Storage
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('admin_users')) || []);
    setCourses(JSON.parse(localStorage.getItem('admin_courses')) || []);
    setMentors(JSON.parse(localStorage.getItem('admin_mentors')) || []);
  }, []);

  // 💾 Persist Data to Local Storage
  useEffect(() => {
    localStorage.setItem('admin_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('admin_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('admin_mentors', JSON.stringify(mentors));
  }, [mentors]);

  // 🎯 Route-specific UI
  const hideSidebarRoutes = ['/login', '/thankyou'];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  // 🎨 Theme Styles
  const vibrantBackground = darkMode
    ? 'linear-gradient(to right, #14001f, #290045, #5f00a3)'
    : 'linear-gradient(to right, #e0c3fc, #8ec5fc)';

  const globalStyle = {
    background: vibrantBackground,
    display: 'flex',
    minHeight: '100vh',
    transition: 'background 0.5s, color 0.5s',
  };

  const mainStyle = {
    flex: 1,
    padding: '30px',
    marginLeft: showSidebar ? '220px' : '0',
    backgroundColor: darkMode ? '#2b0040' : '#ffffff',
    color: darkMode ? '#ffee58' : '#000000',
    fontWeight: darkMode ? 'bold' : 'normal',
    borderTopLeftRadius: showSidebar ? '20px' : '0',
    boxShadow: darkMode
      ? '0 0 40px rgba(255, 235, 59, 0.2)'
      : '0 0 20px rgba(0, 0, 0, 0.1)',
    minHeight: '100vh',
    transition: 'all 0.5s ease',
  };

  return (
    <div style={globalStyle}>
      {showSidebar && <Sidebar darkMode={darkMode} />}
      <div style={mainStyle}>
        {showSidebar && (
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '30px',
              padding: '8px 12px',
              backgroundColor: darkMode ? '#ff4081' : '#f0f0f0',
              color: darkMode ? '#ffffff' : '#000000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        )}

        <Routes>
          {/* 🧭 Admin Core */}
          <Route path="/" element={<AdminDashboard darkMode={darkMode} />} />
          <Route path="/user-management" element={<UserForm users={users} setUsers={setUsers} darkMode={darkMode} />} />
          <Route path="/course-management" element={<CourseForm courses={courses} setCourses={setCourses} darkMode={darkMode} />} />
          <Route path="/mentor-management" element={<MentorForm mentors={mentors} setMentors={setMentors} darkMode={darkMode} />} />
          <Route path="/quiz" element={<QuizSection darkMode={darkMode} />} />
          <Route path="/feedback" element={<ForumSection darkMode={darkMode} />} />
          <Route path="/notifications" element={<NotificationBox darkMode={darkMode} />} />
          <Route path="/admin-doubts" element={<AdminDoubtPanel darkMode={darkMode} />} />
          <Route path="/resolved-doubts" element={<ResolvedDoubts darkMode={darkMode} />} />
          <Route path="/cosmic" element={<CosmicClassroom />} />

          {/* 🎥 Video Management */}
          <Route path="/videos" element={<VideoList darkMode={darkMode} />} />
          <Route path="/video/:id" element={<VideoDetail darkMode={darkMode} />} />

          {/* 🔐 Static Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </div>
    </div>
  );
};

// 🚀 Root App
const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;

