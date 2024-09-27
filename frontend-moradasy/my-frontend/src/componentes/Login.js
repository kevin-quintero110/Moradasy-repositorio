import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
import logo from '../img/moradasylogo.png';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        name,
        password,
      });
      setMessage(response.data.message);
      setIsSuccess(true); // Establecer éxito
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Credenciales inválidas");
        setIsSuccess(false);
      } else {
        setMessage("Error en el servidor");
        setIsSuccess(false); 
      }
    }
  };

  return (


    <>
    
    <body>

    <div className='logo'>
        <img src={logo} alt="Logo" />
      </div>

      <div className='inputs'>
        <h1 className='texto-especial'>INGRESA A MORADASY STORE</h1>
        <form id='loginForm' onSubmit={handleLogin}>
          <input
            type="text"
            placeholder='USUARIO'
            name="text"
            id="email"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="CONTRASEÑA"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='texto-especial'>Iniciar sesión</button>
        </form>
        {message && (
          <p className={isSuccess ? 'success-message' : 'error-message'}>
            {message}
          </p>
        )}

      </div>

    </body>
    </>
    
  );
};

export default Login;
