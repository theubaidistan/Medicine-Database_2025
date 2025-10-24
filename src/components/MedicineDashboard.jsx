// // import React, { useState, useEffect, useRef } from "react";
// // import "../styles/medicineDashboard.css";
// // // MedicineDashboard.jsx
// // // Single-file React component for a Medicine Dashboard
// // // - Tailwind CSS classes used for styling (no Tailwind import here)
// // // - Default export React component
// // // - Features: debounced autocomplete search (by generic or brand), results dropdown,
// // //   medicines table with category, create/edit/delete via modal form, basic validation
// // // - API expectations (change `API_BASE` if needed):
// // //   GET  api/Medicines/WithCategory                     -> list with category
// // //   GET  api/Medicines/SearchByGeneric?name=paracetamol -> search by generic
// // //   GET  api/Medicines/SearchByBrand?name=panadol       -> search by brand
// // //   GET  api/Medicines/{id}                            -> get single (already in API controller)
// // //   POST api/Medicines                                 -> create medicine
// // //   PUT  api/Medicines/{id}                            -> update medicine
// // //   DELETE api/Medicines/{id}                          -> delete medicine

// // const API_BASE = process.env.REACT_APP_API_BASE || "https://localhost:44367/"; // adjust to your API

// // function useDebounce(value, delay) {
// //   const [debounced, setDebounced] = useState(value);
// //   useEffect(() => {
// //     const t = setTimeout(() => setDebounced(value), delay);
// //     return () => clearTimeout(t);
// //   }, [value, delay]);
// //   return debounced;
// // }

// // export default function MedicineDashboard() {
// //   const [query, setQuery] = useState("");
// //   const debouncedQuery = useDebounce(query, 300);

// //   const [suggestions, setSuggestions] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);

// //   const [medicines, setMedicines] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const [editing, setEditing] = useState(null); // medicine being edited
// //   const [modalOpen, setModalOpen] = useState(false);

// //   const inputRef = useRef(null);

// //   // Load all medicines with category on mount
// //   useEffect(() => {
// //     fetchAll();
// //   }, []);

// //   async function fetchAll() {
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`${API_BASE}api/Medicines/WithCategory`);
// //       if (!res.ok) throw new Error(`Server returned ${res.status}`);
// //       const data = await res.json();
// //       setMedicines(data);
// //     } catch (e) {
// //       console.error(e);
// //       setError("Failed to load medicines.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   // Autocomplete / search suggestions using debounced query
// //   useEffect(() => {
// //     if (!debouncedQuery || debouncedQuery.length < 1) {
// //       setSuggestions([]);
// //       setShowSuggestions(false);
// //       return;
// //     }

// //     // try searching generic first, fallback to brand
// //     let cancelled = false;
// //     (async () => {
// //       try {
// //         const q = encodeURIComponent(debouncedQuery);
// //         const res = await fetch(
// //           `${API_BASE}api/Medicines/SearchByGeneric?name=${q}`
// //         );
// //         if (!res.ok) {
// //           // try brand search
// //           const res2 = await fetch(
// //             `${API_BASE}api/Medicines/SearchByBrand?name=${q}`
// //           );
// //           if (!res2.ok) throw new Error("Search failed");
// //           const bdata = await res2.json();
// //           if (!cancelled) {
// //             setSuggestions(bdata);
// //             setShowSuggestions(true);
// //           }
// //         } else {
// //           const gdata = await res.json();
// //           if (!cancelled) {
// //             setSuggestions(gdata);
// //             setShowSuggestions(true);
// //           }
// //         }
// //       } catch (e) {
// //         console.error(e);
// //       }
// //     })();

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [debouncedQuery]);

// //   function onSelectSuggestion(item) {
// //     // fill input, hide suggestions, and fetch table filtered by generic/brand
// //     setQuery(item.generic_name || item.m_name);
// //     setShowSuggestions(false);
// //     // Optionally filter main table to this specific medicine
// //     setMedicines([item]);
// //   }

// //   // CRUD helpers
// //   async function createOrUpdate(medicine) {
// //     const method = medicine.m_id ? "PUT" : "POST";
// //     const url = medicine.m_id
// //       ? `${API_BASE}api/Medicines/${medicine.m_id}`
// //       : `${API_BASE}api/Medicines`;
// //     const body = JSON.stringify(medicine);
// //     try {
// //       const res = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body,
// //       });
// //       if (!res.ok) throw new Error(`Server ${res.status}`);
// //       // refresh
// //       await fetchAll();
// //       setModalOpen(false);
// //       setEditing(null);
// //     } catch (e) {
// //       console.error(e);
// //       alert("Save failed: " + e.message);
// //     }
// //   }

