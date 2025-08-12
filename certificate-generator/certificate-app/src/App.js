import React, { useState } from 'react';
import Certificate from './Certificate';
import './Certificate.css';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    name: '',
    course: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="form-box">
          <h2>Generate Your Certificate</h2>
          <input
            type="text"
            placeholder="Recipient Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Course Name"
            value={data.course}
            onChange={(e) => setData({ ...data, course: e.target.value })}
            required
          />
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
            required
          />
          <input
            type="date"
            value={data.endDate}
            onChange={(e) => setData({ ...data, endDate: e.target.value })}
            required
          />
          <button type="submit">Generate Certificate</button>
        </form>
      ) : (
        <Certificate {...data} />
      )}
    </div>
  );
}

export default App;
