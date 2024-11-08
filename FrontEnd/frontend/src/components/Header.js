// Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ role }) => {
  return (
    <header className="header">
      <div className="center-section">
        <Link to="/" className="header-option">Realizar Reserva</Link>
        {/* Mostrar Panel de Administración solo para el rol de administrador */}
        {role === 'administrador' && (
          <Link to="/admin" className="header-option">Panel de Administración</Link>
        )}
        <Link to="/historial" className="header-option">Historial de Reservas</Link>
      </div>
    </header>
  );
};

export default Header;
