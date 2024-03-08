import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"




export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();


	const handleClick = () => {
		actions.login(email, password)
	};


	if (store.token && store.token != "" && store.token != null) navigate("/")

	return (

		<div className="row justify-content-center">
			<div className="text-center">
				<h1>Login</h1>
			</div>
			<div className='col-md-3'>
				{(store.token && store.token != "" && store.token != undefined) ? "You are logged in with this token: " + store.token :

					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control className='text-center' type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control className='text-center' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</Form.Group>
						<div className="text-center mt-3">
							<Button className='justify-content-center' variant="dark" onClick={handleClick}>
								Submit
							</Button>
						</div>
						<div className="text-center mt-3">
							Want to sign up? <Button variant="info" onClick={() => navigate("/signup")}>Click here</Button>
						</div>
					</Form>

				}
			</div>
		</div>
	);
};