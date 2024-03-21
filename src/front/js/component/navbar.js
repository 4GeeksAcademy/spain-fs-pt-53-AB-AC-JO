import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "../../styles/navbar.css";
import Logo from "./logo";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const handleClick = () => {
		actions.logout()
	}
	return (
		<nav className="navbar navbar-light sticky-top" style={{ backgroundColor: "#5F5F5F" }} boxshadow="0 16px 24px rgba(0,0,0,0.5)">
			<Link to="/">
				<Logo />
			</Link>
			<div className=" ml-auto">
				{!store.token ? <Link to="/login">
					<Button className="btn btn-success btn-sm">Log in</Button>
					<Link to="/signup">
						<Button variant="info"> Signup </Button>
					</Link>
				</Link> :
					<div>
						<button onClick={handleClick} className="btn btn-danger btn-sm">Log out</button>
						<Link to="/profile"><Button variant="outline-warning">Profile</Button></Link>
					</div>


				}
			</div>
		</nav>
	);
};