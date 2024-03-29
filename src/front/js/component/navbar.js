import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";
import "../../styles/navbar.css";
import Logo from "./logo";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const handleClick = () => {
		actions.logout()
	}

	return (
		<nav className="navbar navbar-light" style={{backgroundColor: "#5f5f5f"}}>
			<div className="container">
				<Link to="/">
					<Logo />
				</Link>
				<div className="ml-auto">
					{!store.token ? <Link to="/login">
						<button className="btn btn-success">Log in</button>
					</Link> :
						<button onClick={handleClick} className="btn btn-danger">Log out</button>
					}

				</div>
			</div>
		</nav>
	);
};
