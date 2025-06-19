import { Card, Button } from 'react-bootstrap';

export default function CourseCard4() {
  return (
    <Card id="CourseCard4" style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>Mobile App Development with React Native</Card.Title>
        <Card.Text>
          <strong>Description:</strong><br />
          Build cross-platform mobile apps using React Native. Includes UI components, navigation, and API integration.
        </Card.Text>
        <Card.Text>
          <strong>Price:</strong> ₱21,000
        </Card.Text>
        <Button variant="primary">Enroll</Button>
      </Card.Body>
    </Card>
  );
}