import { CaretLeft } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";
import "./ListScale.css";
import useEvents from "../../context/EventsProvider/useEvents";
import { useQuery } from "react-query";
import LoadingSpinner from "../../components/Loading/Loading";

const ListScale = () => {
  const events = useEvents();
  const { data: eventsLeader, isLoading: isLoadingLeader } = useQuery(
    ["events"],
    () => events.getEventsLeader(),
    {
      staleTime: 1000,
    }
  );

  const formattedDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const weekdays = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const weekday = weekdays[date.getDay()];

    return `${day}/${month} ${weekday}`;
  };

  if (isLoadingLeader || !eventsLeader) {
    return <LoadingSpinner />;
  }

  const sortedEvents = Array.isArray(eventsLeader)
    ? [...eventsLeader].sort((a, b) => {
        const dateA = new Date(a.date_time);
        const dateB = new Date(b.date_time);
        return dateA - dateB;
      })
    : [];

  return (
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/optionsleader"}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <div className="list-scales">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <div key={event.id} className="card-list-scales">
              <p className="card-list-data">
                {formattedDateTime(event.date_time)}
              </p>
              <div className="card-list-infos-scales">
                <p>
                  {new Date(event.date_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <span>
                  {event.workers.length > 0
                    ? event.workers.map((worker) => worker.name).join(", ")
                    : "Sem trabalhadores"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <h1>Sem eventos</h1>
        )}
      </div>
    </div>
  );
};

export default ListScale;
