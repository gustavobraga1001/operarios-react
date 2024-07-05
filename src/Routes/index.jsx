// src/App.jsx
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Fragment, Suspense, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Settings from "../pages/Settings/Settings";
import Login from "../pages/Login/Login";
import LoadingSpinner from "../components/Loading/Loading";
import Scales from "../pages/Scales/Scales";
import Calendar from "../pages/Calendar/Calendar";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import OptionsLeader from "../pages/OptionsLeader/OptionsLeader";
import ListScale from "../pages/ListScale/ListScale";

const Private = ({ Item }) => {
  const { signed } = useAuth();
  return signed() ? <Item /> : <Login />;
};

const Redirect = ({ Item }) => {
  const { signed } = useAuth();
  return signed() ? <Home /> : <Item />;
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
              <Route path="*" element={<Login />} />
              <Route path="/" element={<Redirect Item={Login} />} />
              <Route exact path="/home" element={<Private Item={Home} />} />
              <Route
                exact
                path="/calendar"
                element={<Private Item={Calendar} />}
              />
              <Route
                exact
                path="/settings"
                element={<Private Item={Settings} />}
              />
              <Route exact path="/scales" element={<Private Item={Scales} />} />
              <Route
                exact
                path="/optionsleader"
                element={<Private Item={OptionsLeader} />}
              />
              <Route
                exact
                path="/listscale"
                element={<Private Item={ListScale} />}
              />
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </Fragment>
        )}
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesApp;
