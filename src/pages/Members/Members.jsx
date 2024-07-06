import React, { useEffect, useState } from "react";
import "./Members.css";
import { Camera, CaretLeft, UserPlus } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { getIcons } from "../../components/GetIcons/GetIcons";

const Members = () => {
  const { getSector, getUser } = useAuth();
  const [sector, setSector] = useState({});
  const [workers, setWorkers] = useState([]);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchSector = async () => {
      const user = getUser();
      try {
        const sectors = await getSector(user.id);
        setSector(sectors[0]);
        setWorkers(sectors[0].workers);
      } catch (error) {
        console.error("Erro ao obter setores:", error);
      }
    };

    fetchSector();
  }, [getSector, getUser]);

  useEffect(() => {
    // Chame getIcons somente se sector não for nulo
    if (sector) {
      console.log("Sector for getIcons:", sector);
      const iconElement = getIcons(sector.name, "#ffc100");
      console.log("Icon:", iconElement);
      setIcon(iconElement);
    } else {
      console.log("Sector is null or undefined.");
    }
  }, [sector]);

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
        <p>{sector ? sector.name : "Admin"}</p>
      </div>
      <div className="list-members">
        <div className="settings-box-header">
          <div className="settings-img settings-img-white">
            <UserPlus size={32} weight="bold" color="rgba(255, 193, 0, 1)" />
          </div>
          <div className="settings-box-infos">
            <p>Adicionar membros</p>
          </div>
        </div>
        {workers.length > 0
          ? workers.map((worker) => (
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
