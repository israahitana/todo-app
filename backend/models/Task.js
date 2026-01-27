const mongoose = require("mongoose");// connection avec mongoose


const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["À faire", "En cours", "Terminée"],
      default: "À faire",
    },

    priority: {
      type: String,
      enum: ["Basse", "Moyenne", "Haute"],
      default: "Moyenne",
    },
    dueDate: {
      type : Date,
      required: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,// Référence à l'ID de user
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
