// src/components/VideoTable.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVideos, deleteVideo, updateVideo } from "../api/VideoApi";
import QuickEditModal from "./QuickEditModal";

export default function VideoTable({ filters = {}, searchQuery = "" }) {
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [selected, setSelected] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getVideos(filters);
        const list = Array.isArray(res) ? res : res?.videos ?? [];
        setVideos(list);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const applySorting = (arr) => {
    if (!sortConfig.key) return arr;
    const { key, direction } = sortConfig;
    return [...arr].sort((a, b) => {
      const valA = (a?.[key] ?? "").toString().toLowerCase();
      const valB = (b?.[key] ?? "").toString().toLowerCase();
      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredVideos = useMemo(() => {
    const list = Array.isArray(videos) ? videos : [];
    return applySorting(list);
  }, [videos, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const isAsc = prev.key === key && prev.direction === "asc";
      return { key, direction: isAsc ? "desc" : "asc" };
    });
  };

  const handleEdit = (video) => setEditingVideo(video);

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      await deleteVideo(id);
      setVideos((prev) => prev.filter((v) => v._id !== id));
      setSelected((prev) => prev.filter((vid) => vid !== id));
    }
  };

  const handleBulkDelete = async () => {
    if (!selected.length) return;
    if (window.confirm(`Delete ${selected.length} selected videos?`)) {
      for (const id of selected) await deleteVideo(id);
      setVideos((prev) => prev.filter((v) => !selected.includes(v._id)));
      setSelected([]);
    }
  };

  const handleBulkApprove = async () => {
    for (const id of selected) {
      const current = videos.find((v) => v._id === id);
      if (current && current.status !== "Approved") {
        const res = await updateVideo(id, { ...current, status: "Approved" });
        setVideos((prev) => prev.map((v) => (v._id === id ? res : v)));
      }
    }
    setSelected([]);
  };

  const handleUpdate = async (updatedVideo) => {
    const res = await updateVideo(updatedVideo._id, updatedVideo);
    setVideos((prev) => prev.map((vid) => (vid._id === res._id ? res : vid)));
    setEditingVideo(null);
  };

  // ✅ FIXED LINE HERE
  const handleOpen = (id) => navigate(`/video/${id}`);

  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f0ad4e";
      case "Approved":
        return "#5cb85c";
      case "Rejected":
        return "#d9534f";
      default:
        return "#6c757d";
    }
  };

  return (
    <div style={styles.tableContainer}>
      <h2 style={styles.title}>🎞 Videos Watched</h2>

      {loading && <div style={{ color: "#000" }}>Loading...</div>}
      {error && (
        <div
          style={{
            color: "#d9534f",
            background: "#fdecea",
            border: "1px solid #f5c6cb",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {selected.length > 0 && (
            <div style={styles.bulkActions}>
              <strong>{selected.length} selected</strong>
              <button style={styles.bulkBtn} onClick={handleBulkDelete}>
                🗑 Delete Selected
              </button>
              <button style={styles.bulkBtn} onClick={handleBulkApprove}>
                ✅ Approve Selected
              </button>
            </div>
          )}

          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th />
                <th style={styles.th} onClick={() => handleSort("title")}>
                  Title {renderSortArrow("title")}
                </th>
                <th style={styles.th} onClick={() => handleSort("description")}>
                  Description {renderSortArrow("description")}
                </th>
                <th style={styles.th} onClick={() => handleSort("level")}>
                  Level {renderSortArrow("level")}
                </th>
                <th style={styles.th} onClick={() => handleSort("topic")}>
                  Topic {renderSortArrow("topic")}
                </th>
                <th style={styles.th} onClick={() => handleSort("status")}>
                  Status {renderSortArrow("status")}
                </th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.length ? (
                filteredVideos.map((video) => (
                  <tr key={video._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(video._id)}
                        onChange={() => toggleSelect(video._id)}
                      />
                    </td>
                    <td style={styles.td}>{video.title}</td>
                    <td style={styles.td}>{video.description}</td>
                    <td style={styles.td}>{video.level}</td>
                    <td style={styles.td}>{video.topic}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: getStatusColor(video.status),
                        }}
                      >
                        {video.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn} onClick={() => handleEdit(video)}>
                        ✏ Edit
                      </button>
                      <button
                        style={{ ...styles.actionBtn, backgroundColor: "#d9534f" }}
                        onClick={() => handleDelete(video._id)}
                      >
                        🗑 Delete
                      </button>
                      <button
                        style={{ ...styles.actionBtn, backgroundColor: "#0275d8" }}
                        onClick={() => handleOpen(video._id)}
                      >
                        📂 Open
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    No videos found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {editingVideo && (
        <QuickEditModal
          video={editingVideo}
          onClose={() => setEditingVideo(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

const styles = {
  tableContainer: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  bulkActions: {
    marginBottom: "15px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    color: "#000",
  },
  bulkBtn: {
    backgroundColor: "#444",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "#000",
  },
  thead: {
    backgroundColor: "#f5f5f5",
    textAlign: "left",
  },
  th: {
    padding: "10px",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    color: "#000",
  },
  actionBtn: {
    marginRight: "8px",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#5bc0de",
    color: "#fff",
    cursor: "pointer",
  },
  statusBadge: {
    padding: "5px 10px",
    borderRadius: "12px",
    color: "#fff",
    fontWeight: "bold",
  },
};
