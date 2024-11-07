// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CalendarView from './components/CalendarView';
import Filter from './components/Filter';
import AdminPanel from './components/AdminPanel';
import Historial from './components/Historial';
import Header from './components/Header';
import FooterActions from './components/FooterActions';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('user');
  const [nombreUsuario, setNombreUsuario] = useState('');

  // Modifica handleLogin para recibir el nombre y el rol del usuario
  const handleLogin = (userRole, nombre) => {
    setIsAuthenticated(true);
    setRole(userRole);
    setNombreUsuario(nombre);
  };

  const handleSave = () => {
    console.log("Datos guardados");
  };

  const handleDelete = () => {
    console.log("Datos eliminados");
  };

  return (
    <Router>
      <div className="App">
        <h1>Sistema de Reservas</h1>
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <h2>Bienvenido/a, {nombreUsuario}!</h2> {/* Muestra el nombre del usuario */}
            <Header />
            <Filter onFilterChange={(newFilter) => console.log("Filtro Aplicado: ", newFilter)} />
            <Routes>
              <Route path="/" element={<CalendarView />} />
              <Route
                path="/admin"
                element={role === 'administrador' ? <AdminPanel /> : <Navigate to="/" />}
              />
              <Route path="/historial" element={<Historial />} />
              <Route path="/reserva" element={<CalendarView />} />
            </Routes>
            <FooterActions onSave={handleSave} onDelete={handleDelete} />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
