import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/calendar">Calendario</Link>
    </nav>
  );
};

export default Footer;
