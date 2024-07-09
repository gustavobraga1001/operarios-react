import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import useAuth from "../Hooks/useAuth";

export const EventsContext = createContext({});

export const EventsProvider = ({ children }) => {
  const [eventsWorker, setEventsWorker] = useState([]);
  const [time, setTime] = useState("Selecione um horário");
  const [workers, setWorkers] = useState([]);
  const [events, setEvents] = useState([]);

  const apiClient = axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const updateLocalStorageAndState = useCallback((updatedEvents) => {
    localStorage.setItem("events_worker", JSON.stringify(updatedEvents));
    setEventsWorker(updatedEvents);
  }, []);

  const getEvents = useCallback(
    async (user) => {
      try {
        const response = await apiClient.get(`/events?workerId=${user.id}`);
        localStorage.setItem("events_worker", JSON.stringify(response.data));
        setEvents(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
        throw error;
      }
    },
    [apiClient]
  );

  const getEventsLeader = useCallback(
    async (user) => {
      try {
        const response = await apiClient.get(`/events/leader/${user.id}`);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar dados", error);
        throw error;
      }
    },
    [apiClient]
  );

  const createEvent = useCallback(
    async (newEvent) => {
      try {
        const response = await apiClient.post("/events/create", newEvent);
        const updatedEvents = [...eventsWorker, response.data];
        updateLocalStorageAndState(updatedEvents);
        return response.data;
      } catch (error) {
        console.error("Erro ao criar evento", error);
        throw error;
      }
    },
    [apiClient, eventsWorker, updateLocalStorageAndState]
  );

  const deleteEvent = useCallback(
    async (eventId) => {
      try {
        await apiClient.delete(`/events/${eventId}`);
        const updatedEvents = eventsWorker.filter(
          (event) => event.id !== eventId
        );
        updateLocalStorageAndState(updatedEvents);
      } catch (error) {
        console.error("Erro ao deletar evento", error);
        throw error;
      }
    },
    [apiClient, eventsWorker, updateLocalStorageAndState]
  );

  const editEvent = useCallback(
    async (updatedEvent) => {
      try {
        const response = await apiClient.put(
          `/events/${updatedEvent.id}`,
          updatedEvent
        );
        const updatedEvents = eventsWorker.map((event) =>
          event.id === updatedEvent.id ? response.data : event
        );
        updateLocalStorageAndState(updatedEvents);
      } catch (error) {
        console.error("Erro ao editar evento", error);
        throw error;
      }
    },
    [apiClient, eventsWorker, updateLocalStorageAndState]
  );

  return (
    <EventsContext.Provider
      value={{
        eventsWorker,
        getEvents,
        getEventLocal: () => JSON.parse(localStorage.getItem("events_worker")),
        createEvent,
        time,
        setTime,
        workers,
        setWorkers,
        getEventsLeader,
        deleteEvent,
        editEvent,
        events,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
