import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import './App.css'

const socket = io("http://localhost:5000"); // Backend URL

const App = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("chatMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("chatMessage");
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chatMessage", { user: username || "Anonymous", text: message });
      setMessage("");
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Community Forum</h1>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </header>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;

