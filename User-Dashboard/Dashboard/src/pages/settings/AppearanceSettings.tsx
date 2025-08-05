import { useState, useEffect } from 'react';

function AppearanceSettings() {
  const [theme, setTheme] = useState(() => localStorage.getItem('preferredTheme') || 'light');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const handleSave = () => {
    localStorage.setItem('preferredTheme', theme);
    applyTheme(theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Appearance Settings</h2>
      <label style={styles.label}>Theme:</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)} style={styles.select}>
        <option value="light">🌞 Light</option>
        <option value="dark">🌙 Dark</option>
      </select>
      <button onClick={handleSave} style={styles.button}>Save</button>
      {saved && <p style={styles.success}>✔ Preferences saved</p>}
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  heading: { fontSize: '20px', marginBottom: '10px' },
  label: { display: 'block', marginBottom: '6px' },
  select: { padding: '6px 12px', marginBottom: '10px', borderRadius: '4px' },
  button: { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 14px', cursor: 'pointer', borderRadius: '4px' },
  success: { color: 'green', marginTop: '10px' },
};

export default AppearanceSettings;
