import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Home.css";
import Saudacao from "../../components/Saudacao/Saudacao";
import Footer from "../../components/Footer/Footer";
import iconDia from "../../assets/icons/icon-dia.svg";
import iconTarde from "../../assets/icons/icon-tarde.svg";
import iconNoite from "../../assets/icons/icon-noite.svg";
import iconHand from "../../assets/icons/icon-hand.svg";
import logo from "../../assets/images/logo.svg";

const Home = () => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [messageDays, setMessageDays] = useState({
    message: "",
    days: "",
    hour: "",
  });

  

  // useEffect(() => {
  //   const updateMessageDays = () => {
  //     const filteredMessageDays = FilterEvents(events);
  //     setMessageDays(filteredMessageDays);
  //   };

  //   updateMessageDays();
  // }, [events]);

  useEffect(() => {
    // Atualizar a saudação e a imagem com base na hora atual
    updateMessageAndImage();

    // Configurar intervalo para atualizar a hora a cada 15 minutos
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 900000); // A cada 15 minutos

    return () => {
      clearInterval(interval); // Limpar intervalo ao desmontar o componente
    };
  }, []);

  const updateMessageAndImage = () => {
    if (currentHour <= 12) {
      setMessage("Bom Dia");
      setImage(iconDia);
    } else if (currentHour >= 13 && currentHour <= 18) {
      setMessage("Boa Tarde");
      setImage(iconTarde);
    } else {
      setMessage("Boa Noite");
      setImage(iconNoite);
    }
  };

  return (
    <div className="container-home">
      <header>
        <img src={logo} alt="Logo do aplicativo" />
      </header>
      <main className="main-home">
        <div className="welcome-home">
          <img src={image} alt="Imagem da hora atual" />
          <h1>{/* {message}, {user.name} */}</h1>
        </div>
        <Saudacao
          message={messageDays.message}
          day={messageDays.days}
          horario={messageDays.hour}
        />
        {/* {(user.role === "LEADER" || user.role === "ADMIN") && (
          <Link to={"/optionsleader"}>
            <button className="btn-scales">
              <img src={iconHand} alt="" />
            </button>
          </Link>
        )} */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
