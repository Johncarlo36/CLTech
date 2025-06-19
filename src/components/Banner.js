import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({ data }) {
  return (
    <Row className="text-center mt-5">
      <Col>
        <h1>{data?.title || "CLTech Career Program"}</h1>
        <p>{data?.content || "Opportunities for everyone, everywhere"}</p>
        <Link to={data?.destination || "/"}><Button variant="primary">{data?.buttonLabel || "Enroll Now!"}</Button></Link>
      </Col>
    </Row>
  );
}