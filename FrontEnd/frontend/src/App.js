import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import ManageSpaces from './components/ManageSpaces'; // Nuevo componente para gestionar espacios
import SpacesGrid from './components/SpacesGrid'; // Nuevo componente para realizar reservas
import Historial from './components/Historial';

import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null); // Guardar el ID del usuario
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  const navigate = useNavigate();

  const handleLogin = (userRole, name, id) => {
    setIsAuthenticated(true);
    setRole(userRole);
    setUserName(name);
    setUserId(id); // Establecer el ID del usuario al iniciar sesión
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    setUserName('');
    setUserId(null);
    localStorage.removeItem('token');
    navigate('/'); // Redirige a la pantalla de login después de cerrar sesión
  };

  const handleEnterAdminPanel = () => {
    setShowWelcomeMessage(false);
  };

  const handleExitAdminPanel = () => {
    setShowWelcomeMessage(true);
  };

  return (
    <div className={isAuthenticated ? 'logged-in-background' : 'login-background'}>
      {/* Mostrar Header solo si el usuario está autenticado */}
      {isAuthenticated && <Header role={role} onLogout={handleLogout} />}

      {/* Rutas */}
      <Routes>
        <Route
          exact
          path="/"
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <h2>Bienvenido, {userName}</h2>}
        />
        
        {/* Ruta para el Panel de Administrador */}
        <Route
          path="/admin"
          element={
            role === 'administrador' ? (
              <AdminPanel onExit={handleExitAdminPanel} />
            ) : (
              <h2>No tienes acceso</h2>
            )
          }
        />
        
        {/* Ruta para administrar los espacios */}
        <Route
          path="/administrar-espacios"
          element={
            role === 'administrador' ? (
              <ManageSpaces />
            ) : (
              <h2>No tienes acceso</h2>
            )
          }
        />
        
        {/* Ruta para realizar nueva reserva */}
        <Route
          path="/realizar-reserva"
          element={<SpacesGrid userId={userId} />}
        />
        <Route
          path="/historial"
          element={<Historial userId={userId} />}
        />
      </Routes>
    </div>
  );
};

export default App;






