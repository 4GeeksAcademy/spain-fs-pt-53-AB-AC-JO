import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

// modificar como nos convenga
function ViewBook(props) {
  const [review, setReview] = useState('');

  const handleSaveReview = () => {
    const reviewData = {
      book_id: props.bookId,
      review: review
    };

    fetch('/api/reviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Review saved successfully:', response);
        } else {
          throw new Error('Error saving review');
        }
      })
      .catch(error => {
        console.error('Error saving review:', error);
      });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ width: '18rem' }} >
        <Card.Img variant="top" src={props.imagePath} /> 
        <Card.Img variant="top" src={"https://media.istockphoto.com/id/519749884/es/foto/brit%C3%A1nico-carril-de-homenaje-a-harry-potter-en-cruz-estaci%C3%B3n-reyes.jpg?s=1024x1024&w=is&k=20&c=6e8uPo5bdXtO9zfiuroAGoYLMLnNMiWm1JloL2Mb2ss="} /> 
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <div>
            <h3>harry potter y la piedra filosofal</h3>
          </div>
          <Card.Subtitle className="mb-2 text-muted">{props.author}</Card.Subtitle>
          <div>
            <h5>J. K. Rowling</h5>
          </div>
          <Card.Text>
            {props.year}
            <div>
              <p>1997</p>
            </div>
          </Card.Text>
          <Form.Group controlId="reviewText">
            <Form.Label>Reseña</Form.Label>
            <Form.Control as="textarea" rows={3} value={review} onChange={e => setReview(e.target.value)} />
          </Form.Group>
            <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" onClick={handleSaveReview}>Guarda Reseña</Button>
            </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewBook;