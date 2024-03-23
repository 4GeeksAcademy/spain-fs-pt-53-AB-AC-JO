import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "../../styles/navbar.css";
import Logo from "../component/logo"

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
		<nav className="navbar" boxshadow="0 16px 24px rgba(0,0,0,0.5)">
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
						<button onClick={handleClick} className="button-70" role="button">
						<i class="fa-sharp fa-solid fa-right-from-bracket"></i></button>
						<Link to="/profile"><button className="button-68" role="button"><i class="fa-regular fa-user"></i></button></Link>
						<button className="button-71" role="button" onClick={handleModify}><i class="fa-solid fa-gear"></i></button>
					</div>
				}
			</div>
		</nav>
	);
};