import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import "../../styles/viewbook.css";

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
          setReview(''); // Limpiar el campo de reseña después de guardar
        } else {
          throw new Error('Error saving review');
        }
      })
      .catch(error => {
        console.error('Error saving review:', error);
        // Podrías mostrar un mensaje de error al usuario aquí
      });
  };

  return (
    <div className='container'>
      <Card className="book-card">
        <div className="card-body">
          <div className="left-content">
            <Card.Img variant="top" src={props.imagePath} className="book-image" />
          </div>
          <div className="right-content">
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.author}</Card.Subtitle>
            <Card.Text>
              Publicado en {props.year}
            </Card.Text>
            <Form.Group controlId="reviewText">
              <Form.Label>Reseña</Form.Label>
              <Form.Control as="textarea" rows={3} value={review} onChange={e => setReview(e.target.value)} />
            </Form.Group>
            <div className="button-container">
              <Button variant="custom" onClick={handleSaveReview}>Guardar Reseña</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ViewBook;


