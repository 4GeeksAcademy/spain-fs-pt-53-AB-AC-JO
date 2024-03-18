import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Profile = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const navigate = useNavigate();

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



	return (
		<div>
			<h1 className="text-center">Profile placeholder</h1>
			{store.message}
		</div>
	);
};