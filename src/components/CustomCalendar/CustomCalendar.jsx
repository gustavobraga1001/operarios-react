// src/components/CustomCalendar.jsx

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import EventCard from "../EventCard/EventCard";
import Footer from "../Footer/Footer";

const events = [
  {
    date: "2024-07-04",
    description: "Evento 1",
    sector: "Recepção",
    hour: "16:00",
  },
  {
    date: "2024-07-04",
    description: "Evento 2",
    sector: "Financeiro",
    hour: "16:00",
  },
  {
    date: "2024-07-11",
    description: "Evento 3",
    sector: "Marketing",
    hour: "16:00",
  },
  { date: "2024-07-11", description: "Evento 4", sector: "TI", hour: "16:00" },
  {
    date: "2024-07-18",
    description: "Evento 5",
    sector: "Vendas",
    hour: "16:00",
  },
  {
    date: "2024-07-19",
    description: "Evento 6",
    sector: "Vendas",
    hour: "16:00",
  },
  // Adicione mais eventos aqui
];

// Função para converter string de data para objeto Date em UTC
const parseDate = (dateString) => {
  const parts = dateString.split("-");
  return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
};

const CustomCalendar = () => {
  const [value, setValue] = useState(null); // Inicializa como null
  const [selectedEvents, setSelectedEvents] = useState([]);

  const getEventsForDate = (date) => {
    const normalizedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    return events.filter((event) => event.date === normalizedDate);
  };

  const handleDayClick = (date) => {
    setValue(date); // Atualiza o valor selecionado
    const eventsForDate = getEventsForDate(date);
    setSelectedEvents(eventsForDate);
  };

  const formatShortWeekday = (locale, date) => {
    const weekdays = ["S", "T", "Q", "Q", "S", "S", "D"];
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
        {selectedEvents.map((event, index) => (
          <EventCard
            key={index}
            description={event.description}
            hour={event.hour}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CustomCalendar;
