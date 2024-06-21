import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

const AddStudent = () => {
  const [student, setStudent] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
  });
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const handleText = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!student.username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!student.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    if (!student.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const saveStudent = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:8080/api/students/add', student) 
        .then((res) => {
          setMsg("Student added successfully...");
          setStudent({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            dob: "",
          }); // Reset the form
        })
        .catch((error) => {
          console.error("Error:", error);
          setMsg("Error adding student. Please try again.");
        });
    }
  };

  return (
    <>
      <AdminDashboard />
      <Form style={{ width: "80%", margin: "auto", marginTop:"50px"}} onSubmit={saveStudent}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="username"
            value={student.username}
            onChange={handleText}
            isInvalid={errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={student.password}
            onChange={handleText}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={student.email}
            onChange={handleText}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            value={student.firstName}
            onChange={handleText}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            value={student.lastName}
            onChange={handleText}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDob">
          <Form.Label>DOB</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter DOB"
            name="dob"
            value={student.dob}
            onChange={handleText}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register Student
        </Button>
        {msg && <p>{msg}</p>}
      </Form>
    </>
  );
};

export default AddStudent;
