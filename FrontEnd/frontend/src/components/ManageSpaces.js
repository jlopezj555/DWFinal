import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageSpaces.css'

const ManageSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState('');
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({
    tipo_espacio: '',
    capacidad: '',
    ubicacion: ''
  });

  const spaceImages = {
    "Oficina": "/images/oficina.jpg",
    "Sala de Conferencias": "/images/sala.jpg",
    "Escritorio Individual": "/images/escritorio.png"
  };
  
  

  useEffect(() => {
    const token = localStorage.getItem('token');
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

  const toggleActionButtons = (reservaId) => {
    setSelectedSpaceId(selectedSpaceId === reservaId ? null : reservaId);
  };

  const handleEliminarSpace = async (spaceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/espacios/EliminarEspacio/${spaceId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSpaces(spaces.filter((space) => space._id !== spaceId));
      setSelectedSpaceId(null);
    } catch (error) {
      console.error('Error al eliminar el espacio:', error);
    }
  };

  const handleEditarSpace = (space) => {
    setEditData({
      tipo_espacio: space.tipo_espacio,
      capacidad: space.capacidad,
      ubicacion: space.ubicacion
    });
    setSelectedSpaceId(space._id);
    setShowEditForm(true);
  };

  const handleSubmitEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const editedSpace = { ...editData };
      const response = await axios.put(
        `http://localhost:3001/api/espacios/ActEspacio/${selectedSpaceId}`,
        editedSpace,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSpaces(spaces.map((space) =>
        space._id === selectedSpaceId ? response.data : space
      ));
      setShowEditForm(false);
      setSelectedSpaceId(null);
    } catch (error) {
      console.error('Error al actualizar el espacio:', error);
      setError('Error al actualizar el espacio.');
    }
  };

  return (
    <div className="manage-spaces-container">
      <h2>Administración de Espacios</h2>
      {error && <p className="error-message">{error}</p>}
      <br></br><br></br><br></br><br></br><h3>Espacios Disponibles</h3>
      <ul>
  {spaces.length > 0 ? (
    spaces.map((space) => (
      <li key={space._id} className="space-item">
        {/* Imagen del espacio */}
        <img
          src={spaceImages[space.tipo_espacio] || "/images/default.jpg"}
          alt={space.tipo_espacio}
          className="space-image"
        />
        
        {/* Detalles del espacio */}
        <div className="space-details">
          <strong>Tipo de Espacio:</strong> {space.tipo_espacio || 'Tipo no especificado'} <br />
          <strong>Capacidad:</strong> {space.capacidad || 'No especificada'} <br />
          <strong>Ubicación:</strong> {space.ubicacion || 'No disponible'} <br />
          
          {/* Botones de acción */}
          <div className="action-buttons">
            <button onClick={() => handleEditarSpace(space)} className="modify-btn">Modificar</button>
            <button onClick={() => handleEliminarSpace(space._id)} className="delete-btn">Eliminar</button>
          </div>
        </div>
      </li>
    ))
  ) : (
    <p>No hay espacios disponibles.</p>
  )}
</ul>



      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Editar Espacio</h3>
              <button onClick={() => setShowEditForm(false)} className="close-btn">&times;</button>
            </div>
            <label>Tipo de Espacio:</label>
            <input
              type="text"
              value={editData.tipo_espacio}
              onChange={(e) => setEditData({ ...editData, tipo_espacio: e.target.value })}
            />
            <label>Capacidad:</label>
            <input
              type="number"
              value={editData.capacidad}
              onChange={(e) => setEditData({ ...editData, capacidad: e.target.value })}
            />
            <label>Ubicación:</label>
            <input
              type="text"
              value={editData.ubicacion}
              onChange={(e) => setEditData({ ...editData, ubicacion: e.target.value })}
            />            
            <button onClick={handleSubmitEdit} className="save-btn">Guardar Cambios</button>
            <button onClick={() => setShowEditForm(false)} className="cancel-btn">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSpaces;

