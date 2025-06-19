import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CourseCard from './CourseCard';

export default function UserView({ coursesData }) {
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    setAvailableCourses(coursesData.filter(c => c.isActive));
  }, [coursesData]);

  return (
    <Container className="mt-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {availableCourses.map(course => (
          <Col key={course._id} className="d-flex align-items-stretch">
            <CourseCard className="w-100 shadow-sm rounded-lg border-0" courseProp={course} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
