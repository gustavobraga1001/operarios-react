import { useEffect, useState } from "react";
import { CaretLeft, UserPlus, XCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { getIcons } from "../../components/GetIcons/GetIcons";
import { useQuery } from "react-query";
import useEvents from "../../context/EventsProvider/useEvents";
import "./Members.css";
import LoadingSpinner from "../../components/Loading/Loading";
import Api from "../../context/AuthProvider/services/api";
import Popup from "./Popup/Popup";

const Members = () => {
  const [icon, setIcon] = useState(null);
  const events = useEvents();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const {
    data: sector,
    isLoading: isLoadingSector,
    refetch,
  } = useQuery(["sector"], () => events.getSector(), {
    staleTime: 3000,
  });

  useEffect(() => {
    if (sector) {
      const iconElement = getIcons(sector.sector_id, "#ffc100", 50);
      setIcon(iconElement);
    }
  }, [sector]);

  // Verificação para exibir um estado de carregamento antes de renderizar o componente
  if (isLoadingSector || !sector) {
    return <LoadingSpinner />;
  }

  const formattedName = (name) => {
    const nameFomatted = name
      .split(" ")
      .filter((parte) => parte) // Remove partes vazias
      .map((parte) => parte.charAt(0))
      .join(""); // Junta as letras em uma string;
    return nameFomatted;
  };

  const deleteWorker = async (idSector, idWorker) => {
    try {
      const request = await Api.patch(`sectors/${idSector}/remove-worker`, {
        worker_id: idWorker,
      });

      // Refetch the available sector workers to update the list
      refetch();

      showPopup();

      return request.data;
    } catch (error) {
      console.error("Erro ao excluir trabalhador", error);
      return null;
    }
  };

  return (
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/optionsleader"}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <div className="infos-sector-members">
        {icon}
        <p>{sector ? sector.sector_name : "Admin"}</p>
      </div>
      <div className="list-members">
        <Link to="add-workers" className="settings-box-header">
          <div className="settings-img settings-img-white">
            <UserPlus size={32} weight="bold" color="rgba(255, 193, 0, 1)" />
          </div>
          <div className="settings-box-infos">
            <p>Adicionar membros</p>
          </div>
        </Link>
        {sector.workers.length > 0
          ? sector.workers.map((worker) => (
              <div key={worker.id} className="settings-box-header">
                <div className="settings-img">
                  <p>{formattedName(worker.name)}</p>
                </div>
                <div className="settings-box-infos">
                  <p>{worker.name}</p>
                  <span>{worker.email}</span>
                </div>
                <XCircle
                  size={32}
                  color="#ff0000"
                  weight="fill"
                  onClick={() => deleteWorker(sector.sector_id, worker.id)}
                />
              </div>
            ))
          : ""}
      </div>
      <Popup
        message="Trabalhador removido com sucesso!"
        isVisible={isPopupVisible}
        onClose={closePopup}
      />
    </div>
  );
};

export default Members;
