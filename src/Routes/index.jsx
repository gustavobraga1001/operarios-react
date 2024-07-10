// src/App.jsx
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Fragment, Suspense, useEffect, useState } from "react";

import Settings from "../pages/Settings/Settings";
// import Scales from "../pages/Scales/Scales";
// import Register from "../pages/Register/Register";
// import ListScale from "../pages/ListScale/ListScale";
// import Members from "../pages/Members/Members";
// import TesteApi from "../pages/TesteApi/TesteApi";
import CalendarLeader from "../pages/CalendarLeader/CalendarLeader";
import OptionsLeader from "../pages/OptionsLeader/OptionsLeader";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Calendar from "../pages/Calendar/Calendar";
import useAuth from "../context/AuthProvider/useAuth";

const Private = ({ Item }) => {
  const auth = useAuth();
  if (!auth.token) {
    return <Login />;
  } else {
    return <Item />;
  }
};

const IsLogin = ({ Item }) => {
  const auth = useAuth();
  if (!auth.token) {
    return <Item />;
  } else {
    return <Home />;
  }
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
      <Routes>
        <Route exact path="/home" element={<Private Item={Home} />} />
        <Route path="/" element={<IsLogin Item={Login} />} />
        <Route path="*" element={<IsLogin Item={Login} />} />
        <Route exact path="/settings" element={<Private Item={Settings} />} />
        <Route exact path="/calendar" element={<Private Item={Calendar} />} />
        <Route
          exact
          path="/optionsleader"
          element={<Private Item={OptionsLeader} />}
        />
        <Route
          exact
          path="/calendarleader"
          element={<Private Item={CalendarLeader} />}
        />
      </Routes>
      {/* <Suspense fallback={<LoadingSpinner />}>
        {loading ? (
          <LoadingSpinner /> // Mostra o loading spinner enquanto as páginas estão sendo carregadas
        ) : (
          <Fragment>
            <Routes>
              <Route exact path="/scales" element={<Private Item={Scales} />} />
              
              <Route
                exact
                path="/listscale"
                element={<Private Item={ListScale} />}
              />
              <Route
                exact
                path="/members"
                element={<Private Item={Members} />}
              />
              
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </Fragment>
        )}
      </Suspense> */}
    </BrowserRouter>
  );
};

export default RoutesApp;
