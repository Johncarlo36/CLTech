import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

export default function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(email.trim() && password.trim());
  }, [email, password]);

  function authenticate(e) {
    e.preventDefault();
    // your fetch logic...
  }

  return (
    <Container
      fluid
      className="d-flex vh-100 align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #0d6efd, #6610f2)', // primary to indigo
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg rounded-4 bg-white bg-opacity-90">
            <h3 className="text-center mb-4 text-primary">Login</h3>

            <Form onSubmit={authenticate} noValidate>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingEmail"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                <Form.Label htmlFor="floatingEmail">Email address</Form.Label>
              </Form.Floating>

              <Form.Floating className="mb-4">
                <Form.Control
                  id="floatingPassword"
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
                />
                <Form.Label htmlFor="floatingPassword">Password</Form.Label>
              </Form.Floating>

              <Button
                variant={isActive ? 'primary' : 'secondary'}
                type="submit"
                className="w-100 mb-3"
                disabled={!isActive}
              >
                Login
              </Button>

              <div className="text-center mb-3 text-muted">
                or sign in with
              </div>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="outline-primary" size="sm">
                  <i className="fab fa-google"></i>
                </Button>
                <Button variant="outline-info" size="sm">
                  <i className="fab fa-facebook-f"></i>
                </Button>
                <Button variant="outline-secondary" size="sm">
                  <i className="fab fa-twitter"></i>
                </Button>
              </div>

              <div className="text-center mt-4">
                <a href="#" className="me-3 link-primary">
                  Forgot password?
                </a>
                <a href="/register" className="link-primary">Create account</a>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
