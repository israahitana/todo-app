require("dotenv").config();//connection avec .env 
const express = require("express");//connection avec express
const mongoose = require("mongoose");//connection avec mongoose
const cors = require("cors");//connection avec cors(backend et frontend)

const authRoutes = require("./routes/auth.routes");//importation routes auth
const taskRoutes = require("./routes/task.routes");//importation routes tasks


const app = express(); //initialisation app avec express

app.use(cors()); // utilisation de cors avec app
app.use(express.json());//utilisation de json avec app

mongoose.connect(process.env.MONGO_URI) //connection de serveur avec mongoDB atlas (.env)
  .then(() => console.log("MongoDB Atlas connecté ✅"))
  .catch(err => console.log(err)); //affiche au terminal msg de connection ou erreur  




app.use("/api/auth", authRoutes);// utilisation des routes auth avec app
app.use("/api/tasks", taskRoutes);// utilisation des routes tasks avec app





app.get("/", (req, res) => { //route 
  res.send("Backend todo-app OK 🚀");// affiche msg de confirmation de route
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Serveur sur http://localhost:5000");// ouvre route au serveur sur port defini au .env ou 5000 par defaut et affiche msg de confirmation sur le terminal
});
