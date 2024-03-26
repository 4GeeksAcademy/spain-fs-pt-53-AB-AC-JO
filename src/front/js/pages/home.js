import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Jumbotron } from "../component/jumbotron"
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export const Home = () => {
	const { store } = useContext(Context);
	const [reviews, setReviews] = useState([]);
	const navigate = useNavigate();
	const location = useLocation();
	const currentUser = sessionStorage.getItem("currentUser");


	
	const handleInfo = (review) => {
		navigate(`/singlereview`, { state: { review: review } });
	};
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
	}, [currentUser]);

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
		<div className="text-center mx-3">
			<Jumbotron></Jumbotron>
			<h2 className="my-5">Aquí puedes ver las reviews de nuestros usuarios:</h2>
			<div className="swiper pb-3 px-3">
				<div className="swiper-wrapper">
					{reviews.filter(review => review.user_id !== parseInt(currentUser))
						.map((review) => (
							<div key={review.review_id} className="swiper-slide home-card">
								<div style={{ height: '275px' }}>
									<React.Fragment>
										<img src={review.book.thumbnail ? review.book.thumbnail : "http://books.google.com/books/content?id=qEAyEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"} alt={review.book.title} />
										<div>
											<h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{review.book.title}</h3>
											<h4>{review.book.author}</h4>
										</div>
									</React.Fragment>

								</div>
								<div className="reviewhome">
									<p className="review-text">Review: {review.comment}</p>
									<p>Usuario: {review.username}</p>
								</div>
								<button className="button-masinfo-home" role="button" id="more-info-button" onClick={() => handleInfo(review)}>Más información</button>
							</div>
						))}
				</div>
				<div className="swiper-pagination"></div>
			</div>
		</div >
	);
}
