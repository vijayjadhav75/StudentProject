import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider'; 

const AdminLogin = () => {
    const { login } = useAuth(); // Accessing the login function from AuthProvider
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();  // Prevent default form submission behavior

        try {
            const response = await axios.post('http://localhost:8080/api/admin/adminLogin', { username, password });
            console.log('Login successful:', response.data);
            setError('');
            // Call the login function from AuthProvider upon successful login
            login();
            // Redirect to admin dashboard upon successful login
            window.location.href = '/admindashboard';
        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                setError(err.response.data || 'Invalid username or password');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleLogin}>
                        <h2 className="mb-4">Login</h2>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        {error && <p className="mt-3" style={{ color: 'red' }}>{error}</p>}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLogin;
