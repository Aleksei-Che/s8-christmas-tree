import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es"; // Импорт локали для испанского языка
import axios from "axios";
import Snowfall from "react-snowfall";

interface Event {
  id: number;
  title: string;
  date: string;
}

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Загружаем события с сервера
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${apiUrl}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Добавляем новое событие на сервер
  const addEvent = async (event: { title: string; date: string }) => {
    try {
      const response = await axios.post(`${apiUrl}/events`, event);
      if (response.status === 201) {
        alert("Evento agregado con éxito");
        fetchEvents(); // Обновляем события
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Удаляем событие с сервера
  const deleteEvent = async (id: number) => {
    try {
      const response = await axios.delete(`${apiUrl}/events/${id}`);
      if (response.status === 200) {
        alert("Evento eliminado con éxito");
        fetchEvents(); // Обновляем события
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Обработчик клика по дате
  const handleDateClick = (info: any) => {
    const title = prompt("Título del evento:");
    if (title) {
      const newEvent = { title, date: info.dateStr };
      addEvent(newEvent); // Отправляем событие на сервер
    }
  };

  // Обработчик клика по событию
  const handleEventClick = (info: any) => {
    if (window.confirm(`¿Eliminar el evento "${info.event.title}"?`)) {
      deleteEvent(info.event.id); // Удаляем событие по ID
    }
  };

  // Загружаем события при монтировании компонента
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-800 to-blue-900 text-white p-6 rounded-lg shadow-lg">
      <Snowfall 
        snowflakeCount={50}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
      }} />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale} // Установка локали на испанский язык
        buttonText={{
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        headerToolbar={{
          start: "prev,next today",
          center: "title", 
          end: "dayGridMonth,dayGridWeek",
        }}
        
        events={events.map((event) => ({
          ...event,
          id: event.id.toString(),
          color: event.title.includes("Navidad") ? "#34d399" : "#facc15",
          textColor: "#ffffff",
        }))}
        displayEventTime={false}
        dayCellClassNames={({ date }) =>
          ["2024-12-24", "2024-12-25", "2024-12-31"].includes(
            date.toISOString().split("T")[0]
          )
            ? "bg-red-200 text-black"
            : ""
        }
        dayCellContent={(arg) => (
          <div className="flex flex-col items-center">
            <span>{arg.dayNumberText}</span>
            {arg.date.getDate() === 25 && <span>🎄</span>}
            {arg.date.getDate() === 31 && <span>🍾</span>}
          </div>
        )}
        dateClick={handleDateClick} // Добавление нового события
        eventClick={handleEventClick} // Удаление события
      />
    </div>
  );
};

export default Calendar;
