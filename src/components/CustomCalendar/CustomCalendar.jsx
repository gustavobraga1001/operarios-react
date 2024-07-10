import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import EventCard from "../EventCard/EventCard";
import useEvents from "../../context/EventsProvider/useEvents";
import { useQuery } from "react-query";

const CustomCalendar = () => {
  const [value, setValue] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const events = useEvents();

  const { data: eventsWorker, isLoading } = useQuery(
    ["events"],
    () => events.getEvents(),
    {
      staleTime: 3000,
    }
  );

  if (isLoading || !eventsWorker) {
    return <h1>Loading...</h1>;
  }

  const getEventsForDate = (date) => {
    const normalizedDate = date.toISOString().split("T")[0];
    return eventsWorker.filter((event) =>
      event.date_time.startsWith(normalizedDate)
    );
  };

  const handleDayClick = (date) => {
    setValue(date);
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
            if (value && date.toDateString() === value.toDateString()) {
              return "react-calendar__tile--active";
            }
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
              sectorId={event.sector.id}
              description={event.sector.name || "Sem setor"}
              hour={hour}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
