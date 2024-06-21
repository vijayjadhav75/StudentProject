import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
let AddSubject=()=>{
    const [subject, setSubject] = useState({
        subjectName: ""
      });
      const [msg, setMsg] = useState("");
    
      const handleText = (event) => {
        const { name, value } = event.target;
        setSubject((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const saveSubject = (event) => {
        event.preventDefault();
        axios
          .post('http://localhost:8080/api/subjects/saveSubject', subject) 
          .then((res) => {
            setMsg("Subject added successfully...");
            setSubject({
                subjectName : ""
            }); // Reset the form
          })
          .catch((error) => {
            console.error("Error:", error);
            setMsg("Error adding subject. Please try again.");
          });
      };
    return(
        <>
        <AdminDashboard />
        <Form style={{ width: "80%", margin: "auto", marginTop:"50px"}} onSubmit={saveSubject}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Subject"
              name="subjectName"
              value={subject.subjectName}
              onChange={handleText}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
          Add Subject
        </Button>
        {msg && <p>{msg}</p>}
      </Form>
        </>
    )
}
export default AddSubject;