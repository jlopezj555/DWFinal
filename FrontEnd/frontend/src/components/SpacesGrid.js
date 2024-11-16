import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageSpaces.css';

const SpacesGrid = () => {
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [fechaReserva, setFechaReserva] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [message, setMessage] = useState('');

  const spaceImages = {
    Oficina: '/images/oficina.jpg',
    'Sala de Conferencias': '/images/sala.jpg',
    'Escritorio Individual': '/images/escritorio.png'
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token en localStorage:', token);  // Verifica que el token esté aquí
    
    if (!token) {
      setMessage('No estás autenticado. Por favor, inicia sesión.');
      return;
    }
    
    
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/espacios/ObtEspacios', {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
    setSelectedSpace(space); // Guardamos el espacio seleccionado
    setShowForm(true); // Mostramos el formulario
  };

  const handleSubmitReserva = async () => {
    const token = localStorage.getItem('token');
    console.log('Token en localStorage:', token);  // Verifica el token aquí
  
    if (!token) {
      setMessage('No estás autenticado. Por favor, inicia sesión.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/reservas/CrearReserva', {
        espacio_id: selectedSpace._id,
        fecha_reserva: fechaReserva,
        hora_inicio: horaInicio,
        hora_fin: horaFin
      }, {
        headers: {
          Authorization: `Bearer ${token}`  // Asegúrate de enviar el token aquí
        }
      });
  
      console.log(response.data);  // Verifica la respuesta del servidor
      setMessage('Reserva creada exitosamente');
    } catch (err) {
      console.error('Error al crear la reserva:', err);
      setMessage('Error al crear la reserva');
    }
  };
  

  return (
    <div className="manage-spaces-container">
      <h2>Espacios Disponibles</h2>
      <br></br><br></br><br></br><br></br><br></br><br></br>
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
        <div className="reservation-form">
          <h3>Formulario de Reserva</h3>
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
            <button type="submit">Confirmar Reserva</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SpacesGrid;
