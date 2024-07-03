import React, { useState } from "react";
import iconClock from "../../assets/icons/icon-clock.svg";
import "./WorkersPicker.css";
import { Check, Lightning, X } from "@phosphor-icons/react";
import useEvents from "../../Hooks/useEvents";

const WorkersPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { workers, setWorkers } = useEvents();
  const [users, setUsers] = useState([
    "Gustavo Braga",
    "Gustavo Almeida",
    "Matheus Torres",
    "Renan",
    "Henrique",
  ]);

  const addWorker = (user) => {
    setWorkers((prevWorkers) => [...prevWorkers, user]);
    setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
  };

  const removeWorker = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    setWorkers((prevWorkers) => prevWorkers.filter((w) => w !== user));
  };

  // Função para gerar a string de nomes dos trabalhadores
  const getWorkersDisplayText = () => {
    if (workers.length === 0) return "Selecionar Trabalhador";
    if (workers.length === 1) return workers[0];
    if (workers.length === 2) return `${workers[0]}, ${workers[1]}`;
    return `${workers[0]}, ${workers[1]}...`;
  };

  return (
    <div
      className={`workers-picker ${isOpen ? "active" : ""}`}
      onClick={toggleDropdown}
    >
      <div className="scales-worker-box">
        <img className="icon-clock" src={iconClock} alt="Ícone de relógio" />
        <p className="scales-names">{getWorkersDisplayText()}</p>
      </div>
      {isOpen && (
        <div className="worker-picker-dropdown">
          {users.map((user, index) => (
            <div key={index} className="worker-picker-item">
              {user}
              <Lightning
                size={32}
                color="#ffc100"
                onClick={(e) => {
                  e.stopPropagation();
                  addWorker(user);
                }}
              />
            </div>
          ))}
          <h3>Selecionados:</h3>
          {workers.map((worker, index) => (
            <div key={index} className="worker-picker-item">
              {worker}
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
