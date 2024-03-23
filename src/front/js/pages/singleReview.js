import React, { useContext, useState, useEffect } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const SingleReview = () => {
    const { state: { review } } = useLocation();
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    return (
        <div>
            {review ? (
                <Card style={{ width: '18rem' }} className="mb-3">
                    {review.book ? (
                        <Card.Img variant="top" src={review.book.small_thumbnail} />
                    ) : (
                        <p> Loading Book Thumbnail...</p>
                    )}
                    <Card.Body>
                        <Card.Title>{review.book.title}</Card.Title>
                        <Card.Text>
                            <strong>Autor(es):</strong>{" "}
                            {review.book.author}
                        </Card.Text>
                        <Card.Text>
                            <strong>Páginas:</strong> {review.book.pages}
                        </Card.Text>
                        <Card.Text>
                            <strong>Fecha de publicación:</strong> {new Date(review.book.published_year).toLocaleDateString()}
                        </Card.Text>
                        <Card.Text>
                            <strong>Review:</strong> {review.comment}
                        </Card.Text>
                        <Card.Text>
                            <strong>Usuario: </strong>  {review.username}
                        </Card.Text>
                        <Button onClick={() => navigate(-1)}>Volver atrás</Button>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
            </div>
    )
            }