// //   async function removeMedicine(id) {
// //     if (!window.confirm("Delete this medicine?")) return;
// //     try {
// //       const res = await fetch(`${API_BASE}api/Medicines/${id}`, {
// //         method: "DELETE",
// //       });
// //       if (!res.ok) throw new Error("Delete failed");
// //       await fetchAll();
// //     } catch (e) {
// //       console.error(e);
// //       alert("Delete failed: " + e.message);
// //     }
// //   }

// //   function openCreate() {
// //     setEditing({
// //       m_name: "",
// //       generic_name: "",
// //       m_description: "",
// //       m_for_children: false,
// //       c_id: 1,
// //       gender: "Both",
// //     });
// //     setModalOpen(true);
// //   }

// //   function openEdit(m) {
// //     // map Category details if present
// //     const model = {
// //       m_id: m.m_id,
// //       m_name: m.m_name,
// //       generic_name: m.generic_name,
// //       m_description: m.m_description,
// //       m_for_children: m.m_for_children,
// //       c_id: m.Category ? m.Category.c_id : m.c_id,
// //       gender: m.gender,
// //     };
// //     setEditing(model);
// //     setModalOpen(true);
// //   }

// //   // Simple form component inside the file
// //   function MedicineForm({ model, onChange, onSubmit, onCancel }) {
// //     if (!model) return null;
// //     return (
// //       <form
// //         onSubmit={(e) => {
// //           e.preventDefault();
// //           onSubmit(model);
// //         }}
// //       >
// //         <div className="space-y-2">
// //           <label className="block">
// //             <span className="text-sm">Brand name</span>
// //             <input
// //               required
// //               value={model.m_name}
// //               onChange={(e) => onChange({ ...model, m_name: e.target.value })}
// //               className="mt-1 block w-full rounded-md border p-2"
// //             />
// //           </label>

// //           <label className="block">
// //             <span className="text-sm">Generic name</span>
// //             <input
// //               required
// //               value={model.generic_name}
// //               onChange={(e) =>
// //                 onChange({ ...model, generic_name: e.target.value })
// //               }
// //               className="mt-1 block w-full rounded-md border p-2"
// //             />
// //           </label>

// //           <label className="block">
// //             <span className="text-sm">Description</span>
// //             <textarea
// //               value={model.m_description}
// //               onChange={(e) =>
// //                 onChange({ ...model, m_description: e.target.value })
// //               }
// //               className="mt-1 block w-full rounded-md border p-2"
// //             />
// //           </label>

// //           <label className="inline-flex items-center">
// //             <input
// //               type="checkbox"
// //               checked={!!model.m_for_children}
// //               onChange={(e) =>
// //                 onChange({ ...model, m_for_children: e.target.checked })
// //               }
// //             />
// //             <span className="ml-2">Suitable for children</span>
// //           </label>

// //           <label className="block">
// //             <span className="text-sm">Category ID</span>
// //             <input
// //               type="number"
// //               value={model.c_id}
// //               onChange={(e) =>
// //                 onChange({ ...model, c_id: Number(e.target.value) })
// //               }
// //               className="mt-1 block w-full rounded-md border p-2"
// //             />
// //           </label>

// //           <label className="block">
// //             <span className="text-sm">Gender</span>
// //             <select
// //               value={model.gender}
// //               onChange={(e) => onChange({ ...model, gender: e.target.value })}
// //               className="mt-1 block w-full rounded-md border p-2"
// //             >
// //               <option>Both</option>
// //               <option>Male</option>
// //               <option>Female</option>
// //             </select>
// //           </label>

// //           <div className="flex gap-2 justify-end">
// //             <button
// //               type="button"
// //               onClick={onCancel}
// //               className="px-4 py-2 rounded bg-gray-200"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 rounded bg-blue-600 text-white"
// //             >
// //               Save
// //             </button>
// //           </div>
// //         </div>
// //       </form>
// //     );
// //   }

