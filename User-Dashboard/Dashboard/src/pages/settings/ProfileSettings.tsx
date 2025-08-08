import  { useState } from 'react';

function ProfileSettings() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile Settings</h2>
      <label style={styles.label}>Name:</label>
      <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
      <label style={styles.label}>Email:</label>
      <input style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
      <button style={styles.button} onClick={handleSave}>Save Changes</button>
      {saved && <p style={styles.success}>✔ Profile updated</p>}
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  heading: { fontSize: '20px', marginBottom: '10px' },
  label: { display: 'block', margin: '10px 0 5px' },
  input: { padding: '8px', width: '100%', borderRadius: '4px', marginBottom: '10px', border: '1px solid #ccc' },
  button: { backgroundColor: '#007bff', color: '#fff', padding: '8px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  success: { color: 'green', marginTop: '10px' },
};

export default ProfileSettings;
