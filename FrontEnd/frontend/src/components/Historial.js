import React, { useState } from 'react';
import './Historial.css';

const Historial = () => {
  const [reservas, setReservas] = useState([
    { id: 1, espacio: 'Oficina', fecha: '2024-10-22', hora: '11:00 AM' },
    { id: 2, espacio: 'Escritorio', fecha: '2024-10-23', hora: '09:00 AM' },
  ]);

  const cancelarReserva = (id) => {
    setReservas(reservas.filter((reserva) => reserva.id !== id));
  };

  const modificarReserva = (id) => {
    // Lógica para modificar reserva (en desarrollo)
    alert(`Modificar reserva con ID: ${id}`);
  };

  return (
    <div className="historial-container">
      <h3>Historial de Reservas</h3>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.espacio} - {reserva.fecha} a las {reserva.hora}
            <button onClick={() => modificarReserva(reserva.id)}>Modificar</button>
            <button onClick={() => cancelarReserva(reserva.id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Historial;