import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ReviewForm(props) {
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
    <Form.Group controlId="reviewText">
      <Form.Label>Reseña</Form.Label>
      <Form.Control as="textarea" rows={3} value={review} onChange={e => setReview(e.target.value)} />
      <div className="button-container">
        <Button variant="custom" onClick={handleSaveReview}>Guardar Reseña</Button>
      </div>
    </Form.Group>
  );
}

export default ReviewForm;
