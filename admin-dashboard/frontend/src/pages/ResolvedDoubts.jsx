import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResolvedDoubts = ({ darkMode }) => {
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    axios.get('/api/doubts/resolved')
      .then(res => setDoubts(res.data))
      .catch(err => console.error('❌ Failed to fetch resolved doubts:', err));
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const containerStyle = {
    backgroundColor: darkMode ? '#1a0033' : '#fdfdfd',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: darkMode
      ? '0 0 20px rgba(255, 235, 59, 0.2)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    overflowX: 'auto',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '16px',
  };

  const headerStyle = {
    backgroundColor: darkMode ? '#4a004e' : '#e0e0e0',
    color: darkMode ? '#ffee58' : '#333',
    textAlign: 'left',
    padding: '12px',
  };

  const cellStyle = {
    padding: '12px',
    borderBottom: darkMode ? '1px solid #555' : '1px solid #ccc',
    color: darkMode ? '#fff' : '#333',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: darkMode ? '#ffee58' : '#333', marginBottom: '20px' }}>
        📬 Resolved Doubts
      </h2>

      {doubts.length === 0 ? (
        <p style={{ color: darkMode ? '#ccc' : '#555' }}>No resolved doubts yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>User</th>
              <th style={headerStyle}>Course</th>
              <th style={headerStyle}>Doubt</th>
              <th style={headerStyle}>Response</th>
              <th style={headerStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {doubts.map((d) => (
              <tr key={d._id}>
                <td style={cellStyle}>{d.username}</td>
                <td style={cellStyle}>{d.courseTitle}</td>
                <td style={cellStyle}>{d.doubtText}</td>
                <td style={cellStyle}>{d.response || '-'}</td>
                <td style={cellStyle}>
                  {formatDate(d.updatedAt || d.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResolvedDoubts;



