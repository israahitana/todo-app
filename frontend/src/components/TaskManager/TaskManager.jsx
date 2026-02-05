import { useState } from "react";
import "./TaskManager.css";

/*
  Composant qui gère :
  - l'affichage des tâches
  - la modification
  - les boutons modifier / supprimer
*/
function TaskManager({ tasks, onUpdate, onDelete, hideHeader = false }) {
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("Moyenne");
  const [editStatus, setEditStatus] = useState("À faire");
  const [editDueDate, setEditDueDate] = useState("");

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
    setEditStatus(task.status);


    setEditDueDate(
      task.dueDate ? task.dueDate.slice(0, 10) : ""
    );
  };


  const handleSave = () => {
    onUpdate(editingTaskId, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      status: editStatus,
      dueDate: editDueDate,
    });
    setEditingTaskId(null);
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="task-manager">
      {!hideHeader && <h3>Liste des tâches</h3>}

      {tasks.length === 0 && (
        <div className="empty-state">
          <p>Aucune tâche</p>
        </div>
      )}

      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          {editingTaskId === task._id ? (
            /* ===== EDIT ===== */
            <div className="task-edit">
              <input
                className="edit-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Titre"
              />

              <textarea
                className="edit-textarea"
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                placeholder="Description"
              />
              <input
                className="edit-input"
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />


              <div className="edit-selects">
                <select
                  value={editPriority}
                  onChange={(e) =>
                    setEditPriority(e.target.value)
                  }
                >
                  <option value="Basse">Basse</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Haute">Haute</option>
                </select>

                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="À faire">À faire</option>
                  <option value="En cours">En cours</option>
                  <option value="Terminée">Terminée</option>
                </select>
              </div>

              <div className="actions">
                <button className="save-btn" onClick={handleSave}>
                  Enregistrer
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            /* ===== AFFICHAGE ===== */
            <>
              <div className="task-header">
                <h4>{task.title}</h4>
                <div className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </div>
              </div>

              {task.description && <p className="task-desc">{task.description}</p>}

              <div className="task-meta">
                {task.dueDate && (
                  <div className="task-date">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="task-actions">
                <button
                  className="icon-btn edit-btn"
                  onClick={() => handleEditClick(task)}
                  title="Modifier"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() => onDelete(task._id)}
                  title="Supprimer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskManager;
