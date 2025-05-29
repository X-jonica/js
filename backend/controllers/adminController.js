const { success } = require("../config/helper");
const Admin = require("../models/adminModel");

async function login(req, res) {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ message: "Email et mot de passe requis." });
      }

      const admin = await Admin.trouverParEmail(email, password);

      if (!admin) {
         return res.status(401).json({ message: "Email ou mot de passe incorrect." });
      }

      const message = "Connexion réussie ✅";
      res.json(success(message, admin));
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
   }
}

module.exports = { login };
