import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
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
		<nav className="navbar sticky-top" boxshadow="0 16px 24px rgba(0,0,0,0.5)">
			<Link to="/">
				<Logo />
			</Link>
			<div className=" navbar-links ml-auto">
				<Link to="/about">
					<button className="button-about" role="button">
						About
					</button>
				</Link>
				{!store.token ? (
					<div className="navbar-buttons">
						<Link to="/login">
							<button className="button-68" role="button">Log in</button>
						</Link>
						<Link to="/signup">
							<button className="button-69" role="button"> Signup </button>
						</Link>
					</div>
				) : (
					<div className="navbar-buttons">
						<button onClick={handleClick} className="button-70" role="button">
							<i className="fa-sharp fa-solid fa-right-from-bracket"></i>
						</button>
						<Link to="/profile">
							<button className="button-68" role="button">
								<i className="fa-regular fa-user"></i>
							</button>
						</Link>
						<button className="button-71" role="button" onClick={handleModify}>
							<i className="fa-solid fa-gear"></i>
						</button>
					</div>
				)}
			</div>
		</nav>
	);
}