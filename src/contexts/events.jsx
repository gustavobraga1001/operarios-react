import axios from "axios";
import { createContext, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

export const EventsContext = createContext({});

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [time, setTime] = useState("Selecione um horário");
  const [workers, setWorkers] = useState([]);

  const apiClient = axios.create({
    baseURL: "/api", // Agora você pode usar "/api" e o proxy irá redirecionar
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Função para atualizar o localStorage e o estado de eventos
  const updateLocalStorageAndState = (updatedEvents) => {
    localStorage.setItem("events_bd", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const getEvents = async (user) => {
    try {
      const response = await apiClient.get(`/events?userId=${user.id}`);
      localStorage.setItem("events_bd", JSON.stringify(response.data));
      setEvents(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados", error);
      throw error;
    }
  };

  const getEventLocal = () => {
    return JSON.parse(localStorage.getItem("events_bd"));
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
        getEvents,
        getEventLocal,
        time,
        setTime,
        workers,
        setWorkers,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
