import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to the welcome page after logout
    navigate('/');
  };

  useEffect(() => {
    // Prevent users from navigating back to Admin Dashboard after logout
    window.history.pushState(null, '', '/');
    window.addEventListener('popstate', () => {
      navigate('/');
    });

    return () => {
      window.removeEventListener('popstate', () => {
        navigate('/');
      });
    };
  }, [logout, navigate]);

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/adminHome">Admin Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/adminHome">Home</Nav.Link>
            <Nav.Link as={Link} to="/addstudent">Add Student</Nav.Link>
            <Nav.Link as={Link} to="/viewAllStudent">View All Student</Nav.Link>
            <Nav.Link as={Link} to="/addSubject">Add Subject</Nav.Link>
            <Nav.Link as={Link} to="/viewSubject">View All Subject</Nav.Link>
            <Nav.Link as={Link} to="/addMark">Add Marks and Assign Marks To Subject</Nav.Link>
            <Nav.Link as={Link} to="/viewMark">View Assign Marks To Subject</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminDashboard;
