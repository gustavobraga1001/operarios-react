import React, { useEffect, useState } from "react";
import useEvents from "../../context/EventsProvider/useEvents";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "../../context/AuthProvider/useAuth";
import { getIcons } from "../../components/GetIcons/GetIcons";
import { Link } from "react-router-dom";
import { CaretLeft, UserPlus } from "@phosphor-icons/react";
import "./AddWorkers.css";
import { Api } from "../../context/AuthProvider/services/api";
import PopUpAddWorker from "../../components/PopUpAddWorker/PopUpAddWorker";

const AddWorkers = () => {
  const [icon, setIcon] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const events = useEvents();

  const { data: sector, isLoading: isLoadingSector } = useQuery(
    ["sector"],
    () => events.getSector(),
    {
      staleTime: 3000,
    }
  );

  const {
    data: availableSector,
    isLoading: isLoadingAvailableSector,
    refetch,
  } = useQuery(
    ["availableSector"],
    () => events.getAvailableSector(sector?.sector_id),
    {
      staleTime: 30,
      enabled: !!sector, // Só faz a requisição se sector não for nulo
    }
  );

  useEffect(() => {
    if (sector) {
      const iconElement = getIcons(sector.sector_id, "#ffc100", 50);
      setIcon(iconElement);
    }
  }, [sector]);

  const toggleDropdown = (worker) => {
    setIsClicked(true);
    setSelectedWorker(worker);
  };

  const NoSubmit = () => {
    setIsClicked(false);
    setSelectedWorker(null);
  };

  const handleClick = async (idSector, idUser) => {

    try {
      const request = await Api.post(`sectors/${idSector}/add-worker`, {
        worker_id: idUser,
      });

      setIsClicked(false);
      setSelectedWorker(null);

      // Refetch the available sector workers to update the list
      refetch();

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
  if (isLoadingSector || !sector || isLoadingAvailableSector) {
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
        {availableSector && availableSector.length > 0
          ? availableSector.map((worker) => (
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
