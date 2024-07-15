import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import EventCard from "../../components/EventCard/EventCard";
import "./CalendarLeader.css";
import { getIcons } from "../../components/GetIcons/GetIcons";
import useEvents from "../../context/EventsProvider/useEvents";

const CalendarLeader = () => {
  const events = useEvents();
  const [value, setValue] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [icon, setIcon] = useState(null);

  const {
    data: eventsCalendarLeader,
    isLoading: isLoadingEventsCalendarLeader,
  } = useQuery(["events_leader"], () => events.getEventsLeader(), {
    staleTime: 3000,
  });

  const { data: sector, isLoading: isLoadingSector } = useQuery(
    ["sector"],
    () => events.getSector(),
    {
      staleTime: 3000,
    }
  );

  useEffect(() => {
    if (sector) {
      const iconElement = getIcons(sector.sector_id, "#ffc100", 50);
      setIcon(iconElement);
    }
  }, [sector]);

  if (
    !eventsCalendarLeader ||
    isLoadingSector ||
    isLoadingEventsCalendarLeader ||
    !sector
  ) {
    return <h1>Loading...</h1>;
  }

  const getEventsForDate = (date) => {
    const normalizedDate = date.toISOString().split("T")[0];
    return eventsCalendarLeader.filter((event) =>
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
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/optionsleader"}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <header className="header-calendary">
        <div>{icon}</div>
        <p className="name-user">{sector.sector_name}</p>
      </header>
      <div className="calendar-leader-container">
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
              if (eventsForDate.length > 0) {
                return (
                  <div className="events-container">
                    <div className="event-dot-leader"></div>
                    {eventsForDate.length > 2 ? (
                      <div className="event-dot-leader more-events">
                        <span className="plus-sign">+</span>
                      </div>
                    ) : (
                      eventsForDate.length === 2 && (
                        <div className="event-dot-leader"></div>
                      )
                    )}
                  </div>
                );
              }
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
                description={event.sector.name}
                hour={hour}
                workers={event.workers}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarLeader;
