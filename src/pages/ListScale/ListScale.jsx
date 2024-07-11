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
      staleTime: 100000,
    }
  );

  if (!eventsLeader || isLoadingLeader) {
    return <LoadingSpinner />;
  }

  const formattedDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mês começa em 0
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

  return (
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/optionsleader"}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <div className="list-scales">
        {eventsLeader.length > 0 ? (
          eventsLeader.map((event) => (
            <div key={event.id} className="card-list-scales">
              <p className="card-list-data">
                {formattedDateTime(event.date_time)}
              </p>
              <div className="card-list-infos-scales">
                <p>20:00</p>
                <span>Gustavo Braga, Gustavo Almeida.</span>
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
