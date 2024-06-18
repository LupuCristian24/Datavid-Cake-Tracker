import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import "./Home.css"

const StyledCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/members');
        const transformedEvents = response.data.map(event => {
          const birthDate = new Date(event.birth_date);
          const birthMonth = birthDate.getMonth() + 1;
          const birthDay = birthDate.getDate();
          const currentYear = new Date().getFullYear();
          const startDate = new Date(`${currentYear}-${birthMonth}-${birthDay}`);

          return {
            ...event,
            title: `${event.first_name} ${event.last_name}`,
            start: startDate,
          };
        });
        setEvents(transformedEvents);
      } catch (error) {
        console.error('Failed to fetch birthdays:', error);
      }
    };

    fetchBirthdays();
  }, []);

  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-content">
        <b>{eventInfo.event.title}</b>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today,prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height={'85vh'}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default StyledCalendar;
