// src/components/dashboard/VideoSummary.jsx
import React, { useEffect, useState } from "react";
import { getAllVideos, getWatchedVideos } from "../../api/videoApi";
import { useUser } from "../../context/UserContext";

export default function VideoSummary() {
  const { user } = useUser();
  const [total, setTotal] = useState(0);
  const [watched, setWatched] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchData = async () => {
      setLoading(true);
      const allVideos = await getAllVideos();
      const watchedVideos = await getWatchedVideos(user._id);
      setTotal(allVideos.length);
      setWatched(watchedVideos.length);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const progress = total > 0 ? Math.round((watched / total) * 100) : 0;

  if (loading) return <div className="p-4">Loading video summary...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h2 className="text-xl font-semibold mb-2">📊 Video Progress Summary</h2>
      <p className="text-gray-600 mb-1">
        Watched <strong>{watched}</strong> of <strong>{total}</strong> videos
      </p>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{progress}% completed</p>
    </div>
  );
}
