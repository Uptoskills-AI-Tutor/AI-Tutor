import React, { useEffect, useState } from 'react';
import { MessageCircle, Users, Clock } from 'lucide-react';

const DiscussionOverview = () => {
  const [threadCount, setThreadCount] = useState(0);
  const [recentThread, setRecentThread] = useState(null);
  const [userCount, setUserCount] = useState(0); // Optional: if you're tracking unique authors

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/discussions');
        const data = await res.json();
        setThreadCount(data.length);
        setRecentThread(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
        );
        const uniqueAuthors = [...new Set(data.map((t) => t.author))];
        setUserCount(uniqueAuthors.length);
      } catch (err) {
        console.error('Failed to fetch discussion data:', err);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm text-gray-900">
      <h2 className="text-lg font-semibold mb-4">Discussion Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-3">
          <MessageCircle className="text-blue-500" />
          <div>
            <p className="text-gray-500">Total Threads</p>
            <p className="text-lg font-bold">{threadCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="text-green-500" />
          <div>
            <p className="text-gray-500">Active Users</p>
            <p className="text-lg font-bold">{userCount}</p>
          </div>
        </div>

        {recentThread && (
          <div className="flex items-center gap-3">
            <Clock className="text-purple-500" />
            <div>
              <p className="text-gray-500">Latest Topic</p>
              <p className="font-medium">{recentThread.title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionOverview;
