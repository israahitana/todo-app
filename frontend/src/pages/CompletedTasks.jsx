import { useEffect, useState, useRef } from "react";
import { getTasks, updateTask, deleteTask } from "../services/taskService";
import Navbar from "../components/NavBar/Navbar";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import "./TaskPages.css";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  // Edit State
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("Moyenne");
  const [editStatus, setEditStatus] = useState("À faire");
  const [editDueDate, setEditDueDate] = useState("");
  const [highlightTaskId, setHighlightTaskId] = useState(null);
  const taskRefs = useRef({});

  // Delete State
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);


  const fetchCompletedTasks = async () => {
    try {
      const data = await getTasks();
      const completed = data.filter((task) => task.status === "Terminée");
      setTasks(completed);
    } catch (error) {
      console.log("Erreur chargement tâches terminées", error);
    }
  };

  /* --- DELETE  --- */
  const openDeleteConfirm = (taskId) => {
    setTaskToDelete(taskId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(taskToDelete);
      setTasks(tasks.filter((t) => t._id !== taskToDelete));
      setShowConfirm(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setTaskToDelete(null);
  };

  /* --- EDIT --- */
  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
    setEditStatus(task.status);
    setEditDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        status: editStatus,
        dueDate: editDueDate,
      };

      const updatedTask = await updateTask(editingTaskId, updatedData);

      if (updatedTask.status !== "Terminée") {
        setTasks(tasks.filter(t => t._id !== editingTaskId));
      } else {
        setTasks(tasks.map(t => t._id === editingTaskId ? updatedTask : t));
      }
      setEditingTaskId(null);
    } catch (error) {
      console.error("Erreur update", error);
    }
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

useEffect(() => {
  fetchCompletedTasks();

    const storedId = sessionStorage.getItem("highlightTaskId");
    if (storedId) {
      setHighlightTaskId(storedId);
      sessionStorage.removeItem("highlightTaskId");

      setTimeout(() => {
        const el = taskRefs.current[storedId];
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);

      setTimeout(() => {
        setHighlightTaskId(null);
      }, 600);
    }
  }, []);

  return (
    <div className="task-page-layout">
      <Navbar />

      <div className="task-page-content">
        <div className="tasks-list-container">
          <h1 className="page-title">Tâches terminées</h1>

          <div className="tasks-wrapper">
            {tasks.length === 0 ? (
              <p className="empty-message">Aucune tâche terminée</p>
            ) : (
              tasks.map((task) => (
                <div key={task._id}
                    ref={(el) => (taskRefs.current[task._id] = el)}
                    className={`task-card-minimal ${
                      highlightTaskId === task._id ? "task-active" : ""
                    }`}
                  >


                  {editingTaskId === task._id ? (
                    <div className="task-edit-form">
                      <input className="edit-input" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Titre" />
                      <textarea className="edit-textarea" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Description" />
                      <input className="edit-input" type="date" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} />
                      <div className="edit-selects">
                        <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                          <option value="Basse">Basse</option>
                          <option value="Moyenne">Moyenne</option>
                          <option value="Haute">Haute</option>
                        </select>
                        <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                          <option value="À faire">À faire</option>
                          <option value="En cours">En cours</option>
                          <option value="Terminée">Terminée</option>
                        </select>
                      </div>
                      <div className="actions">
                        <button className="save-btn" onClick={handleSave}>Enregistrer</button>
                        <button className="cancel-btn" onClick={handleCancel}>Annuler</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="card-header">
                        <h3 className="task-title">{task.title}</h3>
                        <span className={`priority-badge priority-${task.priority?.toLowerCase() || 'moyenne'}`}>
                          {task.priority || 'Moyenne'}
                        </span>
                      </div>

                      {task.description && <p className="task-desc">{task.description}</p>}

                      <div className="card-footer">
                        <div className="task-date">
                          {task.dueDate && (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                              <span>{new Date(task.dueDate).toLocaleDateString("fr-FR")}</span>
                            </>
                          )}
                        </div>

                        <div className="card-actions">
                          <button className="icon-btn" onClick={() => handleEditClick(task)} title="Modifier">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </button>
                          <button className="icon-btn delete-btn" onClick={() => openDeleteConfirm(task._id)} title="Supprimer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          <ConfirmModal
            show={showConfirm}
            message="Voulez-vous vraiment supprimer cette tâche ?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default CompletedTasks;
