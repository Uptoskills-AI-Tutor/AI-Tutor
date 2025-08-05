import  { useState } from 'react';

function NotificationSettings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('emailNotifs', String(emailNotifs));
    localStorage.setItem('smsNotifs', String(smsNotifs));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Notification Settings</h2>
      <label style={styles.checkbox}>
        <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
        Email Notifications
      </label>
      <label style={styles.checkbox}>
        <input type="checkbox" checked={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} />
        SMS Notifications
      </label>
      <button style={styles.button} onClick={handleSave}>Save Preferences</button>
      {saved && <p style={styles.success}>✔ Preferences saved</p>}
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  heading: { fontSize: '20px', marginBottom: '10px' },
  checkbox: { display: 'block', margin: '10px 0' },
  button: { backgroundColor: '#007bff', color: '#fff', padding: '8px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  success: { color: 'green', marginTop: '10px' },
};

export default NotificationSettings;
