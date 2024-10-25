import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">

      <div className="center-section">
        <button className="header-option">Realizar Reserva</button>
        <button className="header-option">Panel de Administración</button>
        <button className="header-option">Historial de Reservas</button>
      </div>
    </header>
  );
};

export default Header;