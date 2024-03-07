import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	console.log(store, "Estoy en la home")
	useEffect(() => {
		if (store.token && store.token !== null && store.token !== "") {
			setIsAuthenticated(true);
			actions.getMessage();
		} else {
			setIsAuthenticated(false);
		}
	}, [store.token]);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			{isAuthenticated ? <div className="alert alert-info">
				{store.message}
			</div> : <div className="alert alert-info"> To know more about the app please log in </div>}
			<p>
				Work in progress.
			</p>
		</div>
	);
};