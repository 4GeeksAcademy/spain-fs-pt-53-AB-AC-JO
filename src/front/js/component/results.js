import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

export const Results = ({ book }) => {

  const navigate = useNavigate();
  const handleAddReview = () => {
    navigate('/viewbook', { state: { book: book } });
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
        <Button onClick={handleAddReview}>
          Añadir review
        </Button>
      </Card.Body>
    </Card>

  );
}