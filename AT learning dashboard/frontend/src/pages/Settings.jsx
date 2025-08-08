// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import {
  Bell,
  Moon,
  Globe,
  Lock,
  User,
  Mail,
  Sun,
  Laptop,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useUser } from '../context/UserContext'; // NEW

const TABS = [
  { key: 'profile', icon: User, label: 'Profile' },
  { key: 'notifications', icon: Bell, label: 'Notifications' },
  { key: 'security', icon: Lock, label: 'Password & Security' },
  { key: 'appearance', icon: Moon, label: 'Appearance' },
  { key: 'language', icon: Globe, label: 'Language' },
];

const Settings = () => {
  const [active, setActive] = useState('profile');

  // ---- Pull/set global user ----
  const { user, setUser } = useUser(); // NEW

  // ------- Profile state -------
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    avatarFile: null,
    avatarPreview: '',
  });

  // initialize local profile from global user
  useEffect(() => {
    setProfile((p) => ({
      ...p,
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      email: user.email ?? '',
      bio: user.bio ?? '',
      avatarFile: null,
      avatarPreview: user.avatar ?? '',
    }));
  }, [user]);

  // ------- Notifications state -------
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weeklySummary: true,
  });

  // ------- Security state -------
  const [showPasswords, setShowPasswords] = useState(false);
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [securityError, setSecurityError] = useState('');

  // ------- Appearance / Theme -------
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (value) => {
    const root = document.documentElement;
    if (value === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (value === 'light') {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'system');
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        root.classList.add('dark');
      }
    }
  };

  // ------- Language -------
  const [language, setLanguage] = useState('en');

  // ------- Handlers -------
  const onProfileChange = (key, value) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const onAvatarChange = (file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProfile((p) => ({ ...p, avatarFile: file, avatarPreview: preview }));
  };

  const handleProfileSave = () => {
    // CHANGED: push to global user context so Sidebar can see it
    setUser((prev) => ({
      ...prev,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      bio: profile.bio,
      avatar: profile.avatarPreview || prev.avatar || '',
    }));
    console.log('Profile saved:', profile);
    alert('Profile updated!');
  };

  const handleNotificationsSave = () => {
    console.log('Notifications saved:', notifications);
    alert('Notification preferences updated!');
  };

  const handleSecuritySave = () => {
    setSecurityError('');
    const { currentPassword, newPassword, confirmPassword } = security;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setSecurityError('Please fill all fields.');
      return;
    }
    if (newPassword.length < 6) {
      setSecurityError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityError("New passwords don't match.");
      return;
    }
    console.log('Security updated:', security);
    alert('Password updated!');
    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleAppearanceSave = () => {
    console.log('Theme saved:', theme);
    alert('Appearance saved!');
  };

  const handleLanguageSave = () => {
    console.log('Language saved:', language);
    alert('Language saved!');
  };

  /* -------------------- Renderers -------------------- */

  const renderProfile = () => (
    <div className="card text-gray-900">
      <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

      <div className="mb-8 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
          {profile.avatarPreview ? (
            <img
              src={profile.avatarPreview}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={32} />
          )}
        </div>
        <div>
          <h3 className="font-medium mb-1">Profile Photo</h3>
          <div className="flex gap-2">
            <label className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onAvatarChange(e.target.files?.[0])}
              />
              Upload new photo
            </label>
            {profile.avatarPreview && (
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() =>
                  setProfile((p) => ({
                    ...p,
                    avatarFile: null,
                    avatarPreview: '',
                  }))
                }
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={profile.firstName}
              onChange={(e) => onProfileChange('firstName', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={profile.lastName}
              onChange={(e) => onProfileChange('lastName', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <div className="flex">
            <div className="flex-shrink-0 inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
              <Mail size={16} />
            </div>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={(e) => onProfileChange('email', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            value={profile.bio}
            onChange={(e) => onProfileChange('bio', e.target.value)}
            placeholder="Write a short bio about yourself..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
          ></textarea>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="btn bg-white text-gray-900 border border-gray-300 mr-2">
            Cancel
          </button>
          <button onClick={handleProfileSave} className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="card text-gray-900">
      <h2 className="text-xl font-semibold mb-6">Notifications</h2>

      <div className="space-y-5">
        <ToggleRow
          label="Email notifications"
          checked={notifications.email}
          onChange={(v) => setNotifications((p) => ({ ...p, email: v }))}
        />
        <ToggleRow
          label="Push notifications"
          checked={notifications.push}
          onChange={(v) => setNotifications((p) => ({ ...p, push: v }))}
        />
        <ToggleRow
          label="Weekly summary"
          checked={notifications.weeklySummary}
          onChange={(v) =>
            setNotifications((p) => ({ ...p, weeklySummary: v }))
          }
        />
      </div>

      <div className="pt-6 flex justify-end">
        <button className="btn bg-white text-gray-900 border border-gray-300 mr-2">
          Cancel
        </button>
        <button onClick={handleNotificationsSave} className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="card text-gray-900">
      <h2 className="text-xl font-semibold mb-6">Password & Security</h2>

      <div className="space-y-6 max-w-lg">
        {securityError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">
            {securityError}
          </div>
        )}

        <PasswordInput
          label="Current Password"
          value={security.currentPassword}
          onChange={(v) =>
            setSecurity((s) => ({ ...s, currentPassword: v }))
          }
          show={showPasswords}
          toggleShow={() => setShowPasswords((s) => !s)}
        />

        <PasswordInput
          label="New Password"
          value={security.newPassword}
          onChange={(v) => setSecurity((s) => ({ ...s, newPassword: v }))}
          show={showPasswords}
          toggleShow={() => setShowPasswords((s) => !s)}
        />

        <PasswordInput
          label="Confirm New Password"
          value={security.confirmPassword}
          onChange={(v) =>
            setSecurity((s) => ({ ...s, confirmPassword: v }))
          }
          show={showPasswords}
          toggleShow={() => setShowPasswords((s) => !s)}
        />

        <div className="pt-4 flex justify-end">
          <button className="btn bg-white text-gray-900 border border-gray-300 mr-2">
            Cancel
          </button>
          <button onClick={handleSecuritySave} className="btn btn-primary">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="card text-gray-900">
      <h2 className="text-xl font-semibold mb-6">Appearance</h2>

      <div className="space-y-4">
        <RadioRow
          value="light"
          selected={theme}
          onChange={setTheme}
          label="Light"
          icon={<Sun size={18} />}
        />
        <RadioRow
          value="dark"
          selected={theme}
          onChange={setTheme}
          label="Dark"
          icon={<Moon size={18} />}
        />
        <RadioRow
          value="system"
          selected={theme}
          onChange={setTheme}
          label="System"
          icon={<Laptop size={18} />}
        />
      </div>

      <div className="pt-6 flex justify-end">
        <button className="btn bg-white text-gray-900 border border-gray-300 mr-2">
          Cancel
        </button>
        <button onClick={handleAppearanceSave} className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  );

  const renderLanguage = () => (
    <div className="card text-gray-900">
      <h2 className="text-xl font-semibold mb-6">Language</h2>

      <div className="max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div className="pt-6 flex justify-end">
        <button className="btn bg-white text-gray-900 border border-gray-300 mr-2">
          Cancel
        </button>
        <button onClick={handleLanguageSave} className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div className="text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="card p-4 text-gray-900">
            <nav>
              <ul className="space-y-1">
                {TABS.map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => setActive(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                        active === item.key
                          ? 'bg-primary-50 text-primary-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="col-span-3">
          {active === 'profile' && renderProfile()}
          {active === 'notifications' && renderNotifications()}
          {active === 'security' && renderSecurity()}
          {active === 'appearance' && renderAppearance()}
          {active === 'language' && renderLanguage()}
        </div>
      </div>
    </div>
  );
};

export default Settings;

/* -------------------- Small Reusable Components -------------------- */

const ToggleRow = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between text-gray-900">
    <span className="text-sm font-medium">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary-500 transition-colors"></div>
      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
    </label>
  </div>
);

const RadioRow = ({ value, selected, onChange, label, icon }) => (
  <label className="flex items-center gap-3 cursor-pointer text-gray-900">
    <input
      type="radio"
      name="appearance"
      value={value}
      checked={selected === value}
      onChange={(e) => onChange(e.target.value)}
      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
    />
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
  </label>
);

const PasswordInput = ({ label, value, onChange, show, toggleShow }) => (
  <div className="text-gray-900">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-500"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  </div>
);
