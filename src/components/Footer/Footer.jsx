import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import iconHome from "../../assets/icons/icon-home.svg";
import iconCalendar from "../../assets/icons/icon-calendar.svg";
import iconConfig from "../../assets/icons/icon-config.svg";
import iconHomeFill from "../../assets/icons/icon-home-fill.svg";
import iconCalendarFill from "../../assets/icons/icon-calendar-fill.svg";
import iconConfigFill from "../../assets/icons/icon-config-fill.svg";

const Footer = () => {
  const location = useLocation();

  const getIcon = (path) => {
    switch (path) {
      case "/":
        return location.pathname == "/home" ? iconHomeFill : iconHome;
      case "/calendar":
        return location.pathname == "/calendar"
          ? iconCalendarFill
          : iconCalendar;
      case "/settings":
        return location.pathname == "/settings"
          ? iconConfigFill
          : iconConfig;
      default:
        return null;
    }
  };

  console.log(location.pathname, iconHome, getIcon("/").iconHome);

  return (
    <nav className="nav-bar">
      <Link to="/home">
        <img src={getIcon("/")} alt="Icone botão Home" />
      </Link>
      <Link to="/calendar">
        <img
          src={getIcon("/calendar")}
          alt="Icone botão calendário"
        />
      </Link>
      <Link to="/settings">
        <img src={getIcon("/settings")} alt="Icone botão configuração" />
      </Link>
    </nav>
  );
};

export default Footer;
