import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageSpaces.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de react-toastify

const SpacesGrid = () => {
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [fechaReserva, setFechaReserva] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const spaceImages = {
    Oficina: '/images/oficina.jpg',
    'Sala de Conferencias': '/images/sala.jpg',
    'Escritorio Individual': '/images/escritorio.png',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No estás autenticado. Por favor, inicia sesión.');
      return;
    }
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/espacios/ObtEspacios', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSpaces(response.data);
      } catch (err) {
        setError('Error al cargar los espacios');
        console.error(err);
      }
    };
    fetchSpaces();
  }, []);

  const handleReservarEspacio = (space) => {
    setSelectedSpace(space);
    setShowForm(true);
  };

  const handleSubmitReserva = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/reservas/CrearReserva',
        {
          espacio_id: selectedSpace._id,
          fecha_reserva: fechaReserva,
          hora_inicio: horaInicio,
          hora_fin: horaFin,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Reserva creada exitosamente!');
      setShowForm(false);
    } catch (err) {
      console.error('Error al crear la reserva:', err);
      toast.error('Error al crear la reserva');
    }
  };

  return (
    <div className="manage-spaces-container">
      <h2>Espacios Disponibles</h2>
      <br></br><br></br><br></br><br></br><br></br>
      <div className="spaces-grid">
        {spaces.length > 0 ? (
          spaces.map((space) => (
            <div key={space._id} className="space-item">
              <img
                src={spaceImages[space.tipo_espacio] || '/images/default.jpg'}
                alt={space.tipo_espacio}
                className="space-image"
              />
              <div className="space-details">
                <strong>Tipo de Espacio:</strong> {space.tipo_espacio || 'Tipo no especificado'} <br />
                <strong>Capacidad:</strong> {space.capacidad || 'No especificada'} <br />
                <strong>Ubicación:</strong> {space.ubicacion || 'No disponible'} <br />
                <div className="action-buttons">
                  <button onClick={() => handleReservarEspacio(space)} className="reserve-btn">
                    Reservar Espacio
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay espacios disponibles.</p>
        )}
      </div>

      {showForm && selectedSpace && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Formulario de Reserva</h3>
              <button onClick={() => setShowForm(false)} className="close-btn">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmitReserva}>
              <div>
                <label>Fecha de Reserva:</label>
                <input
                  type="date"
                  value={fechaReserva}
                  onChange={(e) => setFechaReserva(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Hora de Inicio:</label>
                <input
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Hora de Fin:</label>
                <input
                  type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Confirmar Reserva
                </button>
                <button onClick={() => setShowForm(false)} className="cancel-btn">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default SpacesGrid;



