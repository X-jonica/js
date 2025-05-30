const pool = require("../config/db");

const Concours = {
   // Ajoute une inscription au concours
   addInscription: async (candidatId, concoursId) => {
      const sql = `INSERT INTO inscriptions (candidat_id, concours_id) VALUES (?, ?)`;
      await pool.query(sql, [candidatId, concoursId]);
   },

   // Récupère tous les concours ouverts
   getConcoursOuverts: async () => {
      const sql = `SELECT * FROM concours`;
      const [rows] = await pool.query(sql);
      return rows;
   },

   // Récupère tous les concours (statique)
   getAll: async () => {
      const sql = `SELECT * FROM concours`;
      const [rows] = await pool.query(sql);
      return rows;
   },

   // Compte le nombre total de concours
   count: async () => {
      const sql = `SELECT COUNT(*) as total FROM concours`;
      const [rows] = await pool.query(sql);
      return rows[0].total;
   },
};

module.exports = Concours;
