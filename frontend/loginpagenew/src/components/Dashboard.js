import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          window.location.href = "/login";
        }
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.displayName || user.username}!</p>
          <img src={user.photos?.[0]?.value} alt="User avatar" width="100" />
          <p><strong>GitHub ID:</strong> {user.id}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
