import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from "../context/UserContext";

export default function CourseView() {

    const { user } = useContext(UserContext);

    const notyf = new Notyf();
    const navigate = useNavigate();

    const { courseId } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    function enroll(courseId) {
        fetch('http://localhost:4000/enrollments/enroll', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                userId: user.id,
                enrolledCourses: [{ courseId }],
                totalPrice: price
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Admin is forbidden') {
                notyf.error("Admin Forbidden");
            } else if (data.message === 'Enrolled successfully') {
                notyf.success('Enrollment Successful');
                navigate("/courses");
            } else {
                notyf.error('Internal Server Error. Notify system admin.');
            }
        });
    }

    useEffect(() => {
        fetch(`http://localhost:4000/courses/specific/${courseId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
            });
    }, [courseId]);

    return (
        <Container className="py-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card className="bg-dark bg-opacity-75 text-white shadow rounded">
                        <Card.Body className="text-center">
                            <Card.Title className="mb-3 fs-3">{name}</Card.Title>
                            <Card.Subtitle className="mb-2">Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle className="mb-2">Price:</Card.Subtitle>
                            <Card.Text>₱{price}</Card.Text>
                            <Card.Subtitle className="mb-2">Class Schedule:</Card.Subtitle>
                            <Card.Text>8 AM - 5 PM</Card.Text>
                            {
                                user.id !== null ? (
                                    <Button variant="primary" className="w-100 mt-3" onClick={() => enroll(courseId)}>
                                        Enroll
                                    </Button>
                                ) : (
                                    <Link className="btn btn-danger w-100 mt-3" to="/login">
                                        Login to Enroll
                                    </Link>
                                )
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
