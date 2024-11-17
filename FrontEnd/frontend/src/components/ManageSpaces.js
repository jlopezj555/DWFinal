import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageSpaces.css';

const ManageSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);
  const [newSpaceData, setNewSpaceData] = useState({
    tipo_espacio: '',
    capacidad: '',
    ubicacion: ''
  });
  const [editData, setEditData] = useState({
    tipo_espacio: '',
    capacidad: '',
    ubicacion: ''
  });

  const spaceImages = {
    Oficina: '/images/oficina.jpg',
    'Sala de Conferencias': '/images/sala.jpg',
    'Escritorio Individual': '/images/escritorio.png'
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

  const handleEliminarSpace = async (spaceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/espacios/EliminarEspacio/${spaceId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSpaces(spaces.filter((space) => space._id !== spaceId));
    } catch (error) {
      console.error('Error al eliminar el espacio:', error);
    }
  };

  const handleAgregarSpace = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/api/espacios/crearEspacio',
        newSpaceData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }


      );
      setSpaces([...spaces, response.data]);
      setShowAddForm(false);
      setNewSpaceData({
        tipo_espacio: '',
        capacidad: '',
        ubicacion: ''
      });
    } catch (error) {
      console.error('Error al agregar espacio:', error);
      setError('Error al agregar espacio.');
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
      const response = await axios.put(
        `http://localhost:3001/api/espacios/ActEspacio/${selectedSpaceId}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSpaces(spaces.map((space) => (space._id === selectedSpaceId ? response.data : space)));
      setShowEditForm(false);
    } catch (error) {
      console.error('Error al actualizar el espacio:', error);
      setError('Error al actualizar el espacio.');
    }
  };

  return (
    <div className="manage-spaces-container">
      <h2>Administración de Espacios</h2>
      <br></br><br></br><br></br><br></br>
      <h3>Espacios Disponibles</h3>
      <ul>
        {spaces.length > 0 ? (
          spaces.map((space) => (
            <li key={space._id} className="space-item">
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
                  <button onClick={() => handleEditarSpace(space)} className="modify-btn">
                    Modificar
                  </button>
                  <button onClick={() => handleEliminarSpace(space._id)} className="delete-btn">
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No hay espacios disponibles.</p>
        )}
              {error && <p className="error-message">{error}</p>}
      <button onClick={() => setShowAddForm(true)} className="add-btn">
        Agregar Espacio
      </button>
      </ul>

      {/* Modal para agregar espacio */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Agregar Nuevo Espacio</h3>
              <button onClick={() => setShowAddForm(false)} className="close-btn">
                &times;
              </button>
            </div>
            <label>Tipo de Espacio:</label>
            <select
              value={newSpaceData.tipo_espacio}
              onChange={(e) => setNewSpaceData({ ...newSpaceData, tipo_espacio: e.target.value })}
            >
              <option value="">Selecciona una opción</option>
              <option value="Oficina">Oficina</option>
              <option value="Sala de Conferencias">Sala de Conferencias</option>
              <option value="Escritorio Individual">Escritorio Individual</option>
            </select>
            <label>Capacidad:</label>
            <input
              type="number"
              value={newSpaceData.capacidad}
              onChange={(e) => setNewSpaceData({ ...newSpaceData, capacidad: e.target.value })}
            />
            <label>Ubicación:</label>
            <input
              type="text"
              value={newSpaceData.ubicacion}
              onChange={(e) => setNewSpaceData({ ...newSpaceData, ubicacion: e.target.value })}
            />
            <button onClick={handleAgregarSpace} className="save-btn">
              Guardar Espacio
            </button>
            <button onClick={() => setShowAddForm(false)} className="cancel-btn">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para editar espacio */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Editar Espacio</h3>
              <button onClick={() => setShowEditForm(false)} className="close-btn">
                &times;
              </button>
            </div>
            <label>Tipo de Espacio:</label>
            <select
              value={editData.tipo_espacio}
              onChange={(e) => setEditData({ ...editData, tipo_espacio: e.target.value })}
            >
              <option value="">Selecciona una opción</option>
              <option value="Oficina">Oficina</option>
              <option value="Sala de Conferencias">Sala de Conferencias</option>
              <option value="Escritorio Individual">Escritorio Individual</option>
            </select>
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
            <button onClick={handleSubmitEdit} className="save-btn">
              Guardar Cambios
            </button>
            <button onClick={() => setShowEditForm(false)} className="cancel-btn">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSpaces;
