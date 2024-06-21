import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AdminDashboard from './AdminDashboard';

const AdminHome = () => {
    return (
        <>
            <AdminDashboard/>
            <Row className="mt-5">
                <Col>
                    <h1>Welcome to Admin Dashboard</h1>
                    <p>This is the home page of the Admin dashboard application.</p>
                </Col>
            </Row>
        </>
    );
};

export default AdminHome;
