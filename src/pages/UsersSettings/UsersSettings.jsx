import React from "react";
import { useQuery } from "react-query";
import useAuth from "../../context/AuthProvider/useAuth";
import LoadingSpinner from "../../components/Loading/Loading";
import "./UsersSettings.css";
import { Link } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

const UsersSettings = () => {
  const auth = useAuth();
  const { data: users, isLoading } = useQuery(
    ["workers"],
    () => auth.getUsers(),
    {
      staleTime: 500000,
    }
  );

  if (!users || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <header className="header-bottom-arrow">
        <Link to={"/settings"}>
          <CaretLeft size={32} color="#ffc100" />
        </Link>
      </header>
      <div className="container-users">
        {users ? (
          <div className="infos-users-count">
            <p>Atualmente temos {users.workers.length} operários na aplicação</p>
          </div>
        ) : (
          <h1>Sem usuários</h1>
        )}
        {users ? (
          users.workers.map((user, i) => (
            <div key={i} className="card-users">
              <p>{user}</p>
            </div>
          ))
        ) : (
          <h1>Sem usuários</h1>
        )}
      </div>
    </div>
  );
};

export default UsersSettings;
