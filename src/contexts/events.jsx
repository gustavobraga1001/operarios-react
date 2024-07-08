import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import useAuth from "../Hooks/useAuth";

export const EventsContext = createContext({});

export const EventsProvider = ({ children }) => {
  const { getUser } = useAuth();
  const [eventsWorker, setEventsWorker] = useState([]);
  const [time, setTime] = useState("Selecione um horário");
  const [workers, setWorkers] = useState([]);

  const apiClient = axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const updateLocalStorageAndState = useCallback((updatedEvents) => {
    localStorage.setItem("events_bd", JSON.stringify(updatedEvents));
    setEventsWorker(updatedEvents);
  }, []);

  const getEvents = async (user) => {
    try {
      const response = await apiClient.get(`/events?workerId=${user}`);
      updateLocalStorageAndState(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados", error);
      throw error;
    }
  };

  const getEventsLeader = useCallback(
    async (user) => {
      try {
        const response = await apiClient.get(`/events/leader/${user.id}`);
        updateLocalStorageAndState(response.data);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar dados", error);
        throw error;
      }
    },
    [apiClient, updateLocalStorageAndState]
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
        getEventLocal: () => JSON.parse(localStorage.getItem("events_bd")),
        createEvent,
        time,
        setTime,
        workers,
        setWorkers,
        getEventsLeader,
        deleteEvent,
        editEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
