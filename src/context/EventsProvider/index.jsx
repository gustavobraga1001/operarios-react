import { createContext, useEffect, useState } from "react";
import { Api } from "../AuthProvider/services/api";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
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

  return (
    <EventsContext.Provider value={{ getEvents, getSector, getEventsLeader }}>
      {children}
    </EventsContext.Provider>
  );
};
