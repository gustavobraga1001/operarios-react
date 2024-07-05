import React, { useEffect, useState } from "react";
import "./Members.css";
import { Camera, CaretLeft, UserPlus } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Members = () => {
  const { getSector, getUser } = useAuth();
  const [sector, setSector] = useState({});
  const [workers, setWorkers] = useState([]);

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
        <Camera size={52} color="rgba(255, 193, 0, 1)" weight="fill" />
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
