import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([
    {
      title: 'Reunión de equipo',
      start: new Date(2024, 9, 27, 10, 0), // Año, mes (0-11), día, hora, minuto
      end: new Date(2024, 9, 27, 11, 0),
    },
    {
      title: 'Cita médica',
      start: new Date(2024, 9, 29, 14, 0),
      end: new Date(2024, 9, 29, 15, 0),
    },
  ]);

  const handleSelectEvent = (event) => {
    alert(`Título: ${event.title}`);
  };

  const handleSelectSlot = (slotInfo) => {
    const title = window.prompt('Nuevo evento:');
    if (title) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          title,
          start: slotInfo.start,
          end: slotInfo.end,
        },
      ]);
    }
  };

  return (
    <div className="calendar-container">
      <h3>Calendario de Eventos</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default CalendarView;