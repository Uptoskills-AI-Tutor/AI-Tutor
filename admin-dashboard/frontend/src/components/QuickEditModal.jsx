import React, { useState, useEffect } from 'react';

const QuickEditModal = ({ video, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    description: '',
    level: '',
    topic: '',
    status: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (video) {
      setFormData({
        _id: video._id || '',
        title: video.title || '',
        description: video.description || '',
        level: video.level || '',
        topic: video.topic || '',
        status: video.status || '',
      });
    }
  }, [video]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, level, topic, status } = formData;

    if (!title || !description || !level || !topic || !status) {
      setError('❗ Please fill in all fields.');
      return;
    }

    setError('');
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError('❌ Failed to save changes. Please try again.');
      console.error(err);
    }
  };

  if (!video) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>✏️ Edit Video</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={{ ...styles.input, height: 80, resize: 'vertical' }}
            required
          />

          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">📚 Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">🧠 Select Topic</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">📄 Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Published">Published</option>
            <option value="Rejected">Rejected</option>
          </select>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.buttonRow}>
            <button type="submit" style={styles.saveBtn}>
              💾 Save
            </button>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 2000,
  },
  modal: {
    backgroundColor: '#ffffff',
    color: '#111111',
    padding: '24px 30px',
    borderRadius: '10px',
    width: '420px',
    maxWidth: '90vw',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  heading: {
    margin: 0,
    marginBottom: '16px',
    fontSize: '1.4rem',
    fontWeight: 600,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#111111',
    fontSize: '0.95rem',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  saveBtn: {
    backgroundColor: '#198754',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 600,
    minWidth: 100,
  },
  cancelBtn: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 600,
    minWidth: 100,
  },
  error: {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default QuickEditModal;
