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
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6">
          <ReviewForm></ReviewForm>
        </div>
        <div className="col-12 col-md-6 mt-4">
          <Form.Group controlId="reviewText">
            <Form.Label className="mb-2"><b>Review: </b></Form.Label>
            <hr className="mb-4" />
            <Form.Control as="textarea" rows={8} className="w-75" value={comment} onChange={e => setComment(e.target.value)} />
          </Form.Group>
          <hr />
          <button className="button-71" role="button" onClick={handleClick}>Añadir review</button>
        </div>
      </div>
    </div>
  )
}
