import { useEffect, useState } from "react";

import Navbar from "../components/NavBar/Navbar";
import TaskAdd from "../components/TaskAdd/TaskAdd";
import TaskManager from "../components/TaskManager/TaskManager";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import StatsBlock from "../components/StatsBlock/StatsBlock";
import "./HomeTasks.css";

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

function HomeTasks() {
  /* =======================
     STATES
  ======================= */

  const [tasks, setTasks] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  /* =======================
     LOAD TASKS
  ======================= */

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log("Erreur lors du chargement des tâches", error);
    }
  };  

  /* =======================
     TODAY FILTER 
  ======================= */

  const isToday = (dateString) => {
    if (!dateString) return false;

    const today = new Date();
    const taskDate = new Date(dateString);

    return (
      today.getDate() === taskDate.getDate() &&
      today.getMonth() === taskDate.getMonth() &&
      today.getFullYear() === taskDate.getFullYear()
    );
  };

  /* =======================
     ADD TASK
  ======================= */

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.log("Erreur lors de l’ajout de la tâche", error);
    }
  };

  /* =======================
     UPDATE TASK
  ======================= */

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await updateTask(taskId, updatedData);

      setTasks(
        tasks.map((task) =>
          task._id === taskId ? updatedTask : task
        )
      );
    } catch (error) {
      console.log("Erreur lors de la modification", error);
    }
  };

  /* =======================
     DELETE TASK
  ======================= */

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
      console.log("Erreur lors de la suppression", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setTaskToDelete(null);
  };


  return (
    <div className="home-tasks-page">
      <Navbar />

      <div className="home-tasks-content">
        <div className="tasks-container">

          <div className="tasks-page-header">
            <h1 className="page-title">Mes tâches</h1>
            <div className="current-date">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="home-tasks-header">
            <div className="add-task-wrapper">
              <TaskAdd onAdd={handleAddTask} />
            </div>
            <div className="stats-wrapper">
              <StatsBlock tasks={tasks} />
            </div>
          </div>

          <div className="today-tasks-title">
            Tâches d’aujourd’hui
          </div>
          <div className="tasks-grid">
            {/* À FAIRE */}
            <div className="task-column">
              <h3 className="column-header">
                <span className="prio-dot dot-todo"></span>
                À faire
                <span className="task-count">
                  {
                    tasks.filter(
                      (t) =>
                        t.status === "À faire" &&
                        isToday(t.dueDate)
                    ).length
                  }
                </span>
              </h3>

              <TaskManager
                tasks={tasks.filter(
                  (t) =>
                    t.status === "À faire" &&
                    isToday(t.dueDate)
                )}
                onUpdate={handleUpdateTask}
                onDelete={openDeleteConfirm}
                hideHeader={true}
              />
            </div>

            {/* EN COURS */}
            <div className="task-column">
              <h3 className="column-header">
                <span className="prio-dot dot-inprogress"></span>
                En cours
                <span className="task-count">
                  {
                    tasks.filter(
                      (t) =>
                        t.status === "En cours" &&
                        isToday(t.dueDate)
                    ).length
                  }
                </span>
              </h3>

              <TaskManager
                tasks={tasks.filter(
                  (t) =>
                    t.status === "En cours" &&
                    isToday(t.dueDate)
                )}
                onUpdate={handleUpdateTask}
                onDelete={openDeleteConfirm}
                hideHeader={true}
              />
            </div>

            {/* TERMINÉE */}
            <div className="task-column">
              <h3 className="column-header">
                <span className="prio-dot dot-done"></span>
                Terminée
                <span className="task-count">
                  {
                    tasks.filter(
                      (t) =>
                        t.status === "Terminée" &&
                        isToday(t.dueDate)
                    ).length
                  }
                </span>
              </h3>

              <TaskManager
                tasks={tasks.filter(
                  (t) =>
                    t.status === "Terminée" &&
                    isToday(t.dueDate)
                )}
                onUpdate={handleUpdateTask}
                onDelete={openDeleteConfirm}
                hideHeader={true}
              />
            </div>
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

export default HomeTasks;
