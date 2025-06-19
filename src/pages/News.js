import { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import NewsCard from "../components/NewsCard";
import UserContext from '../context/UserContext';

export default function News() {
  const { user } = useContext(UserContext);
  const isLoggedIn = user.id !== null;

  const [news, setNews] = useState([]);
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    // Fetch all active news
    fetch("http://localhost:4000/news/")
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array before calling map
        if (Array.isArray(data)) {
          setNews(data.map(news => (
            <NewsCard key={news._id} newsProp={news} />
          )));
        } else {
          console.error("Received data is not an array:", data);
        }
      })
      .catch(err => console.error("Error fetching news:", err));
  }, []);

  useEffect(() => {
    setIsSubmitEnabled(email.trim() !== '' && feedback.trim() !== '');
  }, [email, feedback]);

  const sendFeedback = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback. We'll get back to you as soon as we can.");
    setEmail('');
    setFeedback('');
  };

  return (
    <>
      <Row className='mt-5'>
        <Col className='pt-md-5 mt-5'>
          <h1>News</h1>
        </Col>
      </Row>
      {news}

      {isLoggedIn && (
        <Row className='mt-5'>
          <Col md={6} className='mx-auto'>
            <h2>Feedback</h2>
            <Form onSubmit={sendFeedback}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFeedback">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Let us know what you think."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Form.Group>

              <Button variant={isSubmitEnabled ? "primary" : "danger"} type="submit" disabled={!isSubmitEnabled}>
                Send Feedback
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
}
