import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const AddCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(name && description && price);
  }, [name, description, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const course = { name, description, price };
    const notyf = new Notyf();

    try {
      const response = await fetch("http://localhost:4000/courses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      });

      const data = await response.json(); // Always parse the response

      if (!response.ok) {
        if (data.message === "Course Already Exists") {
          notyf.error("Course Already Exists");
          return;
        } else if (data.message === "Failed to save the course") {
          notyf.error("Unsuccessful Course Creation");
          return;
        } else {
          notyf.error("Course Already Exists");
          return;
        }
      }

      notyf.success("Course Added");
      setTimeout(() => {
        window.location.href = "/courses";
      }, 1500);

    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = "Add Course";
  }, []);

  if (!user.id || !user.isAdmin) {
    return <Navigate to="/courses" />;
  }

  return (
    <Container style={{ maxWidth: "600px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">Add Course</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Button
          variant={isFormValid ? "primary" : "danger"}
          type="submit"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddCourse;