import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./Home.css";
import Saudacao from "../../components/Saudacao/Saudacao";
import Footer from "../../components/Footer/Footer";
import iconDia from "../../assets/icons/icon-dia.svg"
import iconTarde from "../../assets/icons/icon-tarde.svg"
import iconNoite from "../../assets/icons/icon-noite.svg"
import logo from "../../assets/images/logo.svg";

const Home = () => {

  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000 * 60 * 60); // Atualiza a cada hora

    if (currentHour <= 12) {
      setMessage("Bom Dia")
      setImage(iconDia)
    } else if (currentHour >= 13 && currentHour <= 18){
      setMessage("Boa Tarde")
      setImage(iconTarde)
    } else {
      setMessage("Boa Noite")
      setImage(iconNoite)
    }

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div className="container-home">
      <header>
        <img src={logo} alt="Logo do aplicativo" />
      </header>
      <main className="main-home">
        <div className="helcome-home">
          <img src={image} alt="Imagem da hora atual" />
          <h1>{message}, Braga</h1>
        </div>
        <Saudacao
          message="Seu próximo dia de servir é:"
          day="HOJE!"
          horario="16:00"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
