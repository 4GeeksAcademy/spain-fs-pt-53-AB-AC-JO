import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "../../styles/navbar.css";
import Logo from "./logo";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const handleClick = () => {
		actions.logout()
	}
	const navigate = useNavigate();
	const handleModify = () => {
		navigate('/updateprofile')
	}

	return (
		<nav className="navbar navbar-light sticky-top" style={{ backgroundColor: "#5F5F5F" }} boxshadow="0 16px 24px rgba(0,0,0,0.5)">
			<Link to="/">
				<Logo />
			</Link>
			<div className=" ml-auto">
				{!store.token ? <Link to="/login">
					<button className="button-68" role="button">Log in</button>
					<Link to="/signup">
						<button className="button-69" role="button"> Signup </button>
					</Link>
				</Link> :
					<div>
						<button onClick={handleClick} className="button-70" role="button">Log out</button>
						<Link to="/profile"><button className="button-68" role="button">Profile</button></Link>
						<button className="button-71" role="button" onClick={handleModify}>Modificar datos</button>
					</div>
				}
			</div>
		</nav>
	);
};