// //   return (
// //     <div className="p-6">
// //       <header className="flex items-center justify-between mb-6">
// //         <h1 className="text-2xl font-bold">Medicine Dashboard</h1>
// //         <div className="flex gap-2">
// //           <button
// //             onClick={openCreate}
// //             className="px-4 py-2 rounded bg-green-600 text-white"
// //           >
// //             + Add Medicine
// //           </button>
// //           <button onClick={fetchAll} className="px-4 py-2 rounded bg-gray-100">
// //             Refresh
// //           </button>
// //         </div>
// //       </header>

// //       <div className="mb-4 relative max-w-xl">
// //         <input
// //           ref={inputRef}
// //           value={query}
// //           onChange={(e) => setQuery(e.target.value)}
// //           onFocus={() => setShowSuggestions(suggestions.length > 0)}
// //           placeholder="Search by generic or brand..."
// //           className="w-full rounded-md border p-2"
// //         />

// //         {showSuggestions && suggestions && suggestions.length > 0 && (
// //           <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-50 max-h-60 overflow-auto">
// //             {suggestions.map((s) => (
// //               <li
// //                 key={s.m_id}
// //                 onClick={() => onSelectSuggestion(s)}
// //                 className="p-2 hover:bg-gray-100 cursor-pointer"
// //               >
// //                 <div className="font-medium">{s.m_name}</div>
// //                 <div className="text-sm text-gray-600">
// //                   {s.generic_name} • {s.m_description}
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>

// //       {loading ? (
// //         <div>Loading...</div>
// //       ) : error ? (
// //         <div className="text-red-600">{error}</div>
// //       ) : (
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full table-auto border-collapse">
// //             <thead>
// //               <tr className="bg-gray-100">
// //                 <th className="p-2 text-left">#</th>
// //                 <th className="p-2 text-left">Brand</th>
// //                 <th className="p-2 text-left">Generic</th>
// //                 <th className="p-2 text-left">Description</th>
// //                 <th className="p-2 text-left">Children</th>
// //                 <th className="p-2 text-left">Category</th>
// //                 <th className="p-2 text-left">Gender</th>
// //                 <th className="p-2 text-left">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {medicines.map((m, idx) => (
// //                 <tr key={m.m_id} className="border-t">
// //                   <td className="p-2">{m.m_id}</td>
// //                   <td className="p-2">{m.m_name}</td>
// //                   <td className="p-2">{m.generic_name}</td>
// //                   <td className="p-2">{m.m_description}</td>
// //                   <td className="p-2">{m.m_for_children ? "Yes" : "No"}</td>
// //                   <td className="p-2">
// //                     {m.Category ? m.Category.c_name : m.c_id}
// //                   </td>
// //                   <td className="p-2">{m.gender}</td>
// //                   <td className="p-2">
// //                     <div className="flex gap-2">
// //                       <button
// //                         onClick={() => openEdit(m)}
// //                         className="px-2 py-1 rounded bg-yellow-300"
// //                       >
// //                         Edit
// //                       </button>
// //                       <button
// //                         onClick={() => removeMedicine(m.m_id)}
// //                         className="px-2 py-1 rounded bg-red-500 text-white"
// //                       >
// //                         Delete
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Modal */}
// //       {modalOpen && (
// //         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
// //             <h2 className="text-xl font-semibold mb-4">
// //               {editing && editing.m_id ? "Edit Medicine" : "Add Medicine"}
// //             </h2>
// //             <MedicineForm
// //               model={editing}
// //               onChange={setEditing}
// //               onSubmit={createOrUpdate}
// //               onCancel={() => {
// //                 setModalOpen(false);
// //                 setEditing(null);
// //               }}
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// //-------------------------------------------------------------
// // src/components/MedicineDashboard.jsx
// // import React, { useEffect, useState } from "react";
// // import API from "../api";
// // import "../styles/medicineDashboard.css";

// // function MedicineDashboard() {
// //   const [medicines, setMedicines] = useState([]);
// //   const [search, setSearch] = useState("");

// //   useEffect(() => {
// //     fetchMedicines();
// //   }, []);

// //   const fetchMedicines = async () => {
// //     const res = await API.get("/Medicines");
// //     setMedicines(res.data);
// //   };

// //   const filteredMedicines = medicines.filter((m) =>
// //     m.m_name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="medicine-dashboard">
// //       <div className="medicine-header">
// //         <h3>Medicine Database</h3>
// //         <input
// //           type="text"
// //           placeholder="Search medicine..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="medicine-search"
// //         />
// //       </div>

