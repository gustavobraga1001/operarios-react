import { CaretLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useEvents from "../../Hooks/useEvents";
import "./CalendarLeader.css";
import { getIcons } from "../../components/GetIcons/GetIcons";

const CalendarLeader = () => {
  const { getUser, getSector } = useAuth();
  const { getEventsLeader } = useEvents();
  const [value, setValue] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sector, setSector] = useState(null); // Inicializar como null
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchUserAndSector = async () => {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);

        if (fetchedUser) {
          // Buscar setores apenas se o usuário foi carregado com sucesso
          const sectors = await getSector(fetchedUser.id);
          setSector(sectors[0]);
          // Aqui você pode fazer algo com os setores, como setar um estado
        }

        const fetchedEvents = await getEventsLeader(fetchedUser);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Erro ao obter usuário ou setores:", error);
      }
    };
    fetchUserAndSector();
  }, [getUser, getSector]); // Apenas as funções de busca são dependências

  useEffect(() => {
    // Chame getIcons somente se sector não for nulo
    if (sector) {
      const iconElement = getIcons(sector.name, "#ffc100", 50);
      setIcon(iconElement);
    }
  }, [sector]);

  const getEventsForDate = (date) => {
    const normalizedDate = date.toISOString().split("T")[0];
    return events.filter((event) => event.date_time.startsWith(normalizedDate));
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
        <p className="name-user">{sector?.name}</p>
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
                description={event.sector?.name}
                hour={hour}
                workers={event.sector?.workers}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarLeader;
