import React, { useEffect, useState } from "react";
import API from "../api";
import "../styles/diseaseContraindication.css";

function DiseaseContraindicationDashboard() {
  const [diseaseList, setDiseaseList] = useState([]);
  const [contraindications, setContraindications] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState("");
  const [searchMedicine, setSearchMedicine] = useState("");
  const [searchGeneric, setSearchGeneric] = useState("");

  // Fetch all diseases for dropdown
  // useEffect(() => {
  //   API.get("/Diseases")
  //     .then((res) => setDiseaseList(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  // Fetch all diseases for dropdown
  // useEffect(() => {
  //   API.get("/Diseases")
  //     .then((res) =>
  //       setDiseaseList(
  //         res.data.sort((a, b) => a.ds_name.localeCompare(b.ds_name))
  //       )
  //     )
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    API.get("/Diseases")
      .then((res) => {
        console.log("Fetched Diseases:", res.data); // 👈 Add this line
        setDiseaseList(res.data);
      })
      .catch((err) => console.error("Error loading diseases:", err));
  }, []);

  // Fetch contraindications (all or filtered)
  const fetchContraindications = async () => {
    try {
      const response = await API.get("/Disease_Contraindication");
      setContraindications(response.data);
    } catch (error) {
      console.error("Error fetching contraindications:", error);
    }
  };

  useEffect(() => {
    fetchContraindications();
  }, []);

  // Handle filtering
  const filteredData = contraindications.filter((item) => {
    const matchMedicine = item.m_name
      ? item.m_name.toLowerCase().includes(searchMedicine.toLowerCase())
      : true;
    const matchGeneric = item.generic_name
      ? item.generic_name.toLowerCase().includes(searchGeneric.toLowerCase())
      : true;
    const matchDisease = selectedDisease
      ? item.ds_id === parseInt(selectedDisease)
      : true;

    return matchMedicine && matchGeneric && matchDisease;
  });

  return (
    <div className="contra-page">
      <h2 className="heading">Disease Contraindication Dashboard</h2>

      {/* Search Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by Medicine Name..."
          value={searchMedicine}
          onChange={(e) => setSearchMedicine(e.target.value)}
          className="input-box"
        />

        <input
          type="text"
          placeholder="🔍 Search by Generic Name..."
          value={searchGeneric}
          onChange={(e) => setSearchGeneric(e.target.value)}
          className="input-box"
        />

        <select
          className="dropdown"
          value={selectedDisease}
          onChange={(e) => setSelectedDisease(e.target.value)}
        >
          <option value="">All Diseases</option>
          {diseaseList.map((disease) => (
            <option key={disease.ds_id} value={disease.ds_id}>
              {disease.ds_name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="contra-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Disease</th>
            <th>Medicine</th>
            <th>Generic Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.dis_contra_id}>
                <td>{item.dis_contra_id}</td>
                <td>{item.ds_name}</td>
                <td>{item.m_name}</td>
                <td>{item.generic_name}</td>
                <td>{item.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No contraindications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DiseaseContraindicationDashboard;