// //       <div className="medicine-table">
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Medicine Name</th>
// //               <th>Generic Name</th>
// //               <th>For Children</th>
// //               <th>Description</th>
// //               <th>Gender</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredMedicines.map((m) => (
// //               <tr key={m.m_id}>
// //                 <td>{m.m_id}</td>
// //                 <td>{m.m_name}</td>
// //                 <td>{m.generic_name}</td>
// //                 <td>{m.m_for_children ? "Yes" : "No"}</td>
// //                 <td>{m.m_description}</td>
// //                 <td>{m.gender}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // export default MedicineDashboard;

// //---------------------------------------------

// import React, { useEffect, useState } from "react";
// import API from "../api";
// import "../styles/medicineDashboard.css";

// function MedicineDashboard() {
//   const [medicines, setMedicines] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchMedicine, setSearchMedicine] = useState("");
//   const [searchGeneric, setSearchGeneric] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     fetchMedicines();
//     fetchCategories();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       const res = await API.get("/Medicines");
//       setMedicines(res.data);
//     } catch (err) {
//       console.error("Error fetching medicines:", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await API.get("/Categories");
//       setCategories(res.data);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   // ✅ Filter medicines dynamically
//   const filteredMedicines = medicines.filter((m) => {
//     const matchMedicine = m.m_name
//       .toLowerCase()
//       .includes(searchMedicine.toLowerCase());
//     const matchGeneric = m.generic_name
//       .toLowerCase()
//       .includes(searchGeneric.toLowerCase());
//     const matchCategory =
//       selectedCategory === "" ||
//       m.category_name?.toLowerCase() === selectedCategory.toLowerCase();
//     return matchMedicine && matchGeneric && matchCategory;
//   });

//   return (
//     <div className="medicine-dashboard">
//       <div className="medicine-header">
//         <h3>Medicine Database</h3>
//       </div>

//       {/* 🔍 Search Filters */}
//       <div className="search-filters">
//         <input
//           type="text"
//           placeholder="Search by medicine name..."
//           value={searchMedicine}
//           onChange={(e) => setSearchMedicine(e.target.value)}
//           className="medicine-search"
//         />

//         <input
//           type="text"
//           placeholder="Search by generic name..."
//           value={searchGeneric}
//           onChange={(e) => setSearchGeneric(e.target.value)}
//           className="medicine-search"
//         />

//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="category-dropdown"
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat.c_id} value={cat.c_name}>
//               {cat.c_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* 📋 Medicine Table */}
//       <div className="medicine-table">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Medicine Name</th>
//               <th>Generic Name</th>
//               <th>Category</th>
//               <th>For Children</th>
//               <th>Description</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredMedicines.map((m) => (
//               <tr key={m.m_id}>
//                 <td>{m.m_id}</td>
//                 <td>{m.m_name}</td>
//                 <td>{m.generic_name}</td>
//                 <td>{m.category_name || "—"}</td>
//                 <td>{m.m_for_children ? "Yes" : "No"}</td>
//                 <td>{m.m_description}</td>
//                 <td>{m.gender}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default MedicineDashboard;

// -------------------------------------------

// import React, { useEffect, useState } from "react";
// import API from "../api";
// import "../styles/medicineDashboard.css";

// function MedicineDashboard() {
//   const [medicines, setMedicines] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchMedicine, setSearchMedicine] = useState("");
//   const [searchGeneric, setSearchGeneric] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedChildFilter, setSelectedChildFilter] = useState("");
//   const [selectedGender, setSelectedGender] = useState("");

//   useEffect(() => {
//     fetchMedicines();
//     fetchCategories();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       const res = await API.get("/Medicines");
//       setMedicines(res.data);
//     } catch (err) {
//       console.error("Error fetching medicines:", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await API.get("/Categories");
//       setCategories(res.data);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   // ✅ Apply all filters
//   const filteredMedicines = medicines.filter((m) => {
//     const matchMedicine = m.m_name
//       .toLowerCase()
//       .includes(searchMedicine.toLowerCase());
//     const matchGeneric = m.generic_name
//       .toLowerCase()
//       .includes(searchGeneric.toLowerCase());
//     const matchCategory =
//       selectedCategory === "" ||
//       m.category_name?.toLowerCase() === selectedCategory.toLowerCase();
//     const matchChildren =
//       selectedChildFilter === ""
//         ? true
//         : selectedChildFilter === "Yes"
//         ? m.m_for_children
//         : !m.m_for_children;
//     const matchGender =
//       selectedGender === "" ||
//       m.gender.toLowerCase() === selectedGender.toLowerCase();

