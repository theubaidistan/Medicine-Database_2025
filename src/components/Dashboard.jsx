// import React, { useState } from "react";
// import MedicineDashboard from "./MedicineDashboard";
// import DiseaseContraindicationDashboard from "./DiseaseContraindicationDashboard";
// import "../styles/dashboard.css";

// function Dashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [activeTab, setActiveTab] = useState("medicines");

//   return (
//     <div className="dashboard-container">
//       {/* Header */}
//       <header className="dashboard-header">
//         <h2>Welcome, {user?.username || "Drug Inspector"}</h2>
//         <button
//           className="logout-btn"
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/";
//           }}
//         >
//           Logout
//         </button>
//       </header>

//       {/* Navigation Tabs */}
//       <nav className="dashboard-nav">
//         <button
//           className={activeTab === "medicines" ? "active" : ""}
//           onClick={() => setActiveTab("medicines")}
//         >
//           💊 Medicines
//         </button>
//         <button
//           className={activeTab === "contraindications" ? "active" : ""}
//           onClick={() => setActiveTab("contraindications")}
//         >
//           ⚠️ Contraindications
//         </button>
//       </nav>

//       {/* Content Area */}
//       <main className="dashboard-content">
//         {activeTab === "medicines" && <MedicineDashboard />}
//         {activeTab === "contraindications" && (
//           <DiseaseContraindicationDashboard />
//         )}
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

// ---------------------------------------

import React, { useState } from "react";
import MedicineDashboard from "./MedicineDashboard";
import DiseaseContraindicationDashboard from "./DiseaseContraindicationDashboard";
import DrugContraindicationDashboard from "./DrugContraindicationDashboard";
import "../styles/dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("medicines");

  // Menu items for Drug Inspector
  const menuItems = [
    { key: "medicines", label: "💊 Medicines" },
    { key: "disease_contra", label: "🧬 Disease Contraindications" },
    { key: "drug_contra", label: "⚠️ Drug Contraindications" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "medicines":
        return <MedicineDashboard />;
      case "disease_contra":
        return <DiseaseContraindicationDashboard />;
      case "drug_contra":
        return <DrugContraindicationDashboard />;
      case "reports":
        return (
          <div className="placeholder">
            <h3>📑 Reports & Approvals</h3>
            <p>View and approve medicine data or pending verifications.</p>
          </div>
        );
      case "profile":
        return (
          <div className="placeholder">
            <h3>👤 Profile Settings</h3>
            <p>Update your profile or change password.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Menu */}
      <aside className="sidebar">
        <div className="user-info">
          <h3>{user?.username || "Drug Inspector"}</h3>
          <p>{user?.email}</p>
        </div>

        <nav className="menu">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={
                activeTab === item.key ? "menu-btn active" : "menu-btn"
              }
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="content">{renderContent()}</main>
    </div>
  );
}

export default Dashboard;
