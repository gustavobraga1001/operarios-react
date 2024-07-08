import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const TesteApi = () => {
  const { getUsers } = useAuth();
  useEffect(() => {
    getUsers();
  });
  return <div>TesteApi</div>;
};

export default TesteApi;
