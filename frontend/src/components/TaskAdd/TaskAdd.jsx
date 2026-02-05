import { useState } from "react";
import "./TaskAdd.css";

/*
  Composant responsable uniquement de l'ajout d'une tâche
*/
function TaskAdd({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Moyenne");
  const [status, setStatus] = useState("À faire");
  const [dueDate, setDueDate] = useState("");


  const handleSubmit = (e) => { 
    e.preventDefault(); //no refresh 
    if (!title) return;

    onAdd({ //data de formulaire
      title,
      description,
      priority,
      status,
      dueDate,
    });
    //apres modification reset form
    setTitle("");
    setDescription("");
    setPriority("Moyenne");
    setStatus("À faire");
  };

  return (
    <div className="task-add">
      <h3>Ajouter une tâche</h3>

      <form className="task-add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="À faire">À faire</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default TaskAdd;
