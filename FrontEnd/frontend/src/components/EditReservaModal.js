// EditReservaModal.js
import React, { useState, useEffect } from 'react';

const EditReservaModal = ({ reserva, isOpen, onClose, onSave }) => {
  const [fechaReserva, setFechaReserva] = useState(reserva.fecha_reserva || '');
  const [horaInicio, setHoraInicio] = useState(reserva.hora_inicio || '');
  const [horaFin, setHoraFin] = useState(reserva.hora_fin || '');
  const [estado, setEstado] = useState(reserva.estado || 'confirmada');

  useEffect(() => {
    if (reserva) {
      setFechaReserva(reserva.fecha_reserva);
      setHoraInicio(reserva.hora_inicio);
      setHoraFin(reserva.hora_fin);
      setEstado(reserva.estado);
    }
  }, [reserva]);

  const handleSave = () => {
    const updatedReserva = {
      fecha_reserva: fechaReserva,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      estado,
    };
    onSave(reserva._id, updatedReserva);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Reserva</h2>
        <label>Fecha Reserva:</label>
        <input type="date" value={fechaReserva} onChange={(e) => setFechaReserva(e.target.value)} />

        <label>Hora Inicio:</label>
        <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />

        <label>Hora Fin:</label>
        <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />

        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <button onClick={handleSave}>Guardar Cambios</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EditReservaModal;
