// src/components/CustomCalendar.jsx
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import EventCard from "../EventCard/EventCard";
import Footer from "../Footer/Footer";
import useEvents from "../../Hooks/useEvents";
import useAuth from "../../Hooks/useAuth";

const CustomCalendar = () => {
  const [value, setValue] = useState(null); // Inicializa como null
  const [selectedEvents, setSelectedEvents] = useState([]);
  const { getUser } = useAuth();
  const user = getUser();

  const { getEvents } = useEvents();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Certifique-se de obter eventos adequados e ajustar o estado corretamente.
    setEvents(getEvents(user.id));
  }, [getEvents, user]);

  // Função para obter eventos para uma data específica
  const getEventsForDate = (date) => {
    const normalizedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    return events.filter((event) => event.date_time.startsWith(normalizedDate));
  };

  const handleDayClick = (date) => {
    setValue(date); // Atualiza o valor selecionado
    const eventsForDate = getEventsForDate(date);
    setSelectedEvents(eventsForDate);
  };

  const formatShortWeekday = (locale, date) => {
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    return weekdays[date.getDay()];
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setValue}
        value={value}
        formatShortWeekday={formatShortWeekday}
        showNeighboringMonth={false}
        onClickDay={handleDayClick}
        navigationLabel={({ date }) => (
          <div className="custom-navigation">
            <span className="month-year">
              <strong>
                {date.toLocaleDateString("pt-BR", { month: "long" })}
              </strong>{" "}
              {date.getFullYear()}
            </span>
          </div>
        )}
        className="custom-calendar"
        tileContent={({ date, view }) => {
          if (view === "month") {
            const eventsForDate = getEventsForDate(date);
            return (
              <div className="events-container">
                {eventsForDate.map((event, index) => (
                  <div key={index} className="event-dot"></div>
                ))}
              </div>
            );
          }
          return null;
        }}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            // Adiciona a classe "react-calendar__tile--active" apenas quando value não é nulo
            if (value && date.toDateString() === value.toDateString()) {
              return "react-calendar__tile--active";
            }
            // Adiciona a classe para dias com eventos
            if (getEventsForDate(date).length > 0) {
              return "event-day";
            }
          }
          return "";
        }}
      />
      <div className="selected-events">
        {selectedEvents.map((event, index) => {
          const eventDate = new Date(event.date_time);
          const hour = eventDate.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <EventCard
              key={index}
              description={event.sector.name}
              hour={hour}
            />
          );
        })}
      </div>{" "}
      <Footer />
    </div>
  );
};

export default CustomCalendar;
