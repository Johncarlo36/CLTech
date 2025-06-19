import { Card, Button } from 'react-bootstrap';

export default function CourseCard3() {
  return (
    <Card id="CourseCard3" style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>Figma Design Fundamentals</Card.Title>
        <Card.Text>
          <strong>Description:</strong><br />
          Understand the principles of UX/UI design. This course covers wireframing, prototyping, and Figma tools.
        </Card.Text>
        <Card.Text>
          <strong>Price:</strong> ₱20,000;
        </Card.Text>
        <Button variant="primary">Enroll</Button>
      </Card.Body>
    </Card>
  );
}