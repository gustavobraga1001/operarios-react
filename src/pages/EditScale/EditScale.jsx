import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Api } from "../../context/AuthProvider/services/api";
import LoadingSpinner from "../../components/Loading/Loading";
import DateSelector from "../../components/DateSelector/DateSelector";
import { formatDateTime } from "./Util/Util";
import { Clock } from "@phosphor-icons/react";
import GridTimePicker from "../../components/TimePicker/TimePicker";
import WorkersPicker from "../../components/WorkersPicker/WorkersPicker";
import useEvents from "../../context/EventsProvider/useEvents";

const EditScale = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const events = useEvents();

  async function getEvent(id) {
    try {
      const response = await Api.get(`events/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const { data: event, isLoading } = useQuery(["event"], () => getEvent(id), {
    staleTime: 30,
  });

  const { data: sector, isLoading: isLoadingSector } = useQuery(
    ["sector"],
    () => events.getSector(),
    {
      staleTime: 30,
    }
  );

  const initialDate = formatDateTime(event?.date_time); // Use optional chaining to safely access event.date_time

  // Initialize selected workers based on event or default to an empty array
  const initialSelectedWorkers = event?.workers || [];

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  if (!event || isLoading || !sector || isLoadingSector) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Edit Scale {id}</h1>
      <DateSelector
        initialDate={initialDate[0]}
        onDateChange={handleDateChange}
      />
      <div className="sclales-hour-box">
        <Clock size={32} color="#ffc100" />
        <GridTimePicker initialTime={initialDate[1]} />
      </div>

      <WorkersPicker
        workers={sector.workers}
        selectedWorkers={event?.workers}
      />
    </div>
  );
};

export default EditScale;
