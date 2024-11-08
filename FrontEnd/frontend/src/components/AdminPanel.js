import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener el token almacenado en el localStorage
    const token = localStorage.getItem('token');

    // Solicitar todas las reservas al backend
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/reservas/ObtenerReservas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReservas(response.data); // Almacenar las reservas en el estado
      } catch (err) {
        setError('Error al cargar las reservas');
        console.error(err);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="admin-panel-container">
      <h2>Panel de Administración</h2>
      {error && <p className="error-message">{error}</p>}
      <h3>Reservas Realizadas</h3>
      <ul>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <li key={reserva._id}>
              {reserva.espacio_id?.tipo_espacio || 'Espacio no especificado'} - {reserva.fecha_reserva} de {reserva.hora_inicio} a {reserva.hora_fin}
            </li>
          ))
        ) : (
          <p>No hay reservas disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;


