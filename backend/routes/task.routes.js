const express = require("express");
const router = express.Router();// initialisation router avec express(pour regrouper les routes aux tasks)

const Task = require("../models/Task");//importer le modele task 
const authMiddleware = require("../middleware/auth.middleware");//importer le miiddleware pour verifier le jwt 

/** 
 *  CREATE TASK 
 *  POST /api/tasks 
 */
router.post("/", authMiddleware, async (req, res) => {// definit route post ( middleware pour verifier le token avant de creer une tache)
  try {
    const { title, description, status, priority, dueDate } = req.body;//les donnees envoyees par le frontend

    if (!title) {
      return res.status(400).json({
        message: "Le titre est obligatoire",
      });
    }
    //creation nouvelle tache
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.userId,// recuperer l'ID utilisateur depuis le middleware
    });

    await newTask.save();// sauvegarde tache dans  DB

    res.status(201).json(newTask);// renvoyer la tache creee au frontend
    
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",// message d'erreur serveur
    });
  }
});

/**
 * GET ALL TASKS (for connected user)
 * GET /api/tasks
 */
router.get("/", authMiddleware, async (req, res) => {    // definit route get ( middleware pour verifier le token avant de recuperer les taches)
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({  //recuperer uniquement les taches de l'utilisateur connecte
      createdAt: -1,// trier par date la plus recente
    });

    res.status(200).json(tasks);// renvoyer les taches au frontend
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
    });
  }
});

/**
 * UPDATE TASK
 * PUT /api/tasks/:id
 */
router.put("/:id", authMiddleware, async (req, res) => { // definit route put pour mettre a jour une tache avec son id ( middleware pour verifier le token avant de mettre a jour la tache)
  try {
    const taskId = req.params.id;// recuperer l'id de la tache depuis les parametres de l'URL

    const updatedTask = await Task.findOneAndUpdate(  //chercher et mettre a jour la tache
      { _id: taskId, userId: req.userId },          // s'assurer que la tache appartient a l'utilisateur connecte
      req.body,    // nouvelles donnees pour la mise a jour
      { new: true }  // retourner la tache mise a jour
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Tâche non trouvée",
      });
    }

    res.status(200).json(updatedTask); // retourner la tache modifiee au frontend
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur", // message d'erreur serveur
    });
  }
});

/**
 * DELETE TASK
* DELETE /api/tasks/:id
 */
router.delete("/:id", authMiddleware, async (req, res) => { // definit route delete pour supprimer une tache avec son id 
  try {
    const taskId = req.params.id;   // recuperer l'id de la tache depuis les parametres de l'URL

    const deletedTask = await Task.findOneAndDelete({  //chercher et supprimer la tache
      _id: taskId,    // s'assurer que la tache appartient a l'utilisateur connecte
      userId: req.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Tâche non trouvée", // message si tache non trouvee
      });
    }

    res.status(200).json({
      message: "Tâche supprimée avec succès",   // message de confirmation de suppression
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur", // message d'erreur serveur
    });
  }
});

// exporter le router
module.exports = router;
