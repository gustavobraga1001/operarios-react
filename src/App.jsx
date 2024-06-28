// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Calendar from "./pages/Calendar/Calendar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings/Settings";
import LoadingSpinner from "./components/Loading/Loading";
import { Suspense, useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simula um atraso de 1 segundo

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
      {loading ? (
        <LoadingSpinner /> // Mostra o loading spinner enquanto as páginas estão sendo carregadas
        ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        )}

      </Suspense>
    </Router>
  );
}

export default App;
