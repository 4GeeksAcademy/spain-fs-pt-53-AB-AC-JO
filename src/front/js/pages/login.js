import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/login.css";
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
			.then(response => {
				if (response.error) {
					setError(response.error);
				} else {
					if (response.status === 200) {
						navigate("/");
					}
				}
			})
			.catch(error => {
				setError(error);
			});
	};


	if (store.token && store.token != "" && store.token != null) navigate("/")

	return (

		<div className="container justify-content-center">
			<div className="text-center">
				<h1>Login</h1>
			</div>
			<div className='col-md-12'>
				{(store.token && store.token != "" && store.token != undefined) ? "You are logged in with this token: " + store.token :

					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control className='text-center' type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Contraseña</Form.Label>
							<Form.Control className='text-center' type="password" placeholder="contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
						</Form.Group>
						<div className="text-center mt-3">
							<Button className='justify-content-center enviar' onClick={handleClick}>
								Enviar
							</Button>
						</div>
						<div className="text-center mt-3">
							¿Quieres registrarte?
							<hr />
							<Button className="button-69" role="button" onClick={() => navigate("/signup")}>Haz click aquí</Button>
						</div>
					</Form>

				}
			</div>
		</div>
	);
};