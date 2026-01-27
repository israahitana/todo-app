import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import Navbar from "../components/NavBar/Navbar";
import CalendarMonthView from "../components/Calendar/CalendarMonthView";

function Calendar() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((res) => {
        // حسب service متاعك
        setTasks(res.data || res);
      })
      .catch((err) => {
        console.error("Erreur chargement tasks", err);
      });
  }, []);

  return (
    <div className="calendar-page">
      <Navbar />

      <div className="calendar-content">
        <CalendarMonthView tasks={tasks} />
      </div>
    </div>
  );
}

export default Calendar;
