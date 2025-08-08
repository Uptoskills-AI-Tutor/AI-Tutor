import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Discussion from './pages/Discussion';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings'; // Ensure this file exists

import ProfileSettings from './pages/settings/ProfileSettings';
import LanguageSettings from './pages/settings/LanguageSettings';
import NotificationSettings from './pages/settings/NotificationSettings';
import PasswordSecurity from './pages/settings/PasswordSecurity';
import AppearanceSettings from './pages/settings/AppearanceSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="discussion" element={<Discussion />} />
          <Route path="analytics" element={<Analytics />} />

          {/* Nested Settings Pages */}
          <Route path="settings" element={<Settings />}>
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="language" element={<LanguageSettings />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="password-security" element={<PasswordSecurity />} />
            <Route path="appearance" element={<AppearanceSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
