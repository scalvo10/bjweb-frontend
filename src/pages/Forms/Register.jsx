import React, { useState } from 'react';
import './Forms.css'
function RegisterForm() {
  const [name, setName] = useState('');
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

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        username: username,
        email: email,
        password: password
      }).then((response) => {
        console.log('Registro exitoso! Ahora puedes volver y loguearte');
        setError(false);
        setMsg('Registro exitoso! Ahora puedes volver y loguearte');
      }).catch((error) => {      
      console.error('Ocurrió un error:', error);
      setError(true); // aquí puede haber más lógica para tratar los errores
      });
    }

  return (
    <main className='main-f'>
        <div className = "form-container">
            <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input className='input' type="text" value={name} onChange={handleNameChange} />
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