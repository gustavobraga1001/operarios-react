import React from "react";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import "./Settings.css";

const Settings = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="settings-container">
      <a onClick={() => [signout(), navigate("/")]}>Logout</a>
      <Link to={"/scales"}>Escalas</Link>
      <Footer />
    </div>
  );
};

export default Settings;
