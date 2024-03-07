import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Add state for confirm password
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (password === confirmPassword) { // Check if passwords match
            const success = await actions.register(email, password);
            if (success) {
                navigate("/login");
            }
        } else {
            alert("Passwords do not match.");
        }
    };

    return (
        <div className="container text-center mt-5 d-flex justify-content-center">
            <div className="col-md-6">
                <h1>Welcome, Register here:</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className='text-center' type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className='text-center' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control className='text-center' type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <div className="text-center">
                        <Button className='justify-content-center' variant="dark" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};