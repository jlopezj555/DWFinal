import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const CalendarView = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-container">
      <h3>Seleccione una Fecha</h3>
      <Calendar onChange={onChange} value={date} />
      <p>Fecha seleccionada: {date.toDateString()}</p>
    </div>
  );
};

export default CalendarView;
