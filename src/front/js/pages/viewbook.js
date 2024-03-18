import React, { useContext, useState, useEffect } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";


export const ViewBook = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const book = location.state?.book;
  const [comment, setComment] = useState('');

  const bringReviews = () => {
    fetch('https://expert-winner-5gx76wgr744f7w4w-3001.app.github.dev/api/reviews/', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

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

    fetch('https://expert-winner-5gx76wgr744f7w4w-3001.app.github.dev/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMDc4NDI4MiwianRpIjoiNzNmMGI1N2EtYjM1MS00YjcxLTk2M2QtNjM4NDRhZjM1ZWFhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InBydWViYUBwcnVlYmEiLCJuYmYiOjE3MTA3ODQyODIsImNzcmYiOiIxMjFkYzY1NS0zNGFkLTRkYTctOGUzNi1mMThlYzhjNjQ2ZWYiLCJleHAiOjE3MTA3ODUxODJ9.5oIXIvgsOyw8FHDzypnUQ7oU3omiET7ZmVzPYW9wp48 ' 
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
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail} />
      <Card.Body>
        <Card.Title>{book.volumeInfo.title}</Card.Title>
        <Card.Text>
          <strong>Autor(es):</strong>{" "}
          {book.volumeInfo.authors?.map((author, index) => (
            <span key={index}>
              {author}
              {index < book.volumeInfo.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </Card.Text>
        <Card.Text>
          <strong>Fecha de publicación:</strong> {book.volumeInfo.publishedDate}
        </Card.Text>
        <Card.Text>
          <strong>Páginas:</strong> {book.volumeInfo.pageCount}
        </Card.Text>
        <Form.Group controlId="reviewText">
          <Form.Label>Reseña</Form.Label>
          <Form.Control as="textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)} />
        </Form.Group>
        <Button onClick={handleClick}>
          Añadir review
        </Button>
        <Button onClick={bringReviews}>
          Todas las reviews
        </Button>
      </Card.Body>
    </Card>

  )
}



