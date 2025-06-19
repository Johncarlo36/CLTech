import { Card, Button } from 'react-bootstrap';

export default function CourseCard1() {
  return (
    <Card id="CourseCard1" style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>Full-Stack Web Development</Card.Title>
        <Card.Text>
          Learn to build modern web applications using HTML, CSS, JavaScript, Node.js, and MongoDB.
        </Card.Text>
        <Card.Text>
          <strong>Price:</strong> ₱27,000
        </Card.Text>
        <Button variant="primary">Enroll</Button>
      </Card.Body>
    </Card>
  );
}