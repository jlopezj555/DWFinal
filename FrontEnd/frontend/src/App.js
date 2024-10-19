import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import CalendarView from './components/CalendarView';
import Filter from './components/Filter';
import AdminPanel from './components/AdminPanel';
import Historial from './components/Historial';

function App() {
  const [filter, setFilter] = useState({});

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    console.log("Filtro Aplicado: ", newFilter);
  };

  return (
    <div className="App">
      <h1>Sistema de Reservas</h1>
      <Login />
      <Filter onFilterChange={handleFilterChange} />
      <CalendarView />
      <AdminPanel />
      <Historial />
    </div>
  );
}
//LOS COMPONENTES DEBEN LLAMARSE SECUENCIALMENTE
//PRIMERO EL LOGIN Y AL ENTRAR SE VEN TODOS LOS DEMÁS POSICIONADOS CORRECTAMENTE
export default App;
