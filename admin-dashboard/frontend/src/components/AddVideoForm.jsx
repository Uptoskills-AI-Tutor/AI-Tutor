import React, { useState } from "react";
import { createVideo } from "../api/VideoApi";

export default function AddVideoForm({ onVideoAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "Beginner",
    topic: "Frontend",
    status: "Pending",
    videoUrl: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isYouTubeUrl = (url) => {
    const re =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)?[\w-]{6,}/i;
    return re.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      videoUrl: formData.videoUrl.trim(),
    };

    if (!isYouTubeUrl(payload.videoUrl)) {
      setError("⚠️ Please enter a valid YouTube video URL.");
      return;
    }

    setSubmitting(true);

    try {
      const created = await createVideo(payload);
      console.log("✅ Video created:", created);
      alert("✅ Video added successfully!");
      if (onVideoAdded) onVideoAdded(); // refresh VideoTable
      handleReset();
    } catch (err) {
      console.error("❌ Error while creating video:", err);
      setError(
        err?.response?.data?.message ||
          err.message ||
          "❌ Failed to add video. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      level: "Beginner",
      topic: "Frontend",
      status: "Pending",
      videoUrl: "",
    });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>Title</label>
      <input
        name="title"
        placeholder="Video Title"
        value={formData.title}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <label style={styles.label}>Description</label>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        style={{ ...styles.input, height: "80px", resize: "vertical" }}
      />

      <label style={styles.label}>Topic</label>
      <select
        name="topic"
        value={formData.topic}
        onChange={handleChange}
        style={styles.input}
      >
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Database">Database</option>
        <option value="DevOps">DevOps</option>
      </select>

      <label style={styles.label}>Level</label>
      <select
        name="level"
        value={formData.level}
        onChange={handleChange}
        style={styles.input}
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <label style={styles.label}>Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        style={styles.input}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      <label style={styles.label}>YouTube URL</label>
      <input
        name="videoUrl"
        placeholder="https://www.youtube.com/watch?v=..."
        value={formData.videoUrl}
        onChange={handleChange}
        required
        style={styles.input}
      />

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.buttonRow}>
        <button
          type="button"
          onClick={handleReset}
          disabled={submitting}
          style={styles.resetBtn}
        >
          ↺ Reset
        </button>
        <button type="submit" disabled={submitting} style={styles.button}>
          {submitting ? "Adding..." : "➕ Add Video"}
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  label: {
    fontWeight: 600,
    fontSize: "0.95rem",
    marginTop: "8px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    outline: "none",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "12px",
  },
  button: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 600,
  },
  resetBtn: {
    backgroundColor: "#f1f1f1",
    color: "#333",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 600,
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #f5c6cb",
    fontSize: "0.9rem",
  },
};

