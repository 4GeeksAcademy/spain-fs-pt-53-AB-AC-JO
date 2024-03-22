import React, { useContext, useState, useEffect } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";
import { ReviewForm } from "../component/reviewForm";
import { useNavigate } from "react-router-dom"
import "../../styles/addReview.css";


export const AddReview = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const book = location.state?.book;
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

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

    fetch(process.env.BACKEND_URL + 'api/reviews', {
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
        alert("¡Review añadida correctamente!");
        setTimeout(() => {
          navigate("/profile");
        }, 0);
      })
      .catch(error => {
        console.error('Error adding review:', error);
        alert("Vaya, ha ocurrido un error añadiendo tu review...");
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
        <button  onClick={handleClick}>Añadir review</button>
      </div>
    </div>
  )

}
