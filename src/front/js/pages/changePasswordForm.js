// import React, { Component } from 'react';
// import "../../styles/changepassword.css";
// import { Context } from "../store/appContext";


// class ChangePasswordForm extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       oldPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//       error: ''
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

//     if (this.state.newPassword !== this.state.confirmPassword) {
//       this.setState({
//         error: 'New password and confirm password do not match.'
//       });
//       return;
//     }

//     fetch('https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3001.app.github.dev/api/change_password', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + sessionStorage.getItem('token')
//       },
//       body: JSON.stringify({
//         current_password: this.state.oldPassword,
//         new_password: this.state.newPassword
//       })
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         this.setState({
//           oldPassword: '',
//           newPassword: '',
//           confirmPassword: '',
//           error: ''
//         });
//         this.props.onSuccess();
//       })
//       .catch(error => {
//         if (error.response && error.response.data && error.response.data.error) {
//           this.setState({
//             error: error.response.data.error
//           });
//         } else {
//           this.setState({
//             error: 'An error occurred while changing your password.'
//           });
//         }
//       });
//   }

//   render() {
//     return (
//       <form className='form-group' onSubmit={this.handleSubmit }>
//         <div>
//           <label className="oldPassword" style={{ marginBottom: '5px', textAlign: 'center' }}>Old password:</label>
//           <input
//             type="password"
//             name="oldPassword"
//             value={this.state.oldPassword}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div>
//           <label className="newPassword" style={{ textAlign: 'center' }}>New password:</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={this.state.newPassword}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div>
//           <label className="confirmPassword" style={{ textAlign: 'center' }}>Confirm password:</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={this.state.confirmPassword}
//             onChange={this.handleChange}
//           />
//         </div>
//         {this.state.error && <p style={{ textAlign: 'center' }}>{this.state.error}</p>}
//         <button type="submit">Change password</button>
//       </form>
//     );
//   }
// }

// export default ChangePasswordForm;

import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"


export const ChangePasswordForm = () => {
  const { store, actions } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  const handleClick = () => {
		actions.changepassword(currentPassword, newPassword)
	};

  

  return (
    <Form>
      <Form.Group className="mb-3" controlId="currentPassword">
        <Form.Label>Contraseña actual</Form.Label>
        <Form.Control className='text-center' type="password" placeholder="Contraseña actual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

      </Form.Group>

      <Form.Group className="mb-3" controlId="newPassword">
        <Form.Label>Nueva contraseña</Form.Label>
        <Form.Control className='text-center' type="password" placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmNewPassword">
        <Form.Label>Confirmar Nueva contraseña</Form.Label>
        <Form.Control className='text-center' type="password" placeholder="Confirmar nueva contraseña" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
      </Form.Group>

      <Button className='justify-content-center' variant="dark" onClick={handleClick}>
        Enviar
      </Button>
    </Form>
  );
};