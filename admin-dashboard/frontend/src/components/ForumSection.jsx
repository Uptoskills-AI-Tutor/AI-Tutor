import React, { useState, useEffect } from 'react';
import './ForumSection.css';

const ForumSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [feedbackActions, setFeedbackActions] = useState({});

  // Load from localStorage when component mounts
  useEffect(() => {
    const savedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
    const savedActions = JSON.parse(localStorage.getItem('feedbackActions')) || {};
    setAnnouncements(savedAnnouncements);
    setFeedbackActions(savedActions);
  }, []);

  // Save to localStorage when announcements or actions change
  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
    localStorage.setItem('feedbackActions', JSON.stringify(feedbackActions));
  }, [announcements, feedbackActions]);

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.trim()) return alert('Announcement cannot be empty');
    setAnnouncements([...announcements, newAnnouncement]);
    setNewAnnouncement('');
  };

  const handleDeleteAnnouncement = (index) => {
    const updated = announcements.filter((_, i) => i !== index);
    setAnnouncements(updated);
  };

  const handleFlagFeedback = (index) => {
    setFeedbackActions((prev) => ({ ...prev, [index]: 'flagged' }));
  };

  const handleBanUser = (index) => {
    setFeedbackActions((prev) => ({ ...prev, [index]: 'banned' }));
  };

  const dummyFeedback = [
    'App crashes on login.',
    'Please add dark mode.',
    'Great interface!',
    'Bug in course upload feature.',
  ];

  return (
    <div className="forum-section">
      <h2>Forum & Feedback Moderation</h2>

      <h3>User Feedback</h3>
      <table className="forum-table">
        <thead>
          <tr>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyFeedback.map((text, i) => (
            <tr key={i}>
              <td>{text}</td>
              <td>
                <button
                  className={`flag-btn ${feedbackActions[i] === 'flagged' ? 'clicked' : ''}`}
                  onClick={() => handleFlagFeedback(i)}
                >
                  Flag
                </button>
                <button
                  className={`ban-btn ${feedbackActions[i] === 'banned' ? 'clicked' : ''}`}
                  onClick={() => handleBanUser(i)}
                >
                  Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="divider" />

      <h3>Post Announcement</h3>
      <div className="announcement-input">
        <input
          type="text"
          placeholder="New Announcement"
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <button className="post-btn" onClick={handleAddAnnouncement}>Post</button>
      </div>

      {announcements.length === 0 ? (
        <p className="no-announcement">No announcements yet.</p>
      ) : (
        <ul className="announcement-list">
          {announcements.map((a, i) => (
            <li key={i}>
              📢 {a}
              <button className="delete-btn" onClick={() => handleDeleteAnnouncement(i)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ForumSection;


