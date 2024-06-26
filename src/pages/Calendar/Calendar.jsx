import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import Header from "../../components/Header/Header";
import "./Calendar.css";

function Calendar() {
  return (
    <div className="container">
      <Header />
      <CustomCalendar />
    </div>
  );
}

export default Calendar;
