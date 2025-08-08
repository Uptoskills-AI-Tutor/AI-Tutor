import  { useState } from 'react';

function PasswordSecurity() {
  const [current, setCurrent] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');

  const handleUpdate = () => {
    if (newPwd === confirm && newPwd.length >= 6) {
      setMsg('✅ Password updated successfully!');
      setCurrent('');
      setNewPwd('');
      setConfirm('');
    } else {
      setMsg('❌ Error: Passwords do not match or too short.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Change Password</h2>
      <input style={styles.input} type="password" placeholder="Current Password" value={current} onChange={(e) => setCurrent(e.target.value)} />
      <input style={styles.input} type="password" placeholder="New Password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
      <input style={styles.input} type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <button style={styles.button} onClick={handleUpdate}>Update Password</button>
      {msg && <p style={{ marginTop: '10px' }}>{msg}</p>}
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  heading: { fontSize: '20px', marginBottom: '10px' },
  input: { display: 'block', padding: '8px', width: '100%', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { backgroundColor: '#007bff', color: '#fff', padding: '8px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default PasswordSecurity;
