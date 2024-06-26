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
  const [userVisibility, setUserVisibility] = useState(store.currentUser.visibility || "public");

  const handleClick = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setPasswordsMatch(false);
      alert('La contraseña nueva y confirmar contraseña nueva no coinciden.');
      return;
    }

    actions.changepassword(currentPassword, newPassword);
  };
  const handleSaveVisibility = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + 'api/user/visibility', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        body: JSON.stringify({ visibility: userVisibility }),
      });

      if (!response.ok) {
        throw new Error('Error updating visibility');
      }

      const data = await response.json();
      console.log(data.message);
      alert("La visibilidad de tu perfil ha sido modificada correctamente.");

    } catch (error) {
      console.error(error);
      alert("Uh oh, parece que ha ocurrido un error.");
    }
  };


  return (
    <>
      <Form className="formulario mt-2">
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
      <Form className="visibilidad mt-2">
        <Form.Group className="" controlId="visibility">
          <Form.Label className="label">Visibilidad del perfil: </Form.Label>
          <Form.Select className='text-center input' value={userVisibility} onChange={(e) => setUserVisibility(e.target.value)}>
            <option value="public">Público</option>
            <option value="private">Privado</option>
          </Form.Select>
        </Form.Group>
        <Button className=" btn button-69" onClick={handleSaveVisibility}>
          Actualizar
        </Button>
      </Form>
    </>
  );
};