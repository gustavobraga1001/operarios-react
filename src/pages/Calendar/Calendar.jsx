// import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import "./Calendar.css";

function Calendar() {
  return (
    <div className="container">
      <Header />
      <CustomCalendar />
      <Footer />
    </div>
  );
}

export default Calendar;
