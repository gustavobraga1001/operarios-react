import { CaretLeft } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";
import "./ListScale.css";

const ListScale = () => {
  return (
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/optionsleader"}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <div className="list-scales">
        <div className="card-list-scales">
          <p className="card-list-data">20/01 Sábado</p>
          <div className="card-list-infos-scales">
            <p>20:00</p>
            <span>Gustavo Braga, Gustavo Almeida.</span>
          </div>
        </div>
        <div className="card-list-scales">
          <p className="card-list-data">20/01 Sábado</p>
          <div className="card-list-infos-scales">
            <p>20:00</p>
            <span>Gustavo Braga, Gustavo Almeida.</span>
          </div>
        </div>
        <div className="card-list-scales">
          <p className="card-list-data">20/01 Sábado</p>
          <div className="card-list-infos-scales">
            <p>20:00</p>
            <span>Gustavo Braga, Gustavo Almeida.</span>
          </div>
        </div>
        <div className="card-list-scales">
          <p className="card-list-data">20/01 Sábado</p>
          <div className="card-list-infos-scales">
            <p>20:00</p>
            <span>Gustavo Braga, Gustavo Almeida.</span>
          </div>
        </div>
        <div className="card-list-scales">
          <p className="card-list-data">20/01 Sábado</p>
          <div className="card-list-infos-scales">
            <p>20:00</p>
            <span>Gustavo Braga, Gustavo Almeida.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListScale;
