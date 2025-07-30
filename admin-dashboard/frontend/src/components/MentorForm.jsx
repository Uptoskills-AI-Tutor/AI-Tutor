import React, { useState } from 'react';
import './MentorForm.css';

const MentorForm = ({ mentors, setMentors }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    subject: '',
    image: '',
    voice: ''
  });

  const handleAddMentor = () => {
    if (!formData.name || !formData.subject) {
      alert('Name and Subject are required');
      return;
    }
    setMentors([...mentors, formData]);
    setFormData({ name: '', bio: '', subject: '', image: '', voice: '' });
    setShowModal(false);
  };

  const handleDelete = (index) => {
    setMentors(mentors.filter((_, i) => i !== index));
  };

  return (
    <div className="mentor-section">
      <div className="mentor-header">
        <h2>Mentor Avatar Management</h2>
        <button className="primary-btn" onClick={() => setShowModal(true)}>Add Mentor</button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Bio</th>
            <th>Image</th>
            <th>Voice</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mentors.length === 0 ? (
            <tr><td colSpan="6">No mentors added.</td></tr>
          ) : (
            mentors.map((mentor, idx) => (
              <tr key={idx}>
                <td>{mentor.name}</td>
                <td>{mentor.subject}</td>
                <td>{mentor.bio || '-'}</td>
                <td>
                  {mentor.image ? (
                    <img
                      src={mentor.image}
                      alt="mentor"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '1px solid #ccc'
                      }}
                    />
                  ) : 'N/A'}
                </td>
                <td>
                  {mentor.voice ? (
                    <a href={mentor.voice} target="_blank" rel="noopener noreferrer">
                      🎵 Listen
                    </a>
                  ) : 'N/A'}
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(idx)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Mentor</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div className="modal-body">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <label>Bio:</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />

              <label>Subject Tags:</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />

              <label>Image URL:</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />

              <label>Voice Clip Link (optional):</label>
              <input
                type="text"
                value={formData.voice}
                onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
              />
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
              <button onClick={handleAddMentor} className="primary-btn">Save Mentor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorForm;

