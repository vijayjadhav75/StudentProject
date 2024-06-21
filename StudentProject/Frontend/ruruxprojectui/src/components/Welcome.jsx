import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Welcome = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Welcome to Student Management System</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Button as={Link} to="/adminlogin" variant="primary" className="me-3">
            Admin Login
          </Button>
          <Button as={Link} to="/studentlogin" variant="primary">
            Student Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
