import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">

      <div className="center-section">
        <Link to='/reserva' className="header-option">Realizar Reserva</Link>
        <Link to='/admin' className="header-option">Panel de Administración</Link>
        <Link to='/historial'className="header-option">Historial de Reservas</Link>
      </div>
    </header>
  );
};

export default Header;