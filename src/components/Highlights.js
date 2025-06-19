import { Card, Row, Col } from 'react-bootstrap';

function Highlights() {
  return (
    <Row className="mt-4">
      <Col md={4}>
        <Card id="highlight1" className="h-100">
          <Card.Body>
            <Card.Title>Learn from Home</Card.Title>
            <Card.Text>
              Access quality education anytime, anywhere with flexible online courses designed to fit your schedule and lifestyle.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card id="highlight2" className="h-100">
          <Card.Body>
            <Card.Title>Study Now, Pay Later</Card.Title>
            <Card.Text>
              Invest in your future with our budget-friendly "study now, pay later" program, making education accessible to everyone.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card id="highlight3" className="h-100">
          <Card.Body>
            <Card.Title>Be Part of Our Community</Card.Title>
            <Card.Text>
              Join a thriving network of learners and mentors who are passionate about growth, collaboration, and lifelong learning.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Highlights;
