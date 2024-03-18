import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import ReviewForm from '../component/ ReviewForm';
import "../../styles/viewbook.css";

function ViewBook(props) {
  return (
    <div className='container'>
      <Card className="book-card">
        <div className="card-body">
          <div className="left-content">
            <Card.Img variant="top" src={props.imagePath} className="book-image" />
          </div>
          <div className="right-content">
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.author}</Card.Subtitle>
            <Card.Text>
              Publicado en {props.year}
            </Card.Text>
            {/* Integra el componente de formulario de reseña aquí */}
            <ReviewForm bookId={props.bookId} />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ViewBook;



