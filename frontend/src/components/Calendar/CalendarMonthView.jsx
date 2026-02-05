import { useState } from "react";
import DateCard from "./DateCard";
import "./Calendar.css";

function CalendarMonthView({ tasks = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthLabel = currentDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  for (let i = 0; i < startDay; i++) { //vide si le mois ne commence pas un lundi
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {// remplir les jours du mois
    cells.push(new Date(year, month, d));
  }

  //navigation mois/année
  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  const prevYear = () =>
    setCurrentDate(new Date(year - 1, month, 1));

  const nextYear = () =>
    setCurrentDate(new Date(year + 1, month, 1));

  return (
    <div className="calendar-container">
      {/* Navigation  */}
      <div className="month-nav">
        <div className="nav-group">
          <button onClick={prevYear}>«</button>
          <button onClick={prevMonth}>‹</button>
        </div>

        <h2 className="current-month">{monthLabel}</h2>

        <div className="nav-group">
          <button onClick={nextMonth}>›</button>
          <button onClick={nextYear}>»</button>
        </div>
      </div>

      {/* Header semaine */}
      <div className="week-header">
        <div>Lun</div><div>Mar</div><div>Mer</div>
        <div>Jeu</div><div>Ven</div><div>Sam</div><div>Dim</div>
      </div>

      {/* Grille */}
      <div className="month-grid">
        {cells.map((date, index) =>
          date ? (
            <DateCard
              key={index}
              date={date}
              tasks={tasks.filter(
                (t) =>
                  t.dueDate &&
                  new Date(t.dueDate).toDateString() ===
                    date.toDateString()
              )}
            />
          ) : (
            <div key={index} className="empty-cell"></div>
          )
        )}
      </div>
    </div>
  );
}

export default CalendarMonthView;
