import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

function ViewAllSubject() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/subjects/viewAllSubject")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subject data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/subjects/deleteSubject/${id}`)
      .then(() => {
        setSubjects(subjects.filter(subject => subject.id !== id));
      })
      .catch(error => {
        console.error("Error deleting subject:", error);
      });
  };

  const handleUpdate = (id) => {
    console.log(`Update subject with id: ${id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSubjects = subjects.filter((subject) => {
    return subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <AdminDashboard />
      <div style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search by Subject Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Table style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject Name</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.id}</td>
              <td>{subject.subjectName}</td>
              <td>
                <button onClick={() => handleDelete(subject.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleUpdate(subject.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ViewAllSubject;
