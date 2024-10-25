import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {  // Recibe la función onLogin como prop
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    
    if (formData.username === 'admin' && formData.password === '12345') {
      alert(`Bienvenido ${formData.username}`);
      onLogin();  // Llama a la función de onLogin cuando el usuario inicia sesión
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario:</label>
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
    </div>
  );
};

export default Login;

