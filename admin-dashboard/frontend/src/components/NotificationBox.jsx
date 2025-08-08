import React, { useState } from 'react';
import './NotificationBox.css';

const NotificationBox = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentList, setSentList] = useState([]);

  const handleSend = () => {
    if (!email || !message) {
      alert('Please enter both message and email');
      return;
    }
    setSentList([...sentList, { email, message }]);
    setEmail('');
    setMessage('');
    alert('Solution sent!');
  };

  return (
    <div className="notification-section">
      <h2>📩 Notifications</h2>
      <p>Send solutions of user-asked questions. Delivered to registered email.</p>
      <textarea
        className="input-box"
        placeholder="Type your solution..."
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <input
        type="email"
        className="input-box"
        placeholder="User's Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="send-button" onClick={handleSend}>Send Solution</button>

      {sentList.length > 0 && (
        <div className="sent-history">
          <h4>Sent Notifications:</h4>
          <ul>
            {sentList.map((item, idx) => (
              <li key={idx}>✅ Sent to {item.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBox;
