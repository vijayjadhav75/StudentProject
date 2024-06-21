import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Spinner } from 'react-bootstrap';
import StudentDashboard from './StudentDashboard';

const MyProfile = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const loggedInUsername = localStorage.getItem('loggedInUsername');
                if (!loggedInUsername) {
                    setError('No logged-in user found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:8080/api/students/viewStudent', {
                    params: {
                        username: loggedInUsername
                    }
                });
                setStudent(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching student record');
                setLoading(false);
            }
        };

        fetchStudent();
    }, []);

    return (
        <>
        <StudentDashboard/>
        <Container className="mt-4">
            <h2 className="mb-4">Student Record</h2>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : error ? (
                <div>Error: {error}</div>
            ) : student ? (
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>{student.username}</Card.Title>
                        <Card.Text>
                            <strong>Name:</strong> {student.firstName} {student.lastName}<br />
                            <strong>Email:</strong> {student.email}<br />
                            <strong>Date of Birth:</strong> {student.dob}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <p>No student record found.</p>
            )}
        </Container>
        </>
    );
};

export default MyProfile;
