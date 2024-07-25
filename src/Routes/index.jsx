// src/App.jsx
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

import Settings from "../pages/Settings/Settings";
import Scales from "../pages/Scales/Scales";
// import Register from "../pages/Register/Register";
// import TesteApi from "../pages/TesteApi/TesteApi";
import ListScale from "../pages/ListScale/ListScale";
import Members from "../pages/Members/Members";
import CalendarLeader from "../pages/CalendarLeader/CalendarLeader";
import OptionsLeader from "../pages/OptionsLeader/OptionsLeader";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Calendar from "../pages/Calendar/Calendar";
import useAuth from "../context/AuthProvider/useAuth";
import AddWorkers from "../pages/AddWorkers/AddWorkers";
import UsersSettings from "../pages/UsersSettings/UsersSettings";
import Help from "../pages/Help/Help";
import EditScale from "../pages/EditScale/EditScale";

const Private = ({ Item }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Login />;
  } else {
    return <Item />;
  }
};

const IsLogin = ({ Item }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
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
        <Route path="/" element={<IsLogin Item={Login} />} />
        <Route path="*" element={<IsLogin Item={Login} />} />
        <Route exact path="/home" element={<Private Item={Home} />} />
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
        <Route exact path="/members" element={<Private Item={Members} />} />
        <Route exact path="/scales" element={<Private Item={Scales} />} />
        <Route
          exact
          path="/members/add-workers"
          element={<Private Item={AddWorkers} />}
        />
        <Route exact path="/listscale" element={<Private Item={ListScale} />} />
        <Route exact path="/users" element={<Private Item={UsersSettings} />} />
        <Route exact path="/help" element={<Private Item={Help} />} />
        <Route
          exact
          path="/editscale/:id"
          element={<Private Item={EditScale} />}
        />
      </Routes>
      {/* <Suspense fallback={<LoadingSpinner />}>
        {loading ? (
          <LoadingSpinner /> // Mostra o loading spinner enquanto as páginas estão sendo carregadas
        ) : (
          <Fragment>
            <Routes>
              
              
              
              
              
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </Fragment>
        )}
      </Suspense> */}
    </BrowserRouter>
  );
};

export default RoutesApp;
