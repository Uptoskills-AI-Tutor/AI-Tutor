import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', padding: '80px' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#6a1b9a' }}>🎉 Thank You!</h1>
      <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>
        You have been logged out successfully.
      </p>

      <button
        onClick={handleGoBack}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#7e57c2',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        🔙 Back to Dashboard
      </button>
    </div>
  );
};

export default ThankYou; 