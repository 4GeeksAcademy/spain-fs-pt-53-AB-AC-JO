import React, { Component } from 'react';
import "../../styles/changepassword.css";


class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        error: 'New password and confirm password do not match.'
      });
      return;
    }

    fetch('/api/change-password', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.setState({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          error: ''
        });
        this.props.onSuccess();
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          this.setState({
            error: error.response.data.error
          });
        } else {
          this.setState({
            error: 'An error occurred while changing your password.'
          });
        }
      });
  }

  render() {
    return (
      <form className='form-group' onSubmit={this.handleSubmit }>
        <div>
          <label className="oldPassword" style={{ marginBottom: '5px', textAlign: 'center' }}>Old password:</label>
          <input
            type="password"
            name="oldPassword"
            value={this.state.oldPassword}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label className="newPassword" style={{ textAlign: 'center' }}>New password:</label>
          <input
            type="password"
            name="newPassword"
            value={this.state.newPassword}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label className="confirmPassword" style={{ textAlign: 'center' }}>Confirm password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </div>
        {this.state.error && <p style={{ textAlign: 'center' }}>{this.state.error}</p>}
        <button type="submit">Change password</button>
      </form>
    );
  }
}

export default ChangePasswordForm;