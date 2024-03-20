import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Button } from 'react-bootstrap';
import { Search } from "../component/search";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const navigate = useNavigate();
	const [reviews, setReviews] = useState([]);
	const deleteButtonsRef = useRef([]);
	const [showModal, setShowModal] = useState(false);

	const handleModifyReview = (review) => {
		navigate('/modifyreview', { state: { review: review, review_id: review.review_id } });
	};
	const fetchReviews = async () => {
		try {
			const response = await fetch(
				'https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3001.app.github.dev/api/reviews/current_user',
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
					// Handle unauthorized errors (e.g., token expired or invalid)
					console.error('Unauthorized');
				} else {
					// Handle other errors
					console.error('Error:', response.statusText);
				}
				return;
			}

			const reviews = await response.json();
			setReviews(reviews); // Update the state with parsed reviews here
			console.log('Current user reviews:', reviews);
			// Process the reviews data as needed
		} catch (error) {
			console.error('Error:', error);
		}

	};

	// Call the fetchReviews function
	useEffect(() => {
		fetchReviews();
	}, []);

	console.log(store, "Estoy en el profile")
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
			const response = await fetch(`https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3001.app.github.dev/api/reviews/${reviewId}`, {
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
			console.log(data.message);
			alert('La review ha sido eliminada!');

			// Find the index of the button in the deleteButtonsRef array
			const buttonIndex = deleteButtonsRef.current.findIndex(button => button.dataset.id === reviewId);

			// Remove the corresponding review from the reviews array
			if (buttonIndex !== -1) {
				setReviews(reviews => reviews.filter(review => review.review_id !== parseInt(reviewId)));
			}
		} catch (error) {
			console.error(error);
		}
	};
	
	return (
		<div>
			<Search></Search>
			<div>
				{reviews.map((review) => (
					<div key={review.review_id}>
						<Card style={{ width: '18rem' }} className="mb-3">
							<Card.Img variant="top" src={review.book.small_thumbnail} />
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
									<strong>Comentario:</strong> {review.comment}
								</Card.Text>
								<Button onClick={() => handleModifyReview(review)}>Modificar review</Button>
								<button
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

