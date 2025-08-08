import React, { useState, useEffect } from 'react';

const FilterBar = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(localFilters);
  };

  const handleClear = () => {
    const cleared = {
      search: '',
      level: '',
      topic: '',
      status: '',
    };
    setLocalFilters(cleared);
    setFilters(cleared);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.filterContainer}>
      <input
        type="text"
        name="search"
        placeholder="🔍 Search title or description"
        value={localFilters.search}
        onChange={handleChange}
        style={styles.input}
      />

      <select
        name="level"
        value={localFilters.level}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">📚 All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <select
        name="topic"
        value={localFilters.topic}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">📁 All Topics</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="DevOps">DevOps</option>
        <option value="Database">Database</option>
      </select>

      <select
        name="status"
        value={localFilters.status}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="">📄 All Status</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button type="submit" style={styles.buttonPrimary}>
        ✅ Apply
      </button>

      <button
        type="button"
        onClick={handleClear}
        style={styles.buttonDanger}
      >
        🧹 Clear
      </button>
    </form>
  );
};

const baseField = {
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #bdbdbd',
  minWidth: '160px',
  fontSize: '0.95rem',
  backgroundColor: '#ffffff',
  color: '#111111',
};

const baseButton = {
  padding: '8px 14px',
  borderRadius: '6px',
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '0.95rem',
};

const styles = {
  filterContainer: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    ...baseField,
    minWidth: '220px',
  },
  select: {
    ...baseField,
  },
  buttonPrimary: {
    ...baseButton,
    backgroundColor: '#0d6efd',
    color: '#ffffff',
  },
  buttonDanger: {
    ...baseButton,
    backgroundColor: '#dc3545',
    color: '#ffffff',
  },
};

export default FilterBar;
