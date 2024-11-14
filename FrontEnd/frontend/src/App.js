import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true); // Nuevo estado para controlar la visibilidad del mensaje

  const navigate = useNavigate(); // Para la navegación programática

  const handleLogin = (userRole, name) => {
    setIsAuthenticated(true);
    setRole(userRole);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    setUserName('');
    localStorage.removeItem('token');
    navigate('/'); // Redirige a la pantalla de login después de cerrar sesión
  };

  const handleEnterAdminPanel = () => {
    setShowWelcomeMessage(false); // Oculta el mensaje de bienvenida cuando se accede al AdminPanel
  };

  const handleExitAdminPanel = () => {
    setShowWelcomeMessage(true); // Muestra nuevamente el mensaje cuando se regresa al inicio
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
      </Routes>
    </div>
  );
};

export default App;





