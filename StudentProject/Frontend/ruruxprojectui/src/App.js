import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StudentDashboard from "./components/StudentDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import MyProfile from "./components/MyProfile";
import MyPerformance from "./components/MyPerformance";
import Home from "./components/Home";
import StudentLoginForm from "./components/StudentLoginForm";
import Welcome from "./components/Welcome";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AddStudent from "./components/AddStudent";
import ViewAllStudents from "./components/ViewAllStudents";
import AddSubject from "./components/AddSubject";
import AdminHome from "./components/AdminHome";
import ViewAllSubject from "./components/ViewAllSubject";
import AddMarks from "./components/AddMarks";
import ViewMarks from "./components/ViewAllMarks";
import { AuthProvider } from "./components/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/studentlogin" element={<StudentLoginForm />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/performance" element={<MyPerformance />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/viewAllStudent" element={<ViewAllStudents />} />
        <Route path="/addSubject" element={<AddSubject />} />
        <Route path="/viewSubject" element={<ViewAllSubject />} />
        <Route path="/addMark" element={<AddMarks />} />
        <Route path="/viewMark" element={<ViewMarks />} />
        <Route path="/authProvider" element={<AuthProvider />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
