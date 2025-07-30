import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDoubtPanel = ({ darkMode, refreshPendingCount }) => {
  const [doubts, setDoubts] = useState([]);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState({});
  const [sending, setSending] = useState({});
  const [deleting, setDeleting] = useState({});

  // Fetch pending doubts from backend
  const fetchPendingDoubts = async () => {
    try {
      const res = await axios.get('/api/doubts/pending');

      // ✅ DEBUG LOG: Check what's coming from backend
      console.log('📦 Response from /api/doubts/pending:', res.data);

      setDoubts(res.data);
      setError(null);
    } catch (err) {
      setError('❌ Failed to fetch doubts');
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchPendingDoubts();
  }, []);

  const handleResponseChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const sendResponse = async (doubtId) => {
    const responseText = responses[doubtId]?.trim();
    if (!responseText) {
      alert('❗ Please type a response before sending.');
      return;
    }

    setSending((prev) => ({ ...prev, [doubtId]: true }));

    try {
      await axios.post('/api/doubts/respond', {
        doubtId,
        response: responseText,
      });

      alert('✅ Response sent successfully!');
      setResponses((prev) => ({ ...prev, [doubtId]: '' }));

      await fetchPendingDoubts();

      if (refreshPendingCount) refreshPendingCount();
    } catch (err) {
      console.error('❌ Error sending response:', err);
      alert('❌ Failed to send response. Try again.');
    } finally {
      setSending((prev) => ({ ...prev, [doubtId]: false }));
    }
  };

  const deleteDoubt = async (doubtId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this doubt?');
    if (!confirmDelete) return;

    setDeleting((prev) => ({ ...prev, [doubtId]: true }));

    try {
      await axios.delete(`/api/doubts/${doubtId}`);
      alert('🗑️ Doubt deleted successfully');
      setDoubts((prev) => prev.filter((d) => d._id !== doubtId));

      if (refreshPendingCount) refreshPendingCount();
    } catch (err) {
      console.error('❌ Error deleting doubt:', err?.response?.data || err.message);
      alert('❌ Failed to delete doubt. Try again.');
    } finally {
      setDeleting((prev) => ({ ...prev, [doubtId]: false }));
    }
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
      <h2 className="text-2xl font-bold mb-4">📥 Pending Doubts</h2>
      {error && <p className="text-red-600">{error}</p>}

      {doubts.length === 0 ? (
        <p className="text-gray-500">No pending doubts at the moment.</p>
      ) : (
        <div className="space-y-6">
          {doubts.map((doubt) => (
            <div key={doubt._id} className={`p-4 rounded shadow-md relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Delete Button */}
              <button
                onClick={() => deleteDoubt(doubt._id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                disabled={deleting[doubt._id]}
                title="Delete doubt"
              >
                {deleting[doubt._id] ? '⏳' : '🗑️'}
              </button>

              <p><strong>👤 Name:</strong> {doubt.username}</p>
              <p><strong>📧 Email:</strong> {doubt.email}</p>
              <p><strong>📘 Course:</strong> {doubt.courseTitle}</p>
              <p><strong>❓ Doubt:</strong> {doubt.doubtText}</p>
              <p><strong>📌 Status:</strong> ⏳ Pending</p>

              {/* Response Box */}
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded text-black"
                  placeholder="Type your response..."
                  value={responses[doubt._id] || ''}
                  onChange={(e) => handleResponseChange(doubt._id, e.target.value)}
                />
                <button
                  onClick={() => sendResponse(doubt._id)}
                  className="mt-2 bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
                  disabled={sending[doubt._id]}
                >
                  {sending[doubt._id] ? 'Sending...' : 'Send Response'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDoubtPanel;
