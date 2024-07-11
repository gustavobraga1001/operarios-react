import { useEffect, useState } from "react";
import { CaretLeft, UserPlus } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { getIcons } from "../../components/GetIcons/GetIcons";
import { useQuery } from "react-query";
import useEvents from "../../context/EventsProvider/useEvents";
import "./Members.css";

const Members = () => {
  const [icon, setIcon] = useState(null);
  const events = useEvents();

  const { data: sector, isLoading: isLoadingSector } = useQuery(
    ["sector"],
    () => events.getSector(),
    {
      staleTime: 3000,
    }
  );

  useEffect(() => {
    if (sector) {
      const iconElement = getIcons(sector.sector_id, "#ffc100", 50);
      setIcon(iconElement);
    }
  }, [sector]);

  // Verificação para exibir um estado de carregamento antes de renderizar o componente
  if (isLoadingSector || !sector) {
    return <h1>Loading...</h1>;
  }

  const formattedName = (name) => {
    const nameFomatted = name
      .split(" ")
      .filter((parte) => parte) // Remove partes vazias
      .map((parte) => parte.charAt(0))
      .join(""); // Junta as letras em uma string;
    return nameFomatted;
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
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Members;
