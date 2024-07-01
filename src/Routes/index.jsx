// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Fragment, Suspense, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Settings from "../Pages/Settings/Settings";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import LoadingSpinner from "../components/Loading/Loading";
import Scales from "../Pages/Scales/Scales";
import Calendar from "../Pages/Calendar/Calendar";

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
              <Route path="/calendar" element={<Private Item={Calendar} />} />
              <Route path="/settings" element={<Private Item={Settings} />} />
              <Route path="/scales" element={<Private Item={Scales} />} />
            </Routes>
          </Fragment>
        )}
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesApp;
