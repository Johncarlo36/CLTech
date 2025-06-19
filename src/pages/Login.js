import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';  
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import UserContext from '../context/UserContext';

const notyf = new Notyf();

export default function LoginCard() {

  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(email !== '' && password !== '');
  }, [email, password]);

  function authenticate(e) {
    e.preventDefault();

    fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {

      if (data.access !== undefined) {
        localStorage.setItem('token', data.access);
        retrieveUserDetails(data.access);
        setEmail('');
        setPassword('');
        notyf.success('You are now logged in');
      } else if (data.message === 'Incorrect email or password') {
        notyf.error('Incorrect email or password');
      } else {
        notyf.error('Email does not exist');
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      notyf.error('Something went wrong. Please try again later.');
    });
  }

  function retrieveUserDetails(token) {
    fetch('http://localhost:4000/users/details', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setUser({
        id: data._id,
        isAdmin: data.isAdmin
      });
    });
  }

  if (user.id !== null) {
    return <Navigate to="/courses" />;
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <Col md={5} className="bg-white border rounded shadow p-4">
        <h2 className="text-center mb-4 fw-bold">Login</h2>

        <Form onSubmit={authenticate}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              variant={isActive ? "primary" : "secondary"}
              type="submit"
              disabled={!isActive}
            >
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Container>
  );
}
