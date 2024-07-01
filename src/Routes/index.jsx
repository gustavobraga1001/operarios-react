// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Fragment, Suspense, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Calendar from "../pages/Calendar/Calendar";
import Settings from "../pages/Settings/Settings";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import LoadingSpinner from "../components/Loading/Loading";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Login />;
};

const RoutesApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simula um atraso de 1 segundo

    return () => clearTimeout(timer);
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        {loading ? (
          <LoadingSpinner /> // Mostra o loading spinner enquanto as páginas estão sendo carregadas
        ) : (
          <Fragment>
            <Routes>
              <Route exact path="/home" element={<Private Item={Home} />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Login />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Fragment>
        )}
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesApp;