//     return (
//       matchMedicine &&
//       matchGeneric &&
//       matchCategory &&
//       matchChildren &&
//       matchGender
//     );
//   });

//   return (
//     <div className="medicine-dashboard">
//       <div className="medicine-header">
//         <h3>Medicine Database</h3>
//       </div>

//       {/* 🔍 Search Filters */}
//       <div className="search-filters">
//         <input
//           type="text"
//           placeholder="Search by medicine name..."
//           value={searchMedicine}
//           onChange={(e) => setSearchMedicine(e.target.value)}
//           className="medicine-search"
//         />

//         <input
//           type="text"
//           placeholder="Search by generic name..."
//           value={searchGeneric}
//           onChange={(e) => setSearchGeneric(e.target.value)}
//           className="medicine-search"
//         />

//         {/* Category Dropdown */}
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="category-dropdown"
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat.c_id} value={cat.c_name}>
//               {cat.c_name}
//             </option>
//           ))}
//         </select>

//         {/* 👶 Children Filter */}
//         <select
//           value={selectedChildFilter}
//           onChange={(e) => setSelectedChildFilter(e.target.value)}
//           className="category-dropdown"
//         >
//           <option value="">None</option>
//           <option value="Yes">For Children</option>
//           <option value="No">For Adults</option>
//         </select>

//         {/* 🚻 Gender Filter */}
//         <select
//           value={selectedGender}
//           onChange={(e) => setSelectedGender(e.target.value)}
//           className="category-dropdown"
//         >
//           <option value="">All Genders</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//       </div>

//       {/* 📋 Medicine Table */}
//       <div className="medicine-table">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Medicine Name</th>
//               <th>Generic Name</th>
//               <th>Category</th>
//               <th>For Children</th>
//               <th>Description</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredMedicines.map((m) => (
//               <tr key={m.m_id}>
//                 <td>{m.m_id}</td>
//                 <td>{m.m_name}</td>
//                 <td>{m.generic_name}</td>
//                 <td>{m.category_name || "—"}</td>
//                 <td>{m.m_for_children ? "Yes" : "No"}</td>
//                 <td>{m.m_description}</td>
//                 <td>{m.gender}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default MedicineDashboard;

// -------------------------------------------

import React, { useEffect, useState } from "react";
import API from "../api";
import "../styles/medicineDashboard.css";

