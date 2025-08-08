import React, { useState } from "react";
import './quickActions.css'
const QuickActions = () => {
  const [user, setUser] = useState({ name: "", email: "", role: "Admin" });
  const [notification, setNotification] = useState({ title: "", message: "" });
  const [maintenance, setMaintenance] = useState(false);

  const handleAddUser = () => {
    console.log("Add User:", user);
    // TODO: Call kro backend API ko
  };

  const handleSendNotification = () => {
    console.log("Send Notification:", notification);
    // TODO: Call kro backend API ko
  };

  const handleToggleMaintenance = () => {
    setMaintenance(!maintenance);
    console.log("Maintenance Mode:", !maintenance);
    // TODO: Call kro backend API ko
  };

  return (
    <div style={styles.card}>
      <div style={styles.header} className="myHeader">
        <h2 style={{ margin: 0 }} className="quick_actions">Quick Actions</h2>
        <p>Instant Admin Tools</p>
      </div>

      <div style={styles.content}>
        {/* Add User Section */}
        <div style={styles.section} className="form-handling">
          <h3>Add User</h3>
          <hr/>
          <label>Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter name"
            style={styles.input}
          />
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter email"
            style={styles.input}
          />
          <label>Role</label>
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            style={styles.input}
          >
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
          <button style={styles.button} onClick={handleAddUser}>
            Add User
          </button>
        </div>

        {/* Send Notification Section */}
        <div style={styles.section} className="notifications">
          <h3>Send Notification</h3>
          <hr/>
          <label>Title</label>
          <input
            type="text"
            value={notification.title}
            onChange={(e) =>
              setNotification({ ...notification, title: e.target.value })
            }
            placeholder="Notification title"
            style={styles.input}
          />
          <label>Message</label>
          <textarea
            value={notification.message}
            onChange={(e) =>
              setNotification({ ...notification, message: e.target.value })
            }
            placeholder="Enter your message"
            style={{ ...styles.input, height: "60px" }}
          />
          <button style={styles.button} onClick={handleSendNotification}>
            Send
          </button>
        </div>

        {/* Maintenance Toggle */}
        <div style={styles.section}>
          <h3>Settings</h3>
          <div style={styles.toggle}>
            <label>Maintenance Mode</label>
            <input
              type="checkbox"
              checked={maintenance}
              onChange={handleToggleMaintenance}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple inline styles
const styles = {
  card: {
    width: "400px",
    margin: "40px auto",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    // fontFamily: "Arial, sans-serif",
  },
  header: {
    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
    color: "white",
    padding: "20px",
    height:"100px",
    display:"flex",
  },
  content: {
    background: "white",
    padding: "20px",
  },
  section: {
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#ff4b2b",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default QuickActions;
