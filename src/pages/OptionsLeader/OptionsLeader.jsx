import React from "react";
import "./OptionsLeader.css";
import {
  AddressBookTabs,
  Calendar,
  CalendarDots,
  CalendarPlus,
  CaretLeft,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const OptionsLeader = () => {
  return (
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/home"}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <div className="box-card-options">
        <Link to={"/scales"} className="card-cinza">
          <CalendarPlus size={32} />
          <p>Criar Escala</p>
        </Link>
        <Link to={"/listscale"} className="card-amarelo">
          <CalendarDots size={32} color="#000" />
          <p>Ver Escala</p>
        </Link>
        <Link to={"/"} className="card-amarelo">
          <AddressBookTabs size={32} color="#000" />
          <p>Membros da Área</p>
        </Link>
        <Link to={"/calendar"} className="card-cinza">
          <Calendar size={32} />
          <p>Ver Calendário</p>
        </Link>
      </div>
    </div>
  );
};

export default OptionsLeader;
