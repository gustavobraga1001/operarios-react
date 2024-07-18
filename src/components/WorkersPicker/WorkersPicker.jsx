import React, { useEffect, useState } from "react";
import { Circle, UserSquare } from "@phosphor-icons/react";
import "./WorkersPicker.css";
import useEvents from "../../context/EventsProvider/useEvents";

const WorkersPicker = ({ workers, selectedWorkers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const events = useEvents();
  const [availableWorkers, setAvailableWorkers] = useState(workers);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Configura events.workersUp apenas na montagem inicial se selectedWorkers for passado
    if (selectedWorkers && !initialized) {
      events.setWorkersUp(selectedWorkers);
      setInitialized(true); // Marca como inicializado para não configurar novamente
    }

    // Atualiza a lista de trabalhadores disponíveis excluindo os selecionados
    if (events.workersUp) {
      setAvailableWorkers(
        workers.filter(
          (worker) =>
            !events.workersUp.some((selected) => selected.id === worker.id)
        )
      );
    }
  }, [events.workersUp, workers, selectedWorkers, initialized]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const addWorker = (user) => {
    events.setWorkersUp((prevWorkers) => {
      if (!Array.isArray(prevWorkers)) {
        return [user];
      }
      if (prevWorkers.some((w) => w.id === user.id)) {
        return prevWorkers; // Já está na lista, não adiciona novamente
      }
      return [...prevWorkers, user];
    });
  };

  const removeWorker = (user) => {
    events.setWorkersUp((prevWorkers) =>
      prevWorkers.filter((w) => w.id !== user.id)
    );
  };

  const getWorkersDisplayText = () => {
    if (events.workersUp && events.workersUp.length === 0)
      return "Selecionar Trabalhador";
    if (events.workersUp && events.workersUp.length === 1)
      return events.workersUp[0].name;
    if (events.workersUp && events.workersUp.length === 2)
      return `${events.workersUp[0].name}, ${events.workersUp[1].name}`;
    if (events.workersUp && events.workersUp.length > 2)
      return `${events.workersUp[0].name}, ${events.workersUp[1].name}...`;
    return "Selecionar Trabalhador";
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
              <Circle
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
          {events.workersUp &&
            Array.isArray(events.workersUp) &&
            events.workersUp.map((worker) => (
              <div key={worker.id} className="worker-picker-item">
                {worker.name}
                <Circle
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
