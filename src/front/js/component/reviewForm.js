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
  const bookImage = book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks?.thumbnail : "http://books.google.com/books/content?id=qEAyEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api";


  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img variant="top" src={bookImage} />
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
          <h6><strong>Fecha de publicación:</strong> {book.volumeInfo.publishedDate}</h6>
        </div>
        <div>
          <strong>Páginas:</strong> {book.volumeInfo.pageCount}
        </div>
      </Card.Body>
    </Card>

  )
}