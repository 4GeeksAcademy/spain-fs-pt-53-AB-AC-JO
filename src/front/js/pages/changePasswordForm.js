import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/changepassword.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"


export const ChangePasswordForm = () => {
  const { store, actions } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setPasswordsMatch(false);
      alert('New password and confirm new password need to match');
      return;
    }

    actions.changepassword(currentPassword, newPassword);
  };


  return (
    <Form className="formulario justify-content-center col-mb-12">
      <Form.Group className="" controlId="currentPassword">
        <Form.Label className="label">Contraseña actual</Form.Label>
        <Form.Control className='text-center input' type="password" placeholder="Contraseña actual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

      </Form.Group>

      <Form.Group className="" controlId="newPassword">
        <Form.Label className="label">Nueva contraseña</Form.Label>
        <Form.Control className='text-center input' type="password" placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="" controlId="confirmNewPassword">
        <Form.Label className="label">Confirmar Nueva contraseña</Form.Label>
        <Form.Control className='text-center input' type="password" placeholder="Confirmar nueva contraseña" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
      </Form.Group>

      <Button className='justify-content-center boton' variant="dark" onClick={handleClick}>
        Enviar
      </Button>
    </Form>
  );
};