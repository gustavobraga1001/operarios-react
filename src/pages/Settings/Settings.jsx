import React from "react";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import "./Settings.css";
import CardSettings from "../../components/CardSettings/CardSettings";
import { BellSimpleSlash, Info, UserList } from "@phosphor-icons/react";

const Settings = () => {
  const { signout, getUser } = useAuth();
  const navigate = useNavigate();
  const user = getUser();

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
          <p>{nameFirst}</p>
        </div>
        <div className="settings-box-infos">
          <p>{user.name}</p>
          <span>{user.email}</span>
        </div>
      </div>
      <div className="settings-options">
        <div className="settings-option">
          <UserList size={32} color="#ffc100" />
          <p>Membros</p>
        </div>
        <div className="settings-option">
          <BellSimpleSlash size={32} color="#ffc100" />
          <p>Desativar Notificações</p>
        </div>
        <div className="settings-option">
          <Info size={32} color="#ffc100" />
          <p>Ajuda</p>
        </div>
      </div>
      <a
        className="settings-button-logout"
        onClick={() => [signout(), navigate("/")]}
      >
        Sair da Conta
      </a>

      <Footer />
    </div>
  );
};

export default Settings;
