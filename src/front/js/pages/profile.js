import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Button } from 'react-bootstrap';
import { Search } from "../component/search";
import "../../styles/profile.css";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const navigate = useNavigate();
	const [reviews, setReviews] = useState([]);
	const deleteButtonsRef = useRef([]);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


	const handleModifyReview = (review) => {
		navigate('/modifyreview', { state: { review: review, review_id: review.review_id } });
	};
	const fetchReviews = async () => {
		try {
			const response = await fetch(process.env.BACKEND_URL + 'api/reviews/current_user',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					},
				}
			);

			if (!response.ok) {
				if (response.status === 401) {

				} else {

				}
				return;
			}

			const reviews = await response.json();
			setReviews(reviews);
		} catch (error) {
		}

	};

	useEffect(() => {
		fetchReviews();
	}, []);

	useEffect(() => {
		actions.syncToken();
	}, []);

	useEffect(() => {
		if (store.token === "" || store.token === null) {
			navigate("/");
		} else {
			actions.getUser();
		}
	}, [store.token])


	const deleteReview = async (reviewId) => {
		try {
			const response = await fetch(process.env.BACKEND_URL + `api/reviews/${reviewId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + sessionStorage.getItem('token')
				},
			});

			if (!response.ok) {
				throw new Error('Error deleting review');
			}

			const data = await response.json();
			alert('La review ha sido eliminada!');

			// Find the index of the button in the deleteButtonsRef array
			const buttonIndex = deleteButtonsRef.current.findIndex(button => button.dataset.id === reviewId);

			// Remove the corresponding review from the reviews array
			if (buttonIndex !== -1) {
				setReviews(reviews => reviews.filter(review => review.review_id !== parseInt(reviewId)));
			}
		} catch (error) {
		}
		setShowDeleteConfirmation(true);
	};

	useEffect(() => {
		if (showDeleteConfirmation) {
			fetchReviews();
			setShowDeleteConfirmation(false);
		}
	}, [showDeleteConfirmation]);

	return (
		<div>
			<Search></Search>
			<h1 className="text-center">Mis reviews</h1>
			<div className="reviews-container">
				{reviews.map((review) => (
					<div key={review.review_id}>
						<Card style={{ width: '18rem' }} className="mb-3">
							<img style={{ height: "250px", objectFit: "scale-down" }} src={review.book.thumbnail ? review.book.thumbnail : "http://books.google.com/books/content?id=qEAyEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"} alt={review.book.title} />
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
								<button className="button-modify" role="button" onClick={() => handleModifyReview(review)}>Modificar review</button>
								<button className="button-delete" role="button"
									data-id={review.review_id}
									ref={el => deleteButtonsRef.current.push(el)}
									onClick={() => deleteReview(review.review_id)}
								>
									Eliminar review
								</button>
							</Card.Body>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
}

