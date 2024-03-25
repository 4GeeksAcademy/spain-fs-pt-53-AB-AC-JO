import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

export const Results = ({ book }) => {

  const navigate = useNavigate();
  const handleAddReview = () => {
    navigate('/addreview', { state: { book: book } });
  };
  const bookImage = book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks?.thumbnail : "https://media.istockphoto.com/id/157482029/es/foto/pila-de-libros.jpg?s=612x612&w=0&k=20&c=KYCi5g_Y3D6chjEYCFm7EP3NUKHExrO3jXHrs9ZtV04=";
  return (
    <Card style={{ margin: "0 auto" }} className="mb-3">
      <Card.Img style={{ height: "250px", objectFit: "scale-down" }} variant="top" src={bookImage} />
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
        <button className="button-71" role="button" onClick={handleAddReview}>
          Añadir review
        </button>
      </Card.Body>
    </Card>

  );
}