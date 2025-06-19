import { useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function CourseCard({ courseProp }) {

  const { _id, name, description, price } = courseProp;


  return (
    <Card style={{ width: '100%' }} id="CourseCard">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>{price}</Card.Text>
        <Link className="btn btn-primary" to={`/courses/${_id}`}>Details</Link>
      </Card.Body>
    </Card>
  );
}