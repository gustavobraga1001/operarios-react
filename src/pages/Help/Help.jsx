import { CaretLeft } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/settings"}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <div className="container-users">
        <p>Entre em contato com o suporte</p>
      </div>
    </div>
  );
};

export default Help;
