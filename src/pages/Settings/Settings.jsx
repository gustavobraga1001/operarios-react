import React from "react";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div>
      <Link to={"/"}>
        <h1>Logout</h1>
      </Link>
      <Footer />
    </div>
  );
};

export default Settings;
