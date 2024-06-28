import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import iconHome from "../../assets/icons/icon-home.svg"
import iconCalendar from "../../assets/icons/icon-calendar.svg"
import iconConfig from "../../assets/icons/icon-config.svg"

const Footer = () => {
  return (
    <nav className="nav-bar">
      <Link to="/home"><img src={iconHome} alt="Icone botão Home" /></Link>
      <Link to="/calendar"><img src={iconCalendar} alt="Icone botão calendário" /></Link>
      <Link to="/config"><img src={iconConfig} alt="Icone botão configuração" /></Link>
    </nav>
  );
};

export default Footer;
