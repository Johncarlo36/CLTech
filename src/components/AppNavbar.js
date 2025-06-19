import { useState, useContext } from 'react';
import {
  Container, Nav, Navbar, NavDropdown, Form, FormControl, Button
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar 
      expand="lg" 
      variant="dark" 
      style={{
        background: 'linear-gradient(90deg, #4b6cb7, #182848)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
      sticky="top"
      className="mb-4"
    >
      <Container fluid className="ms-4 me-4">
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
          <i className="bi bi-calendar-check me-2"></i>
          CLTech Booking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/courses" exact>Courses</Nav.Link>
            <Nav.Link as={NavLink} to="/news" exact>News</Nav.Link>

            {user.id && user.isAdmin && (
              <Nav.Link as={NavLink} to="/addCourse" exact>Add Course</Nav.Link>
            )}

            <NavDropdown title="More" id="nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/about">About Us</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/contact">Contact</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Search courses…"
              className="me-2"
              aria-label="Search"
              style={{ maxWidth: '200px' }}
            />
            <Button variant="outline-light">Search</Button>
          </Form>

          <Nav className="ms-auto">
            {user.id ? (
              <>
                <Nav.Link as={NavLink} to="/profile" exact>
                  <i className="bi bi-person-circle"></i> Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout" exact>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
