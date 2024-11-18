import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const token = localStorage.getItem('token');
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

      toast.success('Reserva eliminada con éxito.', {
        position: 'top-right',
        autoClose: 3000
      });
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      toast.error('Error al eliminar la reserva.', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  const handleEditarReserva = (reserva) => {
    setEditData({
      fecha_reserva: reserva.fecha_reserva.split('T')[0], // formato YYYY-MM-DD
      hora_inicio: reserva.hora_inicio, // formato HH:mm
      hora_fin: reserva.hora_fin, // formato HH:mm
      estado: reserva.estado
    });
    setSelectedReservaId(reserva._id);
    setShowEditForm(true);
  };

  const handleSubmitEdit = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Crea el objeto `editedReserva` con el formato correcto para la base de datos
      const editedReserva = {
        ...editData,
        fecha_reserva: editData.fecha_reserva, // Mantén la fecha en formato YYYY-MM-DD
        hora_inicio: editData.hora_inicio,    // Mantén la hora en formato HH:mm
        hora_fin: editData.hora_fin,          // Mantén la hora en formato HH:mm
      };
  
      // Realiza la solicitud PUT para actualizar la reserva
      const response = await axios.put(
        `http://localhost:3001/api/reservas/ActReserva/${selectedReservaId}`,
        editedReserva,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Actualiza el estado local de las reservas con la nueva información
      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
          reserva._id === selectedReservaId ? response.data.reserva : reserva
        )
      );
  
      // Oculta el formulario de edición
      setShowEditForm(false);
      setSelectedReservaId(null);
  
      toast.success('Reserva modificada con éxito.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      // Recarga las reservas desde la base de datos
      
      
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      setError('Error al actualizar la reserva.');
      toast.error('Error al actualizar la reserva.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  return (
    <div className="admin-panel-container">
      <h2>Panel de Administración</h2>
      {error && <p className="error-message">{error}</p>}
    <br></br><br></br><br></br><br></br>
      <h3>Reservas Realizadas</h3>
      <ul>
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <li key={reserva._id} className="reserva-item">
              <strong>Usuario:</strong> {reserva.usuario_id?.nombre || 'Usuario desconocido'} <br />
              <strong>Email:</strong> {reserva.usuario_id?.email || 'Email no disponible'} <br />
              <strong>Espacio:</strong> {reserva.espacio_id?.tipo_espacio || 'Espacio no especificado'} <br />
              <strong>Fecha:</strong> {reserva.fecha_reserva.split('T')[0]} <br />
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
            <h3>Editar Reserva</h3>
            <label>Fecha Reserva:</label>
            <input
              type="date"
              value={editData.fecha_reserva}
              onChange={(e) => setEditData({ ...editData, fecha_reserva: e.target.value })}
            />
            <label>Hora Inicio:</label>
            <input
              type="time"
              value={editData.hora_inicio}
              onChange={(e) => setEditData({ ...editData, hora_inicio: e.target.value })}
            />
            <label>Hora Fin:</label>
            <input
              type="time"
              value={editData.hora_fin}
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

      <ToastContainer />
    </div>
  );
};

export default AdminPanel;





