import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FaUsers, FaBook, FaQuestionCircle, FaComments,
  FaBell, FaBars, FaUserCircle, FaSignOutAlt, FaUserTie,
  FaClipboardCheck, FaCheckDouble, FaVideo
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(!mobile);

  const handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    setMobile(isMobile);
    setShowSidebar(!isMobile);
    setCollapsed(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = () => {
    if (mobile) setShowSidebar(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const sidebarWidth = collapsed ? '70px' : '250px';

  const navLinks = [
    { to: '/', icon: <FaUserCircle />, label: 'Admin Dashboard' },
    { to: '/user-management', icon: <FaUsers />, label: 'User Management' },
    { to: '/course-management', icon: <FaBook />, label: 'Course Management' },
    { to: '/mentor-management', icon: <FaUserTie />, label: 'Mentor Management' },
    { to: '/quiz', icon: <FaQuestionCircle />, label: 'Quiz' },
    { to: '/feedback', icon: <FaComments />, label: 'Feedback' },
    { to: '/notifications', icon: <FaBell />, label: 'Notifications' },
    { to: '/admin-doubts', icon: <FaClipboardCheck />, label: 'Admin Doubts' },
    { to: '/resolved-doubts', icon: <FaCheckDouble />, label: 'Resolved Doubts' },
    { to: '/videos', icon: <FaVideo />, label: 'Video List' }, // ✅ Corrected route
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <div
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${showSidebar ? 'show' : ''} ${mobile ? 'mobile' : ''}`}
        style={{ width: sidebarWidth }}
      >
        {/* Top Section */}
        <div className="top-section">
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          {!collapsed && <h2 className="admin-title">Admin Panel</h2>}
        </div>

        {/* Navigation Links */}
        <ul className="menu-list">
          {navLinks.map(link => (
            <li key={link.to} className={location.pathname === link.to ? 'active' : ''}>
              <Link to={link.to} onClick={handleLinkClick} title={collapsed ? link.label : ''}>
                {link.icon}
                {!collapsed && <span>{link.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile & Logout */}
        <div className="profile-section">
          <FaUserCircle className="icon" />
          {!collapsed && (
            <>
              <span className="admin-label">Admin</span>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="main-content" style={{ marginLeft: mobile ? 0 : sidebarWidth }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;






