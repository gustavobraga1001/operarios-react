import { createContext, useEffect, useState } from "react";
import { Api } from "../AuthProvider/services/api";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [time, setTime] = useState("Selecione um horário");
  const [workersUp, setWorkersUp] = useState([]);

  async function getEvents() {
    try {
      const response = await Api.get("workers/events");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getEventsLeader() {
    try {
      const response = await Api.get("leader/events");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getSector() {
    try {
      const response = await Api.get("leader/sector");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function PostScales(event) {
    try {
      const request = await Api.post("events/create", event);

      return request.data;
    } catch (error) {
      return null;
    }
  }

  return (
    <EventsContext.Provider
      value={{
        getEvents,
        getSector,
        getEventsLeader,
        PostScales,
        time,
        setTime,
        workersUp,
        setWorkersUp,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
