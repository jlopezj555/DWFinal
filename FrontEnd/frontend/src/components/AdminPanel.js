import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = ({ onExit }) => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState('');
  const [selectedReservaId, setSelectedReservaId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({
    fecha_reserva: '',
    hora_inicio: '',
    hora_fin: '',
    estado: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/reservas/ObtenerReservas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReservas(response.data);
      } catch (err) {
        setError('Error al cargar las reservas');
        console.error(err);
      }
    };

    fetchReservas();
  }, []);

  const handleBackToHome = () => {
    onExit();
    navigate('/');
  };

  const toggleActionButtons = (reservaId) => {
    setSelectedReservaId(selectedReservaId === reservaId ? null : reservaId);
  };

  const handleEliminarReserva = async (reservaId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/reservas/EliminarReserva/${reservaId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReservas(reservas.filter((reserva) => reserva._id !== reservaId));
      setSelectedReservaId(null);
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  const handleEditarReserva = (reserva) => {
    setEditData({
      fecha_reserva: reserva.fecha_reserva,
      hora_inicio: reserva.hora_inicio,
      hora_fin: reserva.hora_fin,
      estado: reserva.estado
    });
    setSelectedReservaId(reserva._id);
    setShowEditForm(true);
  };

  const handleSubmitEdit = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Crear un objeto con los datos editados
      const editedReserva = {
        ...editData,
        // Convierte fecha_reserva a formato ISO
        fecha_reserva: new Date(editData.fecha_reserva).toISOString(),  // Formato ISO para la fecha
        // Asegúrate de que las horas estén también en formato adecuado (solo hora)
        hora_inicio: new Date(`1970-01-01T${editData.hora_inicio}:00`).toISOString(), // Convierte hora_inicio
        hora_fin: new Date(`1970-01-01T${editData.hora_fin}:00`).toISOString(), // Convierte hora_fin
        usuario_id: editData.usuario_id,  // No borres estos campos
        email: editData.email // Asegúrate de mantenerlos también
      };
  
      const response = await axios.put(
        `http://localhost:3001/api/reservas/ActReserva/${selectedReservaId}`,  // Asegúrate de que esta URL coincida con tu backend
        editedReserva,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      // Actualizar la lista de reservas en el frontend con la reserva editada
      setReservas(reservas.map((reserva) =>
        reserva._id === selectedReservaId ? response.data.reserva : reserva
      ));
      setShowEditForm(false);
      setSelectedReservaId(null);
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      setError('Error al actualizar la reserva.');
    }
  };
  

  return (
    <div className="admin-panel-container">
      <h2>Panel de Administración</h2>
      <br />
      <br />
      <br />
      <br />
      {error && <p className="error-message">{error}</p>}
      
      <h3>Reservas Realizadas</h3>
      <ul>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <li key={reserva._id} className="reserva-item">
              <strong>Usuario:</strong> {reserva.usuario_id ? reserva.usuario_id.nombre : 'Usuario desconocido'} <br />
              <strong>Email:</strong> {reserva.usuario_id ? reserva.usuario_id.email : 'Email no disponible'} <br />
              <strong>Espacio:</strong> {reserva.espacio_id?.tipo_espacio || 'Espacio no especificado'} <br />
              <strong>Fecha:</strong> {reserva.fecha_reserva} <br />
              <strong>Horario:</strong> de {reserva.hora_inicio} a {reserva.hora_fin}
              <br />
              <button onClick={() => toggleActionButtons(reserva._id)} className="action-toggle-btn">
                Opciones
              </button>

              {selectedReservaId === reserva._id && (
                <div className="action-buttons">
                  <button onClick={() => handleEditarReserva(reserva)} className="modify-btn">Modificar</button>
                  <button onClick={() => handleEliminarReserva(reserva._id)} className="delete-btn">Eliminar</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No hay reservas disponibles.</p>
        )}
      </ul>

      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Editar Reserva</h3>
              <button onClick={() => setShowEditForm(false)} className="close-btn">&times;</button>
            </div>
            <label>Fecha Reserva:</label>
            <input
  type="date"
  value={editData.fecha_reserva.split('T')[0]} // Solo se toma la parte de la fecha
  onChange={(e) => setEditData({ ...editData, fecha_reserva: e.target.value })}
/>

<input
  type="time"
  value={editData.hora_inicio.slice(11, 16)} // Extrae solo la hora y minutos
  onChange={(e) => setEditData({ ...editData, hora_inicio: e.target.value })}
/>

<input
  type="time"
  value={editData.hora_fin.slice(11, 16)} // Extrae solo la hora y minutos
  onChange={(e) => setEditData({ ...editData, hora_fin: e.target.value })}
/>

            <label>Estado:</label>
            <input
              type="text"
              value={editData.estado}
              onChange={(e) => setEditData({ ...editData, estado: e.target.value })}
            />
            <button onClick={handleSubmitEdit} className="save-btn">Guardar Cambios</button>
            <button onClick={() => setShowEditForm(false)} className="cancel-btn">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;



