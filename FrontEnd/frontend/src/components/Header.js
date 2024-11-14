import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ role, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="center-section">
        <Link to="/" className="header-option">Realizar Reserva</Link>
        {/* Mostrar Panel de Administración solo para el rol de administrador */}
        {role === 'administrador' && (
          <Link to="/admin" className="header-option">Administrar Reservas</Link>
        )}
        {role === 'usuario' && (
          <Link to="/historial" className="header-option">Historial de Reservas</Link>
        )}
        
      </div>

      {localStorage.getItem('token') && (
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </header>
  );
};

export default Header;


