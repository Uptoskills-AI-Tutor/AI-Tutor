import React, { useState } from 'react';
import './UserForm.css'; // We'll style it separately

const UserForm = ({ users, setUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Student' });

  const handleAddUser = () => {
    if (!formData.name || !formData.email) {
      alert('Please enter both name and email');
      return;
    }
    setUsers([...users, formData]);
    setFormData({ name: '', email: '', role: 'Student' });
    setShowModal(false);
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="user-section">
      <div className="user-header">
        <h2>User Management</h2>
        <button className="primary-btn" onClick={() => setShowModal(true)}>Add User</button>
      </div>

      <table className="styled-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="4">No users added.</td></tr>
          ) : (
            users.map((u, idx) => (
              <tr key={idx}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td><button className="delete-btn" onClick={() => handleDelete(idx)}>Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <label>Role:</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option>Student</option>
                <option>Mentor</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
              <button onClick={handleAddUser} className="primary-btn">Save User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
