import React, { useState, useContext } from 'react';
import './Forms.css'
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import createAxiosInstance from '../../axiosinstance';
import API_URL from "../../config";

function LoginForm() {
  const { token, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const axiosInstance = createAxiosInstance(token);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    axiosInstance.post(`${API_URL}/login`, {
      email: email,
      password: password
    }).then((response) => {
      console.log('Login successful');
      setError(false);
      setMsg("Login exitoso!");
      // Recibimos el token y lo procesamos
      const access_token = response.data.access_token;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      console.log("Se seteo el token: ", token);
      navigate(`/principal`);
    }).catch((error) => {
      console.error('An error occurred while trying to login:', error);
      console.log("Error: ", error.response.data);
      setError(true);// aquí puede haber más lógica para tratar los errores
    })
  };

  return (
    <main className='main-f'>
      <div className="form-container">
        {msg.length > 0 && <div className="successMsg"> {msg} </div>}
        {error && <div className="error">Hubo un error con el Registro, por favor trata nuevamente.</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input className='input' type="email" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            Password:
            <input className='input' type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    </main>
  );
}
export default LoginForm;