import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../styles/signup.css";


export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Add state for confirm password
    const [visibility, setVisibility] = useState("public")
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (password !== "" && password === confirmPassword) { // Check if passwords match
            const success = await actions.register(email, password, user, visibility);
            if (success) {
                navigate("/login");
            }
        } else {
            alert("Las contraseñas no coinciden.");
        }
    };

    return (
        <div className="container text-center mt-5 d-flex justify-content-center">
            <div className="col-md-6">
                <h5>Bienvenid@, registrate aquí</h5>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className='text-center' type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUSer">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control className='text-center' type="text" placeholder="usuario" value={user} onChange={(e) => setUser(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control className='text-center' type="password" placeholder="contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control className='text-center' type="password" placeholder="confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="visibility">
                        <Form.Label>Visibilidad del perfil</Form.Label>
                        <Form.Select onChange={(e) => setVisibility(e.target.value)}>
                            <option value="public">Pública</option>
                            <option value="private">Privada</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="text-center">
                        <Button className='justify-content-center mt-3' variant="dark" onClick={handleSubmit}>
                            Enviar
                        </Button>
                    </div>
                    <div>
                        <a href="#" className="text-decoration-none" onClick={() => { navigate("/login"); }}>
                            ¿Ya estás registrado? Haz click aquí para logarte
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    );
};