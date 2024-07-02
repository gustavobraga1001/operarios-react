import { createContext, useEffect, useState } from "react";

export const EventsContext = createContext({});

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [time, setTime] = useState("");
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    // Recupera os eventos do localStorage ao inicializar
    const storedEvents = JSON.parse(localStorage.getItem("events_bd")) || [];
    setEvents(storedEvents);
  }, []);

  // Função para atualizar o localStorage e o estado de eventos
  const updateLocalStorageAndState = (updatedEvents) => {
    localStorage.setItem("events_bd", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const getEvent = () => {
    return events;
  };

  const createEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    updateLocalStorageAndState(updatedEvents);
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    updateLocalStorageAndState(updatedEvents);
  };

  const editEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    updateLocalStorageAndState(updatedEvents);
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        getEvent,
        createEvent,
        deleteEvent,
        editEvent,
        workers,
        setWorkers,
        time,
        setTime,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
