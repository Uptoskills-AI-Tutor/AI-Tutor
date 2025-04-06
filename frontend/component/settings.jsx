import React, { useState, useEffect } from 'react';
import './settings.css';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
// import ChangePassword from './ChangePassword';
// import ManageAccount from './ManageAccount';
// import DeleteAccount from './DeleteAccount';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showManageAccount, setShowManageAccount] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, translatedTexts, translateAllTexts } = useLanguage();

  const settingsTexts = {
    settings: 'SETTINGS',
    saveChanges: 'Save Changes',
    general: 'General Settings',
    security: 'Account & Security',
    learning: 'Learning Preferences',
    notifications: 'Notifications',
    privacy: 'Privacy & Data',
    language: 'Language',
    theme: 'Theme',
    changePassword: 'Change Password',
    manageLinkedAccounts: 'Manage Linked Accounts',
    twoFactorAuth: 'Two-Factor Authentication (2FA)',
    manageActiveSessions: 'Manage Active Sessions',
    deleteAccount: 'Delete Account',
    aiAvatarSelection: 'AI Avatar Selection',
    courseDifficulty: 'Course Difficulty',
    quizProctoring: 'Quiz Proctoring',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    aiPersonalization: 'AI Personalization',
    dataExport: 'Data Export',
    dataDeletion: 'Data Deletion',
    change: 'Change',
    manage: 'Manage',
    view: 'View',
    delete: 'Delete',
    exportData: 'Export Data',
    requestDeletion: 'Request Deletion'
  };

  useEffect(() => {
    translateAllTexts(settingsTexts, language);
  }, [language]);

  const [settings, setSettings] = useState({
    general: {
      language: language,
      theme: theme,
    },
    security: {
      twoFactorAuth: false,
      activeSessions: [],
    },
    learning: {
      aiAvatar: 'default',
      courseDifficulty: 'medium',
      quizProctoring: true,
    },
    notifications: {
      email: true,
      push: true,
      courseUpdates: true,
      marketing: false,
    },
    privacy: {
      aiPersonalization: true,
      dataExport: false,
      accountDeletion: false,
    }
  });

  const handleGeneralChange = async (type, value) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [type]: value
      }
    }));
    
    if (type === 'theme') {
      toggleTheme(value);
    } else if (type === 'language') {
      setLanguage(value);
    }
  };

  const handleSecurityChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [type]: value
      }
    }));
  };

  const handleLearningChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      learning: {
        ...prev.learning,
        [type]: value
      }
    }));
  };

  const handleNotificationChange = (type) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'general' },
    { id: 'security', label: 'security' },
    { id: 'learning', label: 'learning' },
    { id: 'notifications', label: 'notifications' },
    { id: 'privacy', label: 'privacy' }
  ];

  if (showDeleteAccount) {
    return (
      <DeleteAccount
        onBack={() => setShowDeleteAccount(false)}
      />
    );
  }

  if (showManageAccount) {
    return (
      <ManageAccount
        onBack={() => setShowManageAccount(false)}
      />
    );
  }

  if (showChangePassword) {
    return (
      <ChangePassword
        onBack={() => setShowChangePassword(false)}
      />
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>{translatedTexts.settings || settingsTexts.settings}</h1>
        <button className="save-settings-btn" onClick={handleSaveSettings}>
          {translatedTexts.saveChanges || settingsTexts.saveChanges}
        </button>
      </div>

      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {translatedTexts[tab.label] || settingsTexts[tab.label]}
          </button>
        ))}
      </div>

      <div className="settings-content">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <span className="setting-label">{translatedTexts.language || settingsTexts.language}</span>
                <select
                  value={settings.general.language}
                  onChange={(e) => handleGeneralChange('language', e.target.value)}
                  className="setting-select"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                  <option value="Bengali">বাংলা (Bengali)</option>
                  <option value="Odia">ଓଡ଼ିଆ (Odia)</option>
                </select>
              </div>
              <div className="setting-item">
                <span className="setting-label">{translatedTexts.theme || settingsTexts.theme}</span>
                <select
                  value={settings.general.theme}
                  onChange={(e) => handleGeneralChange('theme', e.target.value)}
                  className="setting-select"
                >
                  <option value="light">Light Theme</option>
                  <option value="dark">Dark Theme</option>
                  <option value="blue">Blue Theme</option>
                  <option value="system">System Theme</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Account & Security */}
        {activeTab === 'security' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <span className="setting-label">{translatedTexts.changePassword || settingsTexts.changePassword}</span>
                <button 
                  className="action-btn"
                  onClick={() => setShowChangePassword(true)}
                >
                  {translatedTexts.change || settingsTexts.change}
                </button>
              </div>
              <div className="setting-item">
                <span className="setting-label">{translatedTexts.manageLinkedAccounts || settingsTexts.manageLinkedAccounts}</span>
                <button 
                  className="action-btn"
                  onClick={() => setShowManageAccount(true)}
                >
                  {translatedTexts.manage || settingsTexts.manage}
                </button>
              </div>
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={() => handleSecurityChange('twoFactorAuth', !settings.security.twoFactorAuth)}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">{translatedTexts.twoFactorAuth || settingsTexts.twoFactorAuth}</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">{translatedTexts.manageActiveSessions || settingsTexts.manageActiveSessions}</span>
                <button className="action-btn">{translatedTexts.view || settingsTexts.view}</button>
              </div>
              <div className="setting-item danger">
                <span className="setting-label">{translatedTexts.deleteAccount || settingsTexts.deleteAccount}</span>
                <button 
                  className="action-btn danger"
                  onClick={() => setShowDeleteAccount(true)}
                >
                  {translatedTexts.delete || settingsTexts.delete}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Learning Preferences */}
        {activeTab === 'learning' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <span className="setting-label">{translatedTexts.aiAvatarSelection || settingsTexts.aiAvatarSelection}</span>
                <select
                  value={settings.learning.aiAvatar}
                  onChange={(e) => handleLearningChange('aiAvatar', e.target.value)}
                  className="setting-select"
                >
                  <option value="default">Default</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              <div className="setting-item">
                <span className="setting-label">{translatedTexts.courseDifficulty || settingsTexts.courseDifficulty}</span>
                <select
                  value={settings.learning.courseDifficulty}
                  onChange={(e) => handleLearningChange('courseDifficulty', e.target.value)}
                  className="setting-select"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.learning.quizProctoring}
                    onChange={() => handleLearningChange('quizProctoring', !settings.learning.quizProctoring)}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">{translatedTexts.quizProctoring || settingsTexts.quizProctoring}</span>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">{translatedTexts.emailNotifications || settingsTexts.emailNotifications}</span>
              </div>
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">{translatedTexts.pushNotifications || settingsTexts.pushNotifications}</span>
              </div>
            </div>
          </div>
        )}

        {/* Privacy & Data */}
        {activeTab === 'privacy' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.aiPersonalization}
                    onChange={() => handlePrivacyChange('aiPersonalization', !settings.privacy.aiPersonalization)}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">{translatedTexts.aiPersonalization || settingsTexts.aiPersonalization}</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">{translatedTexts.dataExport || settingsTexts.dataExport}</span>
                <button className="action-btn">{translatedTexts.exportData || settingsTexts.exportData}</button>
              </div>
              <div className="setting-item">
                <span className="setting-label">{translatedTexts.dataDeletion || settingsTexts.dataDeletion}</span>
                <button className="action-btn">{translatedTexts.requestDeletion || settingsTexts.requestDeletion}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 