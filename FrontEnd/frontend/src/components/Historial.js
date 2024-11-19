import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Historial.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Historial = () => {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  // Función para obtener el historial de reservas
  const obtenerHistorial = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      setMensaje('No has iniciado sesión.');
      setCargando(false);
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:3001/api/reservas/Historial', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Datos actualizados:', response.data); // Verifica si la API devuelve los datos correctos
  
      if (response.data && Array.isArray(response.data)) {
        setReservas(response.data); // Actualiza el estado de reservas
      } else {
        setMensaje('No tienes reservas en el historial.');
      }
    } catch (error) {
      setMensaje('Error al cargar las reservas: ' + (error.response?.data?.mensaje || error.message));
      console.error('Error al cargar las reservas:', error);
    } finally {
      setCargando(false);
    }
  };
  

  useEffect(() => {
    obtenerHistorial();
  console.log('Reservas actualizadas:', reservas);
}, [reservas]);

  const modificarReserva = (idReserva) => {
    const reserva = reservas.find((reserva) => reserva._id === idReserva);
  
    if (!reserva) {
      setMensaje('Reserva no encontrada.');
      return;
    }
  
    setReservaSeleccionada(reserva);
    setModalOpen(true);
  };
  
 
const guardarModificaciones = async () => {
    if (!reservaSeleccionada) return;
  
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:3001/api/reservas/ModificarHorario/${reservaSeleccionada._id}`,
        {
          hora_inicio: reservaSeleccionada.hora_inicio,
          hora_fin: reservaSeleccionada.hora_fin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        // Notificación de éxito

  
        // Actualiza el historial y cierra el modal
        await obtenerHistorial();
        setModalOpen(false);
        setMensaje('');
      } else {
        // Notificación de error
        //toast.error('Error al modificar la reserva.');
      }
      toast.success('Horario modificado exitosamente.');
    } catch (error) {
      // Notificación de error
      toast.error('Error al modificar la reserva: ' + (error.response?.data?.mensaje || error.message));
      console.error('Error al modificar la reserva:', error);
    }
  };
  
  
  
  
  
  
  const cancelarReserva = async (idReserva) => {
    // Optimistic UI: actualizamos el estado inmediatamente
    setReservas((prevReservas) =>
      prevReservas.map((reserva) =>
        reserva._id === idReserva ? { ...reserva, estado: 'cancelada' } : reserva
      )
    );
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMensaje('No has iniciado sesión.');
        return;
      }
  
      const response = await axios.put(
        `http://localhost:3001/api/reservas/CancelarReserva/${idReserva}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        // Si la respuesta de la API es exitosa, mantenemos el estado optimista.
        // La UI ya se actualizó, por lo que no es necesario hacer nada adicional.
      } else {
       // setMensaje('Error al cancelar la reserva.');
      }
      toast.success('Reserva Cancelada.');
    } catch (error) {
      //setMensaje('Error al cancelar la reserva: ' + (error.response?.data?.mensaje || error.message));
      console.error('Error al cancelar la reserva:', error);
    }
  };
  
  
  

  return (
    <div className="admin-panel-container">
      <h3>Historial de Reservas</h3>
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <>
          {mensaje && <p>{mensaje}</p>}
          {reservas.length > 0 ? (
            <ul>
              {reservas.map((reserva) => (
                <li
                  key={reserva._id}
                  style={{
                    backgroundColor: reserva.estado === 'cancelada' ? '#f8d7da' : '#D9D7F1',
                  }}
                  className="reserva-item"
                >
                  <div>
                    {reserva.espacio_id?.tipo_espacio} - {new Date(reserva.fecha_reserva).toLocaleDateString()} a las{' '}
                    {reserva.hora_inicio} - {reserva.hora_fin} ({reserva.estado})
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => modificarReserva(reserva._id)} className="modify-btn">
                      Modificar Horario
                    </button>
                    <button onClick={() => cancelarReserva(reserva._id)} className="delete-btn">
                      Cancelar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !mensaje && <p>No tienes reservas en el historial.</p>
          )}
        </>
      )}


      {/* Modal para modificar la reserva */}
      {modalOpen && reservaSeleccionada && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Modificar Horario</h3>
            <label>
              Hora de inicio:
              <input
                type="time"
                value={reservaSeleccionada.hora_inicio}
                onChange={(e) =>
                  setReservaSeleccionada({ ...reservaSeleccionada, hora_inicio: e.target.value })
                }
              />
            </label>
            <label>
              Hora de fin:
              <input
                type="time"
                value={reservaSeleccionada.hora_fin}
                onChange={(e) =>
                  setReservaSeleccionada({ ...reservaSeleccionada, hora_fin: e.target.value })
                }
              />
            </label>
            <div>
              <button onClick={guardarModificaciones}>Guardar Cambios</button>
              <button onClick={() => setModalOpen(false)} className="delete-btn">Cerrar </button>
            </div>
          </div>
        </div>
      )}
            <ToastContainer />
    </div>
  );
};

export default Historial;





