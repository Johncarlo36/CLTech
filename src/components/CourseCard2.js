import { Card, Button } from 'react-bootstrap';

export default function CourseCard2() {
  return (
    <Card id="CourseCard2" style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>Data Science Bootcamp</Card.Title>
        <Card.Text>
          Master data analysis, Python, machine learning, and data visualization tools in this comprehensive bootcamp.
        </Card.Text>
        <Card.Text>
          <strong>Price:</strong> ₱33,000
        </Card.Text>
        <Button variant="primary">Enroll</Button>
      </Card.Body>
    </Card>
  );
}