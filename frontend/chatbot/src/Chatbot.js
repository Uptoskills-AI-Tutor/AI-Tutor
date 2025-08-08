import React, { useState } from 'react';
import './style.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (text, sender = 'user') => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setMessages((prev) => [...prev, { text, sender, timestamp }]);
  };

  const sendMessage = () => {
    if (userInput.trim() === '') return;

    addMessage(userInput, 'user');
    setUserInput('');
    setIsTyping(true);

    // Simulate bot typing and reply
    setTimeout(() => {
      setIsTyping(false);
      addMessage("Here’s a helpful explanation! 📘", 'bot');
    }, 1000);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>🤖 AI Tutor Chatbot</h2>
        <button id="clear-chat" onClick={clearMessages}>Clear</button>
      </header>

      <div id="chat-box" className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === 'bot' && <div className="avatar"></div>}
            <div className="bubble">
              {msg.text}
              <div className="timestamp">{msg.timestamp}</div>
            </div>
            {msg.sender === 'user' && <div className="avatar"></div>}
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="avatar"></div>
            <div className="bubble">Typing...</div>
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          id="user-input"
          placeholder="Ask your doubt here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button id="send-btn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
