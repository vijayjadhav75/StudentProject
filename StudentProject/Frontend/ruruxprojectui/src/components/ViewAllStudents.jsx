import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

function ViewAllStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  useEffect(() => {
    // Fetch student data when the component mounts
    axios.get("http://localhost:8080/api/students/viewAllStudent")
      .then((response) => {
        setStudents(response.data); // Set students state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Implement delete functionality
    axios.delete(`http://localhost:8080/api/students/deleteStudent/${id}`)
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => {
        console.error("Error deleting student:", error);
      });
  };

  const handleUpdate = (id) => {
    // Implement update functionality
    console.log(`Update student with id: ${id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    return (
      student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <AdminDashboard/>
      <div style={{ margin: "auto", marginTop: "20px", width: "80%" }}>
        <input
          type="text"
          placeholder="Search by username, first name, last name, or email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Table style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td> {/* Display the student ID */}
              <td>{student.username}</td>
              <td>{student.password}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td> {/* Ensure this matches your API response structure */}
              <td>{student.email}</td>
              <td>{student.dob}</td>
              <td>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleUpdate(student.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ViewAllStudents;
