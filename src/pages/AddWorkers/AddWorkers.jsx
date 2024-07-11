import React, { useEffect, useState } from "react";
import useEvents from "../../context/EventsProvider/useEvents";
import { useQuery } from "react-query";
import useAuth from "../../context/AuthProvider/useAuth";
import { getIcons } from "../../components/GetIcons/GetIcons";
import { Link } from "react-router-dom";
import { CaretLeft, UserPlus } from "@phosphor-icons/react";
import "./AddWorkers.css";
import { Api } from "../../context/AuthProvider/services/api";
import PopUpAddWorker from "../../components/PopUpAddWorker/PopUpAddWorker";

const AddWorkers = () => {
  const [icon, setIcon] = useState(null);
  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const events = useEvents();
  const auth = useAuth();

  const { data: sector, isLoading: isLoadingSector } = useQuery(
    ["sector"],
    () => events.getSector(),
    {
      staleTime: 3000,
    }
  );

  const { data: users, isLoading: isLoadingUsers } = useQuery(
    ["users"],
    () => auth.getUsers(),
    {
      staleTime: 3000,
      onSuccess: (data) => {
        if (sector) {
          setAvailableWorkers(filterUsersNotInSector(data, sector.workers));
        }
      },
    }
  );

  useEffect(() => {
    if (sector) {
      const iconElement = getIcons(sector.sector_id, "#ffc100", 50);
      setIcon(iconElement);

      if (users) {
        setAvailableWorkers(filterUsersNotInSector(users, sector.workers));
      }
    }
  }, [sector, users]);

  const toggleDropdown = (worker) => {
    setIsClicked(true);
    setSelectedWorker(worker);
  };

  const NoSubmit = () => {
    setIsClicked(false);
    setSelectedWorker(null);
  };

  const filterUsersNotInSector = (users, sectorWorkers) => {
    const workerIds = sectorWorkers.map((worker) => worker.id);
    return users.filter((user) => !workerIds.includes(user.id));
  };

  const handleClick = async (idSector, idUser) => {
    console.log(idSector, idUser);

    try {
      const request = await Api.post(`sectors/${idSector}/add-worker`, {
        worker_id: idUser,
      });

      // Remove o trabalhador adicionado da lista de trabalhadores disponíveis
      setAvailableWorkers((prevWorkers) =>
        prevWorkers.filter((worker) => worker.id !== idUser)
      );

      setIsClicked(false);
      setSelectedWorker(null);

      return request.data;
    } catch (error) {
      console.error("Erro ao adicionar trabalhador", error);
      return null;
    }
  };

  const formattedName = (name) => {
    const nameFomatted = name
      .split(" ")
      .filter((parte) => parte) // Remove partes vazias
      .map((parte) => parte.charAt(0))
      .join(""); // Junta as letras em uma string;
    return nameFomatted;
  };

  // Verificação para exibir um estado de carregamento antes de renderizar o componente
  if (isLoadingSector || !sector || !users || isLoadingUsers) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="add-worker-container">
      <header className="header-bottom-arrow">
        <Link to={"/members"}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <div className="infos-sector-members">
        {icon}
        <p>{sector ? sector.sector_name : "Admin"}</p>
      </div>
      <div className="list-members">
        {availableWorkers.length > 0
          ? availableWorkers.map((worker) => (
              <div key={worker.id} className="settings-box-header">
                <div className="settings-img">
                  <p>{formattedName(worker.name)}</p>
                </div>
                <div className="settings-box-infos">
                  <p>{worker.name}</p>
                  <span>{worker.email}</span>
                </div>
                <div
                  className="settings-img settings-img-white"
                  onClick={() => toggleDropdown(worker)}
                >
                  <UserPlus
                    size={32}
                    weight="bold"
                    color="rgba(255, 193, 0, 1)"
                  />
                </div>
              </div>
            ))
          : ""}
      </div>
      {isClicked && selectedWorker && (
        <PopUpAddWorker
          isClicked={isClicked}
          toggleDropdown={() =>
            handleClick(sector.sector_id, selectedWorker.id)
          }
          NoSubmit={NoSubmit}
          nameWorker={selectedWorker.name}
        />
      )}
    </div>
  );
};

export default AddWorkers;
