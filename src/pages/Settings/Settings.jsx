import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthProvider/useAuth";
import "./Settings.css";
import CardSettings from "../../components/CardSettings/CardSettings";
import { BellSimpleSlash, Info, UserList } from "@phosphor-icons/react";
import { getUser } from "../Home/Home";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const nameFomatted = user.name.split(" ");

  const getName = (nome) => {
    return nome
      .filter((parte) => parte) // Remove partes vazias
      .map((parte) => parte.charAt(0))
      .join(""); // Junta as letras em uma string
  };

  const nameFirst = getName(nameFomatted);
  console.log(nameFirst);
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
