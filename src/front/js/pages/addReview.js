import React, { useContext, useState, useEffect } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";
import { ReviewForm } from "../component/reviewForm";
import "../../styles/addReview.css";

export const ViewBook = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const book = location.state?.book;
  const [comment, setComment] = useState('');

  // const bringReviews = () => {
  //   fetch('https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3001.app.github.dev/api/reviews/', {
  //     method: 'GET',
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error(error));
  // }

  const handleClick = () => {
    const reviewData = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(', '),
      published_year: book.volumeInfo.publishedDate,
      pages: book.volumeInfo.pageCount,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      small_thumbnail: book.volumeInfo.imageLinks?.smallThumbnail,
      google_id: book.id,
      comment: comment
    };

    fetch('https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3001.app.github.dev/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
      body: JSON.stringify(reviewData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error adding review');
        }
      })
      .then(data => {
        console.log('Review added successfully:', data);
        // Handle successful review addition
      })
      .catch(error => {
        console.error('Error adding review:', error);
        // Handle error adding review
      });
  };

  return (
    <div className="conatainer d-flex">
      <div className="col-4">
        <ReviewForm></ReviewForm>
      </div>
      <div className="col-8"> 
        <Form.Group controlId="reviewText">
          <Form.Label>Reseña</Form.Label>
          <Form.Control  as="textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)}  />

        </Form.Group>

        <Button onClick={handleClick}>Añadir review</Button>
      </div>
    </div>
  )

}