function MedicineDashboard() {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);

  // 🔍 Filters
  const [searchMedicine, setSearchMedicine] = useState("");
  const [searchGeneric, setSearchGeneric] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChildFilter, setSelectedChildFilter] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  // ✏️ CRUD Form
  const [formData, setFormData] = useState({
    // m_id: "",
    m_name: "",
    generic_name: "",
    c_name: "",
    m_for_children: false,
    m_description: "",
    gender: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchMedicines();
    fetchCategories();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await API.get("/Medicines");
      setMedicines(res.data);
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/Categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // ✅ Apply all filters
  const filteredMedicines = medicines.filter((m) => {
    const matchMedicine = m.m_name
      .toLowerCase()
      .includes(searchMedicine.toLowerCase());
    const matchGeneric = m.generic_name
      .toLowerCase()
      .includes(searchGeneric.toLowerCase());
    const matchCategory =
      selectedCategory === "" ||
      m.category_name?.toLowerCase() === selectedCategory.toLowerCase();
    const matchChildren =
      selectedChildFilter === ""
        ? true
        : selectedChildFilter === "Yes"
        ? m.m_for_children
        : !m.m_for_children;
    const matchGender =
      selectedGender === "" ||
      m.gender.toLowerCase() === selectedGender.toLowerCase();

    return (
      matchMedicine &&
      matchGeneric &&
      matchCategory &&
      matchChildren &&
      matchGender
    );
  });

  // ✏️ Handle Form Input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (editing) {
  //       await API.put(`/Medicines/${formData.m_id}`, formData);
  //       alert("✅ Medicine updated successfully!");
  //     } else {
  //       await API.post("/Medicines", formData);
  //       alert("✅ Medicine added successfully!");
  //     }
  //     fetchMedicines();
  //     setFormData({
  //       m_id: "",
  //       m_name: "",
  //       generic_name: "",
  //       c_id: "",
  //       m_for_children: false,
  //       m_description: "",
  //       gender: "",
  //     });
  //     setEditing(false);
  //   } catch (err) {
  //     console.error("Error saving medicine:", err);
  //   }
  // };

  // ➕ Create or Update Medicine
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the category object by name
    const selectedCategory = categories.find(
      (cat) => cat.c_name.toLowerCase() === formData.c_name.trim().toLowerCase()
    );

    if (!formData.c_name) {
      alert("Please select a category!");
      return;
    }

    if (!selectedCategory) {
      alert("Invalid category name!");
      return;
    }

    // Prepare payload with c_id
    const payload = {
      ...formData,
      c_id: selectedCategory.c_id,
    };

    try {
      if (editing) {
        await API.put(`/Medicines/${formData.m_id}`, payload);
        alert("✅ Medicine updated successfully!");
      } else {
        await API.post("/Medicines", payload);
        alert("✅ Medicine added successfully!");
      }
      fetchMedicines();
      setFormData({
        m_id: "",
        m_name: "",
        generic_name: "",
        c_name: "",
        m_for_children: false,
        m_description: "",
        gender: "",
      });
      setEditing(false);
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
        alert("Error: " + JSON.stringify(err.response.data));
      } else {
        console.error("Error saving medicine:", err);
      }
    }
  };

  // 🗑️ Delete Medicine
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await API.delete(`/Medicines/${id}`);
        alert("🗑️ Medicine deleted successfully!");
        fetchMedicines();
      } catch (err) {
        console.error("Error deleting medicine:", err);
      }
    }
  };

  // ✍️ Edit Existing Medicine
  const handleEdit = (medicine) => {
    setFormData(medicine);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="medicine-dashboard">
      <div className="medicine-header">
        <h3>Medicine Database (CRUD)</h3>
      </div>

      {/* ➕ Add/Edit Medicine Form */}
      <form className="medicine-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="m_name"
          placeholder="Medicine Name"
          value={formData.m_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="generic_name"
          placeholder="Generic Name"
          value={formData.generic_name}
          onChange={handleChange}
          required
        />
        <select
          name="c_name"
          value={formData.c_name}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.c_id} value={cat.c_name}>
              {cat.c_name}
            </option>
          ))}
        </select>
        <textarea
          name="m_description"
          placeholder="Description"
          value={formData.m_description}
          onChange={handleChange}
          required
        ></textarea>

        <div className="form-inline">
          <label>
            <input
              type="checkbox"
              name="m_for_children"
              checked={formData.m_for_children}
              onChange={handleChange}
            />{" "}
            For Children
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Both">Both</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          {editing ? "Update Medicine" : "Add Medicine"}
        </button>
      </form>

      {/* 🔍 Filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by medicine name..."
          value={searchMedicine}
          onChange={(e) => setSearchMedicine(e.target.value)}
          className="medicine-search"
        />

        <input
          type="text"
          placeholder="Search by generic name..."
          value={searchGeneric}
          onChange={(e) => setSearchGeneric(e.target.value)}
          className="medicine-search"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.c_id} value={cat.c_name}>
              {cat.c_name}
            </option>
          ))}
        </select>

        <select
          value={selectedChildFilter}
          onChange={(e) => setSelectedChildFilter(e.target.value)}
          className="category-dropdown"
        >
          <option value="">Select Age Group</option>
          <option value="Yes">For Children</option>
          <option value="No">For Adults</option>
        </select>

        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="category-dropdown"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {/* 📋 Medicine Table */}
      <div className="medicine-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Medicine Name</th>
              <th>Generic Name</th>
              <th>Category</th>
              <th>For Children</th>
              <th>Description</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((m) => (
              <tr key={m.m_id}>
                <td>{m.m_id}</td>
                <td>{m.m_name}</td>
                <td>{m.generic_name}</td>
                <td>{m.category_name || "—"}</td>
                <td>{m.m_for_children ? "Yes" : "No"}</td>
                <td>{m.m_description}</td>
                <td>{m.gender}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(m)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(m.m_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicineDashboard;
