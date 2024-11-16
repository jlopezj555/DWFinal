import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ role, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    window.location.reload(); // Refresca la página para actualizar el estado de la sesión
  };

  return (
    <header className="header">
      <div className="center-section">
        <Link to="/" className="header-option">Inicio</Link>

        {/* Mostrar opciones específicas según el rol */}
        {role === 'administrador' && (
          <>
            <Link to="/admin" className="header-option">Administrar Reservas</Link>
            <Link to="/administrar-espacios" className="header-option">Administrar Espacios</Link>
          </>
        )}

        {role === 'usuario' && (
          <>
            <Link to="/realizar-reserva" className="header-option">Realizar Nueva Reserva</Link>
            <Link to="/historial" className="header-option">Historial de Reservas</Link>
          </>
        )}
      </div>

      {/* Mostrar botón de cerrar sesión si hay un token en localStorage */}
      {localStorage.getItem('token') && (
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </header>
  );
};

export default Header;




