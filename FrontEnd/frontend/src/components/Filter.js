import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [spaceType, setSpaceType] = useState('');
  const [time, setTime] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ spaceType, time });
  };

  return (
    <div className="filter-container">
      <h3>Filtrar por Tipo de Espacio</h3>
      <label htmlFor="space-type">Tipo de Espacio:</label>
      <select
        id="space-type"
        value={spaceType}
        onChange={(e) => setSpaceType(e.target.value)}
      >
        <option value="">Seleccione...</option>
        <option value="conference-room">Sala de Conferencias</option>
        <option value="office">Oficina</option>
        <option value="desk">Escritorio</option>
      </select>

      <label htmlFor="time">Hora de Reserva:</label>
      <input
        type="time"
        id="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={handleFilterChange}>Aplicar Filtro</button>
    </div>
  );
};

export default Filter;