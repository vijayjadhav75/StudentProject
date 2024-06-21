import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

const AddMarks = () => {
  const [mark, setMark] = useState({
    studentId: "",
    subjectId: "",
    marksObtained: "",
    examDate: "" 
  });
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Fetch students
    axios.get('http://localhost:8080/api/students/viewAllStudent')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      });

    // Fetch subjects
    axios.get('http://localhost:8080/api/subjects/viewAllSubject')
      .then(response => {
        setSubjects(response.data);
      })
      .catch(error => {
        console.error("Error fetching subjects:", error);
      });
  }, []);

  const handleText = (event) => {
    const { name, value } = event.target;
    setMark((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveMark = (event) => {
    event.preventDefault();

    // Find the selected student and subject objects based on their IDs
    const selectedStudent = students.find(student => student.id === parseInt(mark.studentId));
    const selectedSubject = subjects.find(subject => subject.id === parseInt(mark.subjectId));

    // Update the mark object with the selected student and subject objects
    const updatedMark = {
      ...mark,
      student: selectedStudent,
      subject: selectedSubject
    };

    axios
      .post('http://localhost:8080/api/marks/saveMark', updatedMark)
      .then((res) => {
        setMsg("Mark added successfully...");
        setMark({
          studentId: "",
          subjectId: "",
          marksObtained: "",
          examDate: ""
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setMsg("Error adding mark. Please try again.");
      });
  };

  return (
    <>
      <AdminDashboard />
      <Form style={{ width: "80%", margin: "auto", marginTop: "50px" }} onSubmit={saveMark}>
        <Form.Group className="mb-3" controlId="formStudentId">
          <Form.Label>Student</Form.Label>
          <Form.Control
            as="select"
            name="studentId"
            value={mark.studentId}
            onChange={handleText}
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.firstName}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSubjectId">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            as="select"
            name="subjectId"
            value={mark.subjectId}
            onChange={handleText}
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.subjectName}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMarksObtained">
          <Form.Label>Marks Obtained</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter marks obtained"
            name="marksObtained"
            value={mark.marksObtained}
            onChange={handleText}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formExamDate">
          <Form.Label>Exam Date</Form.Label>
          <Form.Control
            type="date"
            name="examDate"
            value={mark.examDate}
            onChange={handleText}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Mark
        </Button>
        {msg && <p>{msg}</p>}
      </Form>
    </>
  );
};

export default AddMarks;
