const express = require("express"); // connection avec express
const router = express.Router();// initialisation router avec express
const User = require("../models/User");// importation modele User
const bcrypt = require("bcrypt");// connection avec bcrypt(cryptage mot de passe)
const jwt = require("jsonwebtoken");// connection avec jsonwebtoken (token pour authentification)


//register route (inscription utilisateur)
router.post("/register", async (req, res) => {// request/response asynchrone
  try {
    const { email, password } = req.body;//les donnees envoyees par le frontend

    //verifications
    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }
    //chercher si user existe deja dans DB 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Utilisateur déjà existant",
      });
    }

    //cryptage mot de passe 
    const hashedPassword = await bcrypt.hash(password, 10);

    //creation nouveau user avec mot de passe crypté
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    //sauvegarde user dans DB 
    await newUser.save();

    // message pour confirmer creation user (pour le frontend)
    res.status(201).json({
      message: "Utilisateur créé avec succès",
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
    });
  }
});


// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //verifications champs remplis
    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    //verifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    //verifier mot de passe 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    //creer token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // envoyer token et userId au frontend
    res.status(200).json({
      token: token,
      userId: user._id,
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
    });
  }
});

module.exports = router; //exportation router

//return res.status(201).json({ message: "...." }); json pour le frontend et 201->creation 500->erreur serveur 400->erreur
