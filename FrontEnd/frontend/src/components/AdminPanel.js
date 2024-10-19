import React from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const reservas = [
    { id: 1, espacio: 'Oficina', fecha: '2024-10-20', hora: '10:00 AM' },
    { id: 2, espacio: 'Sala de Conferencias', fecha: '2024-10-21', hora: '02:00 PM' },
  ];

  return (
    <div className="admin-panel-container">
      <h2>Panel de Administración</h2>
      <h3>Reservas Realizadas</h3>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.espacio} - {reserva.fecha} a las {reserva.hora}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;