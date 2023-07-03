import React, { useState } from 'react';
import './Forms.css'
import API_URL from '../../config';
import axios from 'axios';

function RegisterForm() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${API_URL}/signup`, {
      username: username,
      email: email,
      password: password
    }).then((response) => {
      console.log('Registro exitoso! Ahora puedes volver y loguearte');
    }).catch((error) => {
      console.error('Ocurrió un error:', error);
    });
  }

  return (
    <main className='main-f'>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input className='input' type="text" value={username} onChange={handleNameChange} />
          </label>
          <label>
            Email:
            <input className='input' type="email" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Password:
            <input className='input' type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </main>
  );
}

export default RegisterForm;