import React, { useEffect, useState } from "react";
import {
  getAllVideos,
  markVideoAsWatched,
  getWatchedVideos,
} from "../api/videoApi";

const VideoGallery = ({ userId }) => {
  const [videos, setVideos] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const allVideos = await getAllVideos();
        setVideos(allVideos);

        if (userId) {
          const watchedData = await getWatchedVideos(userId);
          const watchedVideoIds = watchedData.map((w) => w.videoId);
          setWatched(watchedVideoIds);
        } else {
          console.warn("User ID is missing");
        }
      } catch (err) {
        console.error("Error loading videos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [userId]);

  const handleMarkWatched = async (videoId) => {
    try {
      if (!userId) return;

      await markVideoAsWatched(userId, videoId);
      setWatched((prev) => (prev.includes(videoId) ? prev : [...prev, videoId]));
    } catch (err) {
      console.error("Failed to mark video as watched:", err);
    }
  };

  const getEmbedUrl = (url) => {
    const id = url?.split("v=")[1]?.split("&")[0] || url?.split("youtu.be/")[1];
    return id ? `https://www.youtube.com/embed/${id}` : "";
  };

  if (loading) return <p className="p-6">Loading videos...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📽️ Course Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div
            key={video._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold">{video.title}</h3>
            <p className="text-sm text-gray-600">
              {video.topic} • {video.level}
            </p>
            <iframe
              className="mt-2 w-full aspect-video"
              src={getEmbedUrl(video.videoUrl)}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="mt-2">
              {watched.includes(video._id) ? (
                <span className="text-green-600 font-medium">✅ Watched</span>
              ) : (
                <button
                  className="text-blue-600 underline"
                  onClick={() => handleMarkWatched(video._id)}
                >
                  Mark as Watched
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;








