import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthProvider/useAuth";
import "./Settings.css";
import { BellSimpleSlash, Info, UserList } from "@phosphor-icons/react";
import LoadingSpinner from "../../components/Loading/Loading";
import { useQuery } from "react-query";
import ToggleButton from "../../components/ToggleButton/ToggleButton";

const Settings = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const { data: user, isLoading } = useQuery(["user"], () => auth.getUser(), {
    staleTime: 50000,
  });

  if (!user || isLoading) {
    return <LoadingSpinner />;
  }

  const nameFomatted = user.name.split(" ");

  const getName = (nome) => {
    return nome
      .filter((parte) => parte) // Remove partes vazias
      .map((parte) => parte.charAt(0))
      .join(""); // Junta as letras em uma string
  };

  const nameFirst = getName(nameFomatted);
  return (
    <div className="settings-container">
      <div className="settings-box-header">
        <div className="settings-img">
          <p>{!user ? "" : nameFirst}</p>
        </div>
        <div className="settings-box-infos">
          <p>{!user ? "---" : user.name}</p>
          <span>{!user ? "---" : user.email}</span>
        </div>
      </div>
      <div className="settings-options">
        <Link to={"/users"}>
          <div className="settings-option">
            <UserList size={32} color="#ffc100" />
            <p>Membros</p>
          </div>
        </Link>
        <div className="settings-option notitifications">
          <div className="option-notificatios">
            <BellSimpleSlash size={32} color="#ffc100" />
            <p>Desativar Notificações</p>
          </div>
          <ToggleButton />
        </div>
        <Link to={"/help"}>
          <div className="settings-option">
            <Info size={32} color="#ffc100" />
            <p>Ajuda</p>
          </div>
        </Link>
      </div>
      <a
        className="settings-button-logout"
        onClick={() => {
          auth.logout();
          navigate("/");
        }}
      >
        Sair da Conta
      </a>

      <Footer />
    </div>
  );
};

export default Settings;
