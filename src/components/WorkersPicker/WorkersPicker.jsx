import React, { useEffect, useState } from "react";
import iconClock from "../../assets/icons/icon-clock.svg";
import "./WorkersPicker.css";
import { Lightning, UserSquare } from "@phosphor-icons/react";
import useEvents from "../../context/EventsProvider/useEvents";

const WorkersPicker = ({ workers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const events = useEvents();
  const [availableWorkers, setAvailableWorkers] = useState(workers);

  useEffect(() => {
    // Atualiza a lista de trabalhadores disponíveis sempre que os trabalhadores selecionados mudam
    setAvailableWorkers(
      workers.filter(
        (worker) =>
          !events.workersUp.some((selected) => selected.id === worker.id)
      )
    );
  }, [events.workersUp, workers]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const addWorker = (user) => {
    events.setWorkersUp((prevWorkers) => [...prevWorkers, user]);
  };

  const removeWorker = (user) => {
    events.setWorkersUp((prevWorkers) =>
      prevWorkers.filter((w) => w.id !== user.id)
    );
  };

  const getWorkersDisplayText = () => {
    if (events.workersUp.length === 0) return "Selecionar Trabalhador";
    if (events.workersUp.length === 1) return events.workersUp[0].name;
    if (events.workersUp.length === 2)
      return `${events.workersUp[0].name}, ${events.workersUp[1].name}`;
    return `${events.workersUp[0].name}, ${events.workersUp[1].name}...`;
  };

  return (
    <div
      className={`workers-picker ${isOpen ? "active" : ""}`}
      onClick={toggleDropdown}
    >
      <div className="scales-worker-box">
        <UserSquare size={30} color="#ffc100" />
        <p className="scales-names">{getWorkersDisplayText()}</p>
      </div>
      {isOpen && (
        <div className="worker-picker-dropdown">
          {availableWorkers.map((worker) => (
            <div key={worker.id} className="worker-picker-item">
              {worker.name}
              <Lightning
                size={32}
                color="#ffc100"
                onClick={(e) => {
                  e.stopPropagation();
                  addWorker(worker);
                }}
              />
            </div>
          ))}
          <h3>Selecionados:</h3>
          {events.workersUp.map((worker) => (
            <div key={worker.id} className="worker-picker-item">
              {worker.name}
              <Lightning
                size={32}
                color="#ffc100"
                weight="fill"
                onClick={(e) => {
                  e.stopPropagation();
                  removeWorker(worker);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkersPicker;
