import React from "react";
import "../styles/logoutdashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <div className="card">
        <h1>Welcome, {user?.name} 👋</h1>
        <p>Email: {user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
