import { useEffect, useState } from "react";
import "./StatsBlock.css";

function StatsBlock({ tasks }) {
  const total = tasks.length;

  const done = tasks.filter(t => t.status === "Terminée").length;
  const inProgress = tasks.filter(t => t.status === "En cours").length;
  const todo = tasks.filter(t => t.status === "À faire").length;

  //  calcul percentages
  const donePct = total ? Math.round((done / total) * 100) : 0;
  const progressPct = total ? Math.round((inProgress / total) * 100) : 0;
  const todoPct = total ? Math.round((todo / total) * 100) : 0;

  // state pour animation
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 100);
  }, [tasks]);

  return (
    <div className="stats-block">
      <h3>Statistiques</h3>

      <p>Total des tâches : <strong>{total}</strong></p>

      {/* Terminées */}
      <div className="stat">
        <span>Terminées ({donePct}%)</span>
        <div className="bar">
          <div
            className="fill done"
            style={{ width: animate ? `${donePct}%` : "0%" }}
          />
        </div>
      </div>

      {/* En cours */}
      <div className="stat">
        <span>En cours ({progressPct}%)</span>
        <div className="bar">
          <div
            className="fill progress"
            style={{ width: animate ? `${progressPct}%` : "0%" }}
          />
        </div>
      </div>

      {/* À faire */}
      <div className="stat">
        <span>À faire ({todoPct}%)</span>
        <div className="bar">
          <div
            className="fill todo"
            style={{ width: animate ? `${todoPct}%` : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default StatsBlock;
