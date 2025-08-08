import React, { useState } from 'react';
import './FormModal.css';

const CourseForm = ({ courses, setCourses }) => {
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration: '',
  });

  const handleAdd = () => {
    if (!newCourse.title || !newCourse.duration) {
      return alert('Title and duration are required');
    }
    setCourses([...courses, newCourse]);
    setNewCourse({ title: '', description: '', duration: '' });
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const updated = courses.filter((_, i) => i !== index);
    setCourses(updated);
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Course Management</h2>
        <button className="add-button" onClick={() => setShowModal(true)}>Add Course</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Course</h3>

            <label>Title:</label>
            <input
              type="text"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            />

            <label>Description:</label>
            <textarea
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            />

            <label>Duration (hours):</label>
            <input
              type="number"
              value={newCourse.duration}
              onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAdd}>Save Course</button>
            </div>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4">No courses added.</td>
            </tr>
          ) : (
            courses.map((course, i) => (
              <tr key={i}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.duration}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(i)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseForm;

