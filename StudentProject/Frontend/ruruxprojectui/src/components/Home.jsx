import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StudentDashboard from './StudentDashboard';

const Home = () => {
    return (
        <>
            <StudentDashboard/>
            <Row className="mt-5">
                <Col>
                    <h1>Welcome to Student Dashboard</h1>
                    <p>This is the home page of the student dashboard application.</p>
                </Col>
            </Row>
        </>
    );
};

export default Home;
