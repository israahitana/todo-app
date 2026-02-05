import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DateCard({ date, tasks = [] }) {
  const [showAll, setShowAll] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const navigate = useNavigate(); //pour la navigation entre les pages

  const label = date.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  // taches visible 2 sinon visible tous 
  const visibleTasks = showAll ? tasks : tasks.slice(0, 2);

  //pour chaque status route 
  const statusRouteMap = {
    "À faire": "/a-faire",
    "En cours": "/en-cours",
    "Terminée": "/completed",
  };
  ////////
  const handleTaskClick = (task) => {
    const taskId = task._id || task.id;
    const route = statusRouteMap[task.status];
    if (!route) return;

    // effet visuel immédiat
    setActiveTaskId(taskId);

    // stocker l'id pour la page suivante
    sessionStorage.setItem("highlightTaskId", taskId);

    // navigation après un petit délai
    setTimeout(() => {
      navigate(route);
    }, 400);
  };

  return (
    <div className="date-card">
      <div className="date-label">{label}</div>

      {tasks.length === 0 ? (
        <div className="no-task">—</div>
      ) : (
        <>
          <div className="task-list">
            {visibleTasks.map((task) => {
              const taskId = task._id || task.id;

              return (
                <div
                  key={taskId}
                  className={`task ${
                    activeTaskId === taskId ? "task-active" : ""
                  }`}
                  title={task.title}
                  onClick={() => handleTaskClick(task)}
                >
                  {task.title}
                </div>
              );
            })}
          </div>

          {tasks.length > 2 && (
            <button
              className="toggle-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Masquer" : `+${tasks.length - 2} autres`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default DateCard;
