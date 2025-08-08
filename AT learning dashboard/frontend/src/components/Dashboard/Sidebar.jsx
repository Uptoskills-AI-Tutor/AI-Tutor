import React, { memo, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../../data/mockData";
import * as LucideIcons from "lucide-react";
import { useUser } from "../../context/UserContext";
import "../../styles.css";

const Sidebar = memo(function Sidebar({ open = false, onClose = () => {} }) {
  const location = useLocation();
  const { user } = useUser();

  // Use navItems from mockData
  const menu = useMemo(() => navItems, []);

  // Render Lucide icon by name; fallback to HelpCircle if missing
  const renderIcon = (iconName) => {
    const Icon = LucideIcons[iconName] || LucideIcons.HelpCircle;
    return <Icon size={18} aria-hidden="true" />;
  };

  // Check if path is root "/app"
  const isRoot = (path) => path === "/app";

  return (
    <aside
      className={`sidebar ${open ? "open" : ""}`}
      role="navigation"
      aria-label="Main sidebar"
      aria-hidden={!open && window.innerWidth <= 768 ? true : undefined}
    >
      <div className="sidebar-header">
        <h1 className="sidebar-title">Learning Dashboard</h1>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menu.map((item) => {
            const activeByPrefix =
              !isRoot(item.path) && location.pathname.startsWith(item.path + "/");

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={isRoot(item.path)}
                  className={({ isActive }) =>
                    `nav-item ${isActive || activeByPrefix ? "active" : ""}`
                  }
                  aria-current={location.pathname === item.path ? "page" : undefined}
                  onClick={onClose}
                >
                  {renderIcon(item.icon)}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="avatar">
            {user?.avatarPreview ? (
              <img
                src={user.avatarPreview}
                alt="avatar"
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <LucideIcons.User size={16} />
            )}
          </div>
          <div className="user-meta">
            <p className="name">
              {user?.firstName || "Student"} {user?.lastName || ""}
            </p>
            <p className="email">{user?.email || "student@example.com"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
});

export default Sidebar;

