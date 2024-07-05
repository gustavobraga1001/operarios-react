import React, { useEffect, useState } from "react";
import iconClock from "../../assets/icons/icon-clock.svg";
import "./WorkersPicker.css";
import { Lightning } from "@phosphor-icons/react";
import useEvents from "../../Hooks/useEvents";
import useAuth from "../../Hooks/useAuth";

const WorkersPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { getUsers } = useAuth();
  const { workers, setWorkers } = useEvents([]);
  const [users, setUsers] = useState([]);

  const addWorker = (user) => {
    setWorkers((prevWorkers) => [...prevWorkers, user]);
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    console.log(workers, users);
  };

  const removeWorker = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    setWorkers((prevWorkers) => prevWorkers.filter((w) => w.id !== user.id));
    console.log(workers, users);
  };

  // Função para gerar a string de nomes dos trabalhadores
  const getWorkersDisplayText = () => {
    if (workers.length === 0) return "Selecionar Trabalhador";
    if (workers.length === 1) return workers[0].name;
    if (workers.length === 2) return `${workers[0].name}, ${workers[1].name}`;
    return `${workers[0].name}, ${workers[1].name}...`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUsers();
        setUsers(result);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };

    fetchData();
  }, [getUsers]);

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
          {users.map((user) => (
            <div key={user.id} className="worker-picker-item">
              {user.name}
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
          {workers.map((worker) => (
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
