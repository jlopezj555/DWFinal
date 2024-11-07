// CrearUsuario.js
import React, { useState } from 'react';
import axios from 'axios';
import './CrearUsuario.css'; // Importa el archivo CSS

const CrearUsuario = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar la solicitud con el rol predeterminado "usuario"
      const response = await axios.post('http://localhost:3001/api/usuarios/crearUsuario', { ...form, rol: 'usuario' });
      alert('Usuario creado exitosamente');
      console.log(response.data);

      setForm({
        nombre: '',
        email: '',
        contraseña: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error al crear el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="crear-usuario-form">
      <h2>Crear Usuario</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="contraseña"
        placeholder="Contraseña"
        value={form.contraseña}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default CrearUsuario;
