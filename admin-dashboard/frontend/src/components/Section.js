// Section.js
import React, { useState } from 'react';
import '../App.css';

const Section = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <h2>{title}</h2>
        <span>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && <div className="section-body">{children}</div>}
    </div>
  );
};

// ✅ This line fixes the error:
export default Section;
