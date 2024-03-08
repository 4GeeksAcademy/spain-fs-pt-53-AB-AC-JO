import React from 'react';
import { Card, Button } from 'react-bootstrap';

export const Results = ({ book }) => {
  return (
    <Card style={{ width: '18rem' }} className="mb-4">
      <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail} />
      <Card.Body>
        <Card.Title>{book.volumeInfo.title}</Card.Title>
        <Card.Text>
          <strong>Author(s):</strong>{" "}
          {book.volumeInfo.authors?.map((author, index) => (
            <span key={index}>
              {author}
              {index < book.volumeInfo.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </Card.Text>
        <Card.Text>
          <strong>Published Date:</strong> {book.volumeInfo.publishedDate}
        </Card.Text>
        <Card.Text>
          <strong>Page Count:</strong> {book.volumeInfo.pageCount}
        </Card.Text>
        <Button>Añadir review</Button>
      </Card.Body>
    </Card>
  );
}