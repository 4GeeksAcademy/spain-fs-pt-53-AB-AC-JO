import React, { useContext, useState, useEffect } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";


export const ModifyReview = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const { review, review_id } = location.state;
  const [comment, setComment] = useState('');

  const handleSaveChanges = async () => {
  
    try {
      const response = await fetch(`https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3001.app.github.dev/api/reviews/${review_id}`, {
        method: 'PUT',
        headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + sessionStorage.getItem('token')
				},
        body: JSON.stringify({ comment: comment }),
      });

      if (!response.ok) {
        throw new Error('Error updating review');
      }

      const data = await response.json();
      console.log(data.message);

      // Update the review in the reviews array
      setReviews(reviews =>
        reviews.map(review =>
          review.review_id === review_id ? { ...review, comment: updatedComment.comment } : review
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }} className="mb-3">
        <Card.Img variant="top" src={review?.book?.small_thumbnail} />
        <Card.Body>
          <Card.Title>{review?.book?.title}</Card.Title>
          <Card.Text>
            <strong>Autor(es):</strong>{" "}
            {review?.book?.author}
          </Card.Text>
          <Card.Text>
            <strong>Páginas:</strong> {review?.book?.pages}
          </Card.Text>
          <Card.Text>
            <strong>Fecha de publicación:</strong> {new Date(review?.book?.published_year).toLocaleDateString()}
          </Card.Text>
          <Card.Text>
            <strong>Review anterior:</strong> {review?.comment}
          </Card.Text>
          <Form.Group controlId="reviewText">
            <Form.Label><strong>Review nueva:</strong></Form.Label>
            <Form.Control as="textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)} />
          </Form.Group>
          <Button onClick={handleSaveChanges}>Modificar review</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

