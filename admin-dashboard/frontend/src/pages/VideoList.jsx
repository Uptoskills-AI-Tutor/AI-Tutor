import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import VideoTable from '../components/VideoTable';
import AddVideoForm from '../components/AddVideoForm';

const VideoList = () => {
  const [filters, setFilters] = useState({
    search: '',
    level: '',
    topic: '',
    status: '',
  });

  const [refreshTable, setRefreshTable] = useState(false);

  const handleVideoAdded = () => {
    setRefreshTable(prev => !prev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Video List & Administration Panel</h1>

      {/* Add New Video Section */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>➕ Add New Course Video</h2>
        <AddVideoForm onVideoAdded={handleVideoAdded} />
      </section>

      <hr style={styles.divider} />

      {/* Filters Section */}
      <section style={styles.section}>
        <h2 style={styles.subheading}>🎛️ Filter Course Videos</h2>
        <FilterBar filters={filters} setFilters={setFilters} />
      </section>

      <hr style={styles.divider} />

      {/* Video Table */}
      <section style={styles.videoTableContainer}>
        <h2 style={styles.subheading}>📂 Video Records</h2>
        <VideoTable filters={filters} refresh={refreshTable} />
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.4rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: '30px',
  },
  subheading: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#222',
    marginBottom: '15px',
  },
  section: {
    backgroundColor: '#fff',
    padding: '20px',
    margin: '0 auto 30px auto',
    maxWidth: '1000px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  videoTableContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    margin: '0 auto 30px auto',
    maxWidth: '1000px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    minHeight: '400px',
  },
  divider: {
    maxWidth: '960px',
    margin: '0 auto 30px auto',
    borderTop: '1px solid #ccc',
  },
};

export default VideoList;
