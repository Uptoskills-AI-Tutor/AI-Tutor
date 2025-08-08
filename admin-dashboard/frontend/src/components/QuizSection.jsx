import React, { useState } from 'react';
import './QuizSection.css';

const QuizSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    answer: '',
  });

  const handleAddQuestion = () => {
    const { question, optionA, optionB, answer } = formData;

    if (!question.trim() || !optionA.trim() || !optionB.trim() || !answer.trim()) {
      alert('Please fill all fields');
      return;
    }

    const newQuestion = {
      question: question.trim(),
      optionA: optionA.trim(),
      optionB: optionB.trim(),
      answer: answer.trim(),
    };

    setQuestions([...questions, newQuestion]);
    setFormData({ question: '', optionA: '', optionB: '', answer: '' });
    setShowModal(false);
  };

  const handleDelete = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="quiz-section">
      <div className="quiz-header">
        <h2>Quiz & Certification</h2>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          Add Question
        </button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Options</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.length === 0 ? (
            <tr>
              <td colSpan="4">No questions added.</td>
            </tr>
          ) : (
            questions.map((q, idx) => (
              <tr key={idx}>
                <td>{q.question}</td>
                <td>
                  A: {q.optionA} <br />
                  B: {q.optionB}
                </td>
                <td>{q.answer}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(idx)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Question</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <label>Question:</label>
              <textarea
                name="question"
                placeholder="Enter the question..."
                value={formData.question}
                onChange={handleChange}
              ></textarea>

              <label>Option A:</label>
              <input
                type="text"
                name="optionA"
                placeholder="Enter option A"
                value={formData.optionA}
                onChange={handleChange}
              />

              <label>Option B:</label>
              <input
                type="text"
                name="optionB"
                placeholder="Enter option B"
                value={formData.optionB}
                onChange={handleChange}
              />

              <label>Correct Answer:</label>
              <select name="answer" value={formData.answer} onChange={handleChange}>
                <option value="">Select Answer</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleAddQuestion} className="primary-btn">
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSection;

