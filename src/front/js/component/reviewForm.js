import React, { useContext, useState, useEffect } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/reviewform.css";

export const ReviewForm = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const book = location.state?.book;
  const [comment, setComment] = useState('');



  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail} />
      <Card.Body >
        <Card.Title>{book.volumeInfo.title}</Card.Title>
        <div>
          <strong>Autor(es):</strong>{" "}
          {book.volumeInfo.authors?.map((author, index) => (
            <span key={index}>
              {author}
              {index < book.volumeInfo.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div>
          <h6><strong>Fecha de publicación:</strong>
           {book.volumeInfo.publishedDate}</h6>
        </div>
        <div>
          <strong>Páginas:</strong> {book.volumeInfo.pageCount}
        </div>
        {/* <Form.Group controlId="reviewText">
          <Form.Label>Reseña</Form.Label>
          <Form.Control as="textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)} />
        </Form.Group> */}
      </Card.Body>
    </Card>

  )
}