import { NavLink, Outlet } from 'react-router-dom';
import '../styles/Settings.css'; // Ensure this file exists

function Settings() {
  return (
    <div className="settings-container">
      <aside className="settings-sidebar">
        <h2 className="settings-title">Settings</h2>
        <nav className="settings-nav">
          <NavLink to="profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
          <NavLink to="language" className={({ isActive }) => (isActive ? 'active' : '')}>Language</NavLink>
          <NavLink to="notifications" className={({ isActive }) => (isActive ? 'active' : '')}>Notifications</NavLink>
          <NavLink to="password-security" className={({ isActive }) => (isActive ? 'active' : '')}>Password & Security</NavLink>
          <NavLink to="appearance" className={({ isActive }) => (isActive ? 'active' : '')}>Appearance</NavLink>
        </nav>
      </aside>
      <main className="settings-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Settings;
