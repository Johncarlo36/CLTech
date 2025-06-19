import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PreviewCourses.css';

export default function PreviewCourses({ breakPoint, data }) {
  const { _id, name, description, price, isActive } = data;

  return (
    <Col
      xs={12}
      md={breakPoint}
      className="mb-4 mt-3 mx-auto" // bottom, top, and center horizontally
    >
      <Card className={`h-100 shadow-sm preview-card ${isActive ? 'active-card' : 'inactive-card'}`}>
        <Card.Body className="d-flex flex-column p-3">
          <Card.Title className="text-center mb-2">
            <Link
              to={`/courses/${_id}`}
              className={`stretched-link text-decoration-none title-link ${isActive ? '' : 'text-muted'}`}
            >
              {name}
            </Link>
          </Card.Title>
          <Card.Text className="flex-grow-1 scroll-desc mb-3">
            {description}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-white border-0 py-2">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 price-color">₱{price.toFixed(2)}</h5>
            <Button
              as={Link}
              to={`/courses/${_id}`}
              variant={isActive ? 'primary' : 'secondary'}
              aria-label={`View details for ${name}`}
              disabled={!isActive}
            >
              {isActive ? 'Details' : 'Inactive'}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
}
