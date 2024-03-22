import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Jumbotron } from "../component/jumbotron"
import { Link, Navigate } from "react-router-dom";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export const Home = () => {
	const { store } = useContext(Context);
	const [reviews, setReviews] = useState([]);
	
	
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(process.env.BACKEND_URL + '/api/reviews');
			if (!response.ok) {
				throw new Error('Error fetching reviews');
			}
			const data = await response.json();
			setReviews(data);
		};

		fetchData().catch(err => console.error(err));
	}, []);

	useEffect(() => {
		if (reviews.length) {
			new Swiper(".swiper", {
				slidesPerView: 3,
				spaceBetween: 30,
				pagination: {
					clickable: true,
				},
				autoplay: {
					delay: 5000,
					disableOnInteraction: true,
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 20
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 30
					}
				}
			});

			// Create navigation arrows
			const nextButton = document.querySelector(".swiper-button-next");
			const prevButton = document.querySelector(".swiper-button-prev");

			if (nextButton && prevButton) {
				nextButton.addEventListener("click", () => {
					const swiper = new Swiper(".swiper", {
						// Swiper options here
					});
					swiper.slideNext();
				});

				prevButton.addEventListener("click", () => {
					const swiper = new Swiper(".swiper", {
						// Swiper options here
					});
					swiper.slidePrev();
				});
			}
		}
	}, [reviews]);

	return (
		<div className="text-center mt-5" >
			<Jumbotron></Jumbotron>
			<h2>Aquí puedes ver las reviews de nuestros usuarios:</h2>
			<div className="swiper">
				<div className="swiper-wrapper">
					{reviews.map((review) => (
						<div key={review.review_id} className="swiper-slide">
							<img src={review.book.thumbnail} alt={review.book.title} />
							<h3>{review.book.title}</h3>
							<h4>{review.book.author}</h4>
							<p>Review: {review.comment}</p>
							<p>Usuario: {review.username}</p>
							<button>Más información</button>
						</div>
					))}
				</div>
				<div className="swiper-pagination"></div>
			</div>
		</div >
	);
}