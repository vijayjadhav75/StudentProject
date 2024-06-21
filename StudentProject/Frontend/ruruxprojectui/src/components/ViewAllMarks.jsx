import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

function ViewMarks() {
  const [marks, setMarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  useEffect(() => {
    // Fetch mark data when the component mounts
    axios.get("http://localhost:8080/api/marks/viewMarks")
      .then((response) => {
        setMarks(response.data); // Set marks state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching mark data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Implement delete functionality
    axios.delete(`http://localhost:8080/api/marks/deleteMark/${id}`)
      .then(() => {
        setMarks(marks.filter(mark => mark.id !== id));
      })
      .catch(error => {
        console.error("Error deleting mark:", error);
      });
  };

  const handleUpdate = (id) => {
    // Implement update functionality
    console.log(`Update mark with id: ${id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  // Filter marks based on search term
  const filteredMarks = marks.filter((mark) => {
    // Convert the search term to lowercase for case-insensitive comparison
    const searchTermLowerCase = searchTerm.toLowerCase();
    
    // Check if any part of the exam date includes the search term
    return mark.examDate.toLowerCase().includes(searchTermLowerCase);
  });

  return (
    <>
      <AdminDashboard/>
      <div style={{ margin: "auto", marginTop: "20px", width: "80%" }}>
        <input
          type="text"
          placeholder="Search by Exam Date (YYYY-MM-DD)"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Table style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Subject ID</th>
            <th>Marks Obtained</th>
            <th>Exam Date</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredMarks.map((mark) => (
            <tr key={mark.id}>
              <td>{mark.id}</td>
              <td>{mark.student ? mark.student.id : 'N/A'}</td>
              <td>{mark.subject ? mark.subject.id : 'N/A'}</td>
              <td>{mark.marksObtained}</td>
              <td>{mark.examDate}</td>
              <td>
                <button onClick={() => handleDelete(mark.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleUpdate(mark.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ViewMarks;
