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
    <div className="card-container book-card">
      <Card style={{ width: '30rem'}} className="mb-3">
        <div >
          <div className="book-card-img">
            <Card.Img variant="custom" src={book.volumeInfo.imageLinks?.thumbnail} />
          </div>
          <Card.Body className="card content">
            <Card.Title><strong>{book.volumeInfo.title}</strong></Card.Title>
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
            {/* <Form.Group controlId="reviewText">
            <Form.Label>Reseña</Form.Label>
            <Form.Control as="textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)} />
         </Form.Group> */}
          </Card.Body>
        </div>
      </Card>
    </div>
  )
}