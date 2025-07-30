import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideos } from "../api/VideoApi";

export default function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideos(); // assumes response = { videos: [...], total: N }
        const found = response.videos.find((v) => v._id === id);
        if (found) {
          setVideo(found);
        } else {
          setError("⚠ Video not found.");
        }
      } catch (err) {
        console.error("Failed to fetch video:", err);
        setError("❌ Error loading video.");
      }
    };
    fetchVideo();
  }, [id]);

  // Convert YouTube URL to embeddable format
  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/
    );
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  if (error) return <div style={styles.error}>{error}</div>;
  if (!video) return <p style={styles.loading}>Loading video...</p>;

  const embedUrl = getYouTubeEmbedUrl(video.videoUrl);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{video.title}</h1>

      {video.videoUrl ? (
        embedUrl ? (
          <div style={styles.embedWrapper}>
            <iframe
              src={embedUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={styles.iframe}
            ></iframe>
          </div>
        ) : (
          <video controls width="100%" style={styles.video}>
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        <p style={styles.warning}>⚠ No video URL provided.</p>
      )}

      <div style={styles.meta}>
        <p><strong>Description:</strong> {video.description}</p>
        <p><strong>Level:</strong> {video.level}</p>
        <p><strong>Topic:</strong> {video.topic}</p>
        <p><strong>Status:</strong> {video.status}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "30px",
    color: "#333",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center"
  },
  video: {
    marginBottom: "20px",
    borderRadius: "10px",
    outline: "none"
  },
  embedWrapper: {
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    marginBottom: "20px",
    borderRadius: "10px",
    overflow: "hidden"
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none"
  },
  meta: {
    fontSize: "1rem",
    lineHeight: "1.6"
  },
  loading: {
    textAlign: "center",
    marginTop: "50px"
  },
  error: {
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "50px"
  },
  warning: {
    color: "#d97706",
    fontStyle: "italic",
    marginBottom: "15px"
  }
};
