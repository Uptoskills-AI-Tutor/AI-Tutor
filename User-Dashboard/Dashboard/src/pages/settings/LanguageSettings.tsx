import { useState } from 'react';

function LanguageSettings() {
  const [lang, setLang] = useState(localStorage.getItem('language') || 'English');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('language', lang);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Language Settings</h2>
      <select style={styles.select} value={lang} onChange={(e) => setLang(e.target.value)}>
        <option>English</option>
        <option>Hindi</option>
        <option>French</option>
        <option>Spanish</option>
      </select>
      <button style={styles.button} onClick={handleSave}>Save Language</button>
      {saved && <p style={styles.success}>✔ Language saved</p>}
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  heading: { fontSize: '20px', marginBottom: '10px' },
  select: { padding: '8px', marginBottom: '10px', width: '100%', borderRadius: '4px' },
  button: { backgroundColor: '#007bff', color: '#fff', padding: '8px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  success: { color: 'green', marginTop: '10px' },
};

export default LanguageSettings;
