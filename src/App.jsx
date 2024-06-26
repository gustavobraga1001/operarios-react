// src/App.jsx

import CustomCalendar from "./components/CustomCalendar/CustomCalendar";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <CustomCalendar />
    </div>
  );
}

export default App;