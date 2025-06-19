import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

export default function Register() {
  const { user } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const valid = (
      firstName && lastName && email && mobileNo.length === 11 &&
      password && confirmPassword && password === confirmPassword
    );
    setIsActive(valid);
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(e) {
    e.preventDefault();
    // Add your fetch/POST logic here
    console.log("Registered!");
  }

  if (user?.id) return <Navigate to="/courses" />;

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <Col md={5} className="bg-white border rounded shadow p-4">
        <h2 className="text-center mb-4 fw-bold">Register</h2>

        <Form onSubmit={registerUser}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type="text"
              placeholder="11-digit mobile number"
              value={mobileNo}
              onChange={e => setMobileNo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              variant={isActive ? "primary" : "secondary"}
              type="submit"
              disabled={!isActive}
            >
              {isActive ? "Register" : "Fill all fields correctly"}
            </Button>
          </div>
        </Form>
      </Col>
    </Container>
  );
}
