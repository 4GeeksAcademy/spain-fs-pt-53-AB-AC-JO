import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Jumbotron } from "../component/jumbotron"
import { Link, Navigate } from "react-router-dom";



export const Home = () => {
	const { store, actions } = useContext(Context);
	const [isAuthenticated, setIsAuthenticated] = useState(false)


	// useEffect(() => {
	// 	if (store.token && store.token !== null && store.token !== "") {
	// 		setIsAuthenticated(true);
	// 		actions.getMessage();
	// 	} else {
	// 		setIsAuthenticated(false);
	// 	}
	// }, [store.token]);

	return (
		<div className="text-center mt-5">
			<Jumbotron></Jumbotron>
			<p>
				Public reviews swiper
			</p>



		</div>
	);
};