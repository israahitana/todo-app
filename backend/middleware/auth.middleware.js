const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // accéder au header d'autorisation
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Accès refusé, token manquant",
      });
    }

    // separer le token du mot "Bearer"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token invalide",
      });
    }

    //verifier le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //sauvegarder l'ID utilisateur dans la requête
    req.userId = decoded.userId;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token non valide ou expiré",
    });
  }
};

// exporter le middleware
module.exports = authMiddleware;
