import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

export default function NewsCard({ newsProp }) {
  const { name, description } = newsProp;
  const [likes, setLikes] = useState(0); 

  function likeNews() {
      if (likes < 10) {
        setLikes(likes + 1);
      } else {
        alert("Promo Alert: Since this news has reached a certain number of likes, we would like to offer a discount on your next class.");
      }
    }

  return (
    <Card id="NewsCard" style={{ width: '100%' }} className="mx-auto text-center">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text><strong>Likes:</strong> {likes}</Card.Text>
        <Button variant="primary" onClick={likeNews}>Like</Button>
      </Card.Body>
    </Card>
  );
}