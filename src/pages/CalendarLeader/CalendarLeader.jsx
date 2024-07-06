import { CaretLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import EventCard from '../../components/EventCard/EventCard';
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useEvents from '../../Hooks/useEvents';

const CalendarLeader = () => {
    const [value, setValue] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const { getUser } = useAuth();
    const { getEventsLeader } = useEvents();
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedUser = getUser();
            setUser(fetchedUser);

            // const localEvents = []
            const localEvents = getEventsLeader(fetchUserData.id);
            console.log("User:", fetchedUser.id); // Verifique se o usuário está sendo obtido corretamente
            console.log("Local Events:", localEvents); // Verifique se os eventos locais estão sendo obtidos corretamente

            if (fetchedUser && localEvents.length > 0) {
                const filteredEvents = getEventsSector(localEvents, fetchedUser);
                console.log("Filtered Events:", filteredEvents); // Verifique os eventos filtrados
                setEvents(filteredEvents);
            }
        };

        fetchUserData();
    }, [getEventsLeader, getUser]);

    const getEventsSector = (events, user) => {
        // Filtra os eventos cujo líder do setor tem o mesmo ID do usuário
        return events.filter(event =>
            event && // Verifica se o evento não é undefined
            event.sector && // Verifica se o evento tem a propriedade sector
            event.sector.leader && // Verifica se o setor tem um líder
            event.sector.leader.id === user.id // Acessa o ID do líder do setor
        );
    };

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
                <div className="img-user">
                    {/* Adicione a imagem do usuário aqui */}
                </div>
                <p className="name-user">{user ? user.name : ""}</p>
            </header>
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
                                description={event.sector.name}
                                hour={hour}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CalendarLeader;
