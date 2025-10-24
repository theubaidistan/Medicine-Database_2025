// // import React, { useEffect, useState } from "react";
// // import API from "../api";
// // import "../styles/drugContraindication.css";

// // function DrugContraindicationDashboard() {
// //   const [contraindications, setContraindications] = useState([]);
// //   const [medicines, setMedicines] = useState([]);
// //   const [search1, setSearch1] = useState("");
// //   const [search2, setSearch2] = useState("");

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const [contraRes, medRes] = await Promise.all([
// //         API.get("/Drug_Contraindication"),
// //         API.get("/Medicines"),
// //       ]);
// //       setContraindications(contraRes.data);
// //       setMedicines(medRes.data);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   // Helper to get medicine name by ID
// //   const getMedName = (id) => {
// //     const med = medicines.find((m) => m.m_id === id);
// //     return med ? med.generic_name : "Unknown";
// //   };

// //   // Filter by two search boxes
// //   const filteredContraindications = contraindications.filter((item) => {
// //     const med1 = getMedName(item.m_id1).toLowerCase();
// //     const med2 = getMedName(item.m_id2).toLowerCase();

// //     const match1 = med1.includes(search1.toLowerCase());
// //     const match2 = med2.includes(search2.toLowerCase());

// //     // Match if either both searches empty, or both match
// //     if (!search1 && !search2) return true;
// //     if (search1 && !search2) return match1 || match2;
// //     if (!search1 && search2) return match1 || match2;
// //     return match1 && match2;
// //   });

// //   return (
// //     <div className="contra-container">
// //       <h2 className="title">Drug Contraindication Dashboard</h2>

// //       <div className="search-box">
// //         <input
// //           type="text"
// //           placeholder="Search by first generic name..."
// //           value={search1}
// //           onChange={(e) => setSearch1(e.target.value)}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Search by second generic name..."
// //           value={search2}
// //           onChange={(e) => setSearch2(e.target.value)}
// //         />
// //       </div>

// //       <table className="contra-table">
// //         <thead>
// //           <tr>
// //             <th>#</th>
// //             <th>Medicine 1</th>
// //             <th>Medicine 2</th>
// //             <th>Description</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredContraindications.length > 0 ? (
// //             filteredContraindications.map((item, index) => (
// //               <tr key={item.drug_contra_id}>
// //                 <td>{index + 1}</td>
// //                 <td>{getMedName(item.m_id1)}</td>
// //                 <td>{getMedName(item.m_id2)}</td>
// //                 <td>{item.description}</td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="4" style={{ textAlign: "center" }}>
// //                 No contraindications found.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default DrugContraindicationDashboard;

// // //---------------------------------------

// // // import React, { useEffect, useState } from "react";
// // // import API from "../api";
// // // import "../styles/drugContraindication.css";

// // // function DrugContraindicationDashboard() {
// // //   const [contraindications, setContraindications] = useState([]);
// // //   const [medicines, setMedicines] = useState([]);
// // //   const [search1, setSearch1] = useState("");
// // //   const [search2, setSearch2] = useState("");
// // //   const [selectedMedicine, setSelectedMedicine] = useState(null); // For modal

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   const fetchData = async () => {
// // //     try {
// // //       const [contraRes, medRes] = await Promise.all([
// // //         API.get("/Drug_Contraindication"),
// // //         API.get("/Medicines"),
// // //       ]);
// // //       setContraindications(contraRes.data);
// // //       setMedicines(medRes.data);
// // //     } catch (error) {
// // //       console.error("Error fetching data:", error);
// // //     }
// // //   };

// // //   // Helper to get medicine object by ID
// // //   const getMedicineById = (id) => medicines.find((m) => m.m_id === id);

// // //   const getMedName = (id) => {
// // //     const med = getMedicineById(id);
// // //     return med ? med.generic_name : "Unknown";
// // //   };

// // //   // Filter logic
// // //   const filteredContraindications = contraindications.filter((item) => {
// // //     const med1 = getMedName(item.m_id1).toLowerCase();
// // //     const med2 = getMedName(item.m_id2).toLowerCase();

// // //     const match1 = med1.includes(search1.toLowerCase());
// // //     const match2 = med2.includes(search2.toLowerCase());

// // //     if (!search1 && !search2) return true;
// // //     if (search1 && !search2) return match1 || match2;
// // //     if (!search1 && search2) return match1 || match2;
// // //     return match1 && match2;
// // //   });

// // //   // Handle modal close on background click
// // //   const closeModal = (e) => {
// // //     if (e.target.classList.contains("modal-overlay")) setSelectedMedicine(null);
// // //   };

// // //   return (
// // //     <div className="contra-container">
// // //       <h2 className="title">Drug Contraindication Dashboard</h2>

// // //       <div className="search-box">
// // //         <input
// // //           type="text"
// // //           placeholder="Search by first generic name..."
// // //           value={search1}
// // //           onChange={(e) => setSearch1(e.target.value)}
// // //         />
// // //         <input
// // //           type="text"
// // //           placeholder="Search by second generic name..."
// // //           value={search2}
// // //           onChange={(e) => setSearch2(e.target.value)}
// // //         />
// // //       </div>

// // //       <table className="contra-table">
// // //         <thead>
// // //           <tr>
// // //             <th>#</th>
// // //             <th>Medicine 1</th>
// // //             <th>Medicine 2</th>
// // //             <th>Description</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {filteredContraindications.length > 0 ? (
// // //             filteredContraindications.map((item, index) => (
// // //               <tr key={item.drug_contra_id}>
// // //                 <td>{index + 1}</td>
// // //                 <td
// // //                   className="clickable"
// // //                   onClick={() =>
// // //                     setSelectedMedicine(getMedicineById(item.m_id1))
// // //                   }
// // //                 >
// // //                   {getMedName(item.m_id1)}
// // //                 </td>
// // //                 <td
// // //                   className="clickable"
// // //                   onClick={() =>
// // //                     setSelectedMedicine(getMedicineById(item.m_id2))
// // //                   }
// // //                 >
// // //                   {getMedName(item.m_id2)}
// // //                 </td>
// // //                 <td>{item.description}</td>
// // //               </tr>
// // //             ))
// // //           ) : (
// // //             <tr>
// // //               <td colSpan="4" style={{ textAlign: "center" }}>
// // //                 No contraindications found.
// // //               </td>
// // //             </tr>
// // //           )}
// // //         </tbody>
// // //       </table>

// // //       {/* Modal for medicine details */}
// // //       {selectedMedicine && (
// // //         <div className="modal-overlay" onClick={closeModal}>
// // //           <div className="modal-content">
// // //             <h3>{selectedMedicine.m_name}</h3>
// // //             <p>
// // //               <strong>Generic Name:</strong> {selectedMedicine.generic_name}
// // //             </p>
// // //             <p>
// // //               <strong>Description:</strong> {selectedMedicine.m_description}
// // //             </p>
// // //             <p>
// // //               <strong>For Children:</strong>{" "}
// // //               {selectedMedicine.m_for_children ? "Yes" : "No"}
// // //             </p>
// // //             <p>
// // //               <strong>Gender:</strong> {selectedMedicine.gender}
// // //             </p>
// // //             <p>
// // //               <strong>Category ID:</strong> {selectedMedicine.c_id}
// // //             </p>
// // //             <button onClick={() => setSelectedMedicine(null)}>Close</button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default DrugContraindicationDashboard;

// import React, { useEffect, useState } from "react";
// import API from "../api";
// import "../styles/drugContraindication.css";

// function DrugContraindicationDashboard() {
//   const [contraindications, setContraindications] = useState([]);
//   const [medicines, setMedicines] = useState([]);
//   const [search1, setSearch1] = useState("");
//   const [search2, setSearch2] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [contraRes, medRes] = await Promise.all([
//         API.get("/Drug_Contraindication"),
//         API.get("/Medicines"),
//       ]);
//       setContraindications(contraRes.data);
//       setMedicines(medRes.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Helper to get medicine name by ID
//   const getMedName = (id) => {
//     const med = medicines.find((m) => m.m_id === id);
//     return med ? med.generic_name : "Unknown";
//   };

//   // ✅ Fixed search filter logic
//   const filteredContraindications = contraindications.filter((item) => {
//     const med1 = getMedName(item.m_id1).toLowerCase();
//     const med2 = getMedName(item.m_id2).toLowerCase();
//     const s1 = search1.toLowerCase();
//     const s2 = search2.toLowerCase();

//     if (!s1 && !s2) return true; // No search filters

//     if (s1 && !s2) return med1.includes(s1);
//     if (!s1 && s2) return med1.includes(s2);

//     // When both searches entered → match in either order
//     return (
//       (med1.includes(s1) && med2.includes(s2)) ||
//       (med1.includes(s2) && med2.includes(s1))
//     );
//   });

//   return (
//     <div className="contra-container">
//       <h2 className="title">Drug Contraindication Dashboard</h2>

//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Search by first generic name..."
//           value={search1}
//           onChange={(e) => setSearch1(e.target.value.trimStart())}
//         />
//         <input
//           type="text"
//           placeholder="Search by second generic name..."
//           value={search2}
//           onChange={(e) => setSearch2(e.target.value.trimStart())}
//         />
//       </div>

//       <table className="contra-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Medicine 1</th>
//             <th>Medicine 2</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredContraindications.length > 0 ? (
//             filteredContraindications.map((item, index) => (
//               <tr key={item.drug_contra_id}>
//                 <td>{index + 1}</td>
//                 <td>{getMedName(item.m_id1)}</td>
//                 <td>{getMedName(item.m_id2)}</td>
//                 <td>{item.description}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" style={{ textAlign: "center" }}>
//                 No contraindications found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default DrugContraindicationDashboard;

//-----------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import API from "../api";
import "../styles/drugContraindication.css";

function DrugContraindicationDashboard() {
  const [contraindications, setContraindications] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contraRes, medRes] = await Promise.all([
        API.get("/Drug_Contraindication"),
        API.get("/Medicines"),
      ]);
      setContraindications(contraRes.data);
      setMedicines(medRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Helper: get medicine generic name by ID
  const getMedName = (id) => {
    const med = medicines.find((m) => m.m_id === id);
    return med ? med.generic_name : "Unknown";
  };

  // ✅ Flexible 2-way search filter
  const filteredContraindications = contraindications.filter((item) => {
    const med1 = getMedName(item.m_id1).toLowerCase();
    const med2 = getMedName(item.m_id2).toLowerCase();
    const s1 = search1.toLowerCase();
    const s2 = search2.toLowerCase();

    if (!s1 && !s2) return true;
    if (s1 && !s2) return med1.includes(s1) || med2.includes(s1);
    if (!s1 && s2) return med1.includes(s2) || med2.includes(s2);

    return (
      (med1.includes(s1) && med2.includes(s2)) ||
      (med1.includes(s2) && med2.includes(s1))
    );
  });

  return (
    <div className="contra-container">
      <h2 className="title">Drug Contraindication Dashboard</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by first generic name..."
          value={search1}
          onChange={(e) => setSearch1(e.target.value.trimStart())}
        />
        <input
          type="text"
          placeholder="Search by second generic name..."
          value={search2}
          onChange={(e) => setSearch2(e.target.value.trimStart())}
        />
      </div>

      <table className="contra-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Medicine 1</th>
            <th>Medicine 2</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredContraindications.length > 0 ? (
            filteredContraindications.map((item, index) => (
              <tr key={item.drug_contra_id}>
                <td>{index + 1}</td>
                <td>{getMedName(item.m_id1)}</td>
                <td>{getMedName(item.m_id2)}</td>
                <td>{item.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No contraindications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DrugContraindicationDashboard;
