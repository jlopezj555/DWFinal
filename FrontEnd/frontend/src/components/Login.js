// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import CrearUsuario from './CrearUsuario';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isRegister) {
      try {
        const response = await axios.post('http://localhost:3001/api/usuarios/login', {
          email: formData.username,
          contraseña: formData.password,
        });
  
        // Extrae el nombre, rol, token y userId del usuario desde la respuesta
        const { nombre, rol, token, userId } = response.data;
  
        // Guarda el token en localStorage para futuras peticiones
        localStorage.setItem('token', token);
  
        setNombreUsuario(nombre);
        setError('');
  
        // Llama a onLogin con el rol, el nombre y el userId del usuario
        onLogin(rol, nombre, userId);
  
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('Usuario/Contraseña incorrecta');
        } else if (error.response && error.response.status === 401) {
          setError('Usuario/Contraseña incorrecta');
        } else {
          setError('Error al iniciar sesión. Inténtalo de nuevo.');
        }
      }
    }
  };
  

  return (
    <div className="login-containerL">
      {isRegister ? (
        <CrearUsuario />
      ) : (
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Correo Electrónico:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button type="submit">Entrar</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {nombreUsuario && <p className="welcome-message">Bienvenido/a, {nombreUsuario}!</p>}
          <button onClick={() => setIsRegister(true)} className="toggle-button">
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      )}<br></br>
      {isRegister && (
        <button onClick={() => setIsRegister(false)}>
          ¿Ya tienes una cuenta? Inicia sesión
        </button>
      )}
    </div>
  );
};

export default Login;

