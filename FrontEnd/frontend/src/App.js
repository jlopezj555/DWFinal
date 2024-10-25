import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import CalendarView from './components/CalendarView';
import Filter from './components/Filter';
import AdminPanel from './components/AdminPanel';
import Historial from './components/Historial';
import Header from './components/Header';
import FooterActions from './components/FooterActions'; // Importa FooterActions

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('calendar');
  const [role, setRole] = useState('user');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    console.log("Rol seleccionado:", newRole);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleSave = () => {
    // Lógica para guardar datos
    console.log("Datos guardados");
  };

  const handleDelete = () => {
    // Lógica para eliminar datos
    console.log("Datos eliminados");
  };

  return (
    <div className="App">
      <h1>Sistema de Reservas</h1>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header onRoleChange={handleRoleChange} onViewChange={handleViewChange} />
          <Filter onFilterChange={(newFilter) => console.log("Filtro Aplicado: ", newFilter)} />
          {currentView === 'calendar' && <CalendarView />}
          {currentView === 'adminPanel' && role === 'admin' && <AdminPanel />}
          {currentView === 'historial' && <Historial />}
          <FooterActions onSave={handleSave} onDelete={handleDelete} /> {/* Añade FooterActions aquí */}
        </>
      )}
    </div>
  );
}

export default App;