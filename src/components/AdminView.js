import React, { useState, useEffect } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import EditCourse from './EditCourse';
import ArchiveCourse from './ArchiveCourse';

export default function AdminView({ coursesData, fetchData }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const coursesArr = coursesData.map(course => (
      <tr key={course._id}>
        <td>{course._id}</td>
        <td>{course.name}</td>
        <td>{course.description}</td>
        <td>{course.price}</td>
        <td className={course.isActive ? "text-success" : "text-danger"}>
          {course.isActive ? "Available" : "Unavailable"}
        </td>
        <td className="text-center">
          <EditCourse course={course} fetchData={fetchData} />
          <ArchiveCourse
            courseId={course._id}
            isActive={course.isActive}
            fetchData={fetchData}
          />
        </td>
      </tr>
    ));
    setCourses(coursesArr);
  }, [coursesData, fetchData]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses}
        </tbody>
      </Table>
    </Container>
  );
}