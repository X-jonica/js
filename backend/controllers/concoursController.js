const { success } = require("../config/helper");
const Concours = require("../models/concoursModel");

exports.addInscription = async (req, res) => {
   try {
      const { candidatId, concoursId } = req.body;
      if (!candidatId || !concoursId) {
         return res
            .status(400)
            .json({ message: "candidatId et concoursId sont requis" });
      }
      await Concours.addInscription(candidatId, concoursId);
      res.status(201).json({ message: "Inscription ajoutée" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
   }
};

exports.getConcoursOuverts = async (req, res) => {
   try {
      const concours = await Concours.getConcoursOuverts();
      const message = "Concours ouvert recuperé avec succes";
      res.json(success(message, concours));
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
   }
};

exports.getAll = async (req, res) => {
   try {
      const concours = await Concours.getAll();
      const message = "Tous les concours sont recuperés avec success 👍!";
      res.json(success(message, concours));
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
   }
};


