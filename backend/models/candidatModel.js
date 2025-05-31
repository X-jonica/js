const pool = require("../config/db");

const Candidat = {
   getAll: async () => {
      const sql = `SELECT * FROM candidats`;
      const [rows, fields] = await pool.query(sql);
      console.log("Résultat SQL :", rows);
      return rows;
   },

   getById: async (id) => {
      const sql = `SELECT * FROM candidats WHERE id = ?`;
      const [rows] = await pool.query(sql, [id]);
      return rows[0];
   },

   add: async (candidat) => {
      const {
         nom,
         prenom,
         email,
         telephone,
         type_bacc,
         annee_bacc,
         recu_paiement,
         password_hash,
      } = candidat;

      const sql = `
      INSERT INTO candidats (nom, prenom, email, telephone, type_bacc, annee_bacc, recu_paiement, password_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      const [result] = await pool.query(sql, [
         nom,
         prenom,
         email,
         telephone,
         type_bacc,
         annee_bacc,
         recu_paiement,
         password_hash,
      ]);

      // ✅ retourne l'ID inséré
      return result.insertId;
   },

   update: async (id, candidat) => {
      const {
         nom,
         prenom,
         email,
         telephone,
         type_bacc,
         annee_bacc,
         recu_paiement,
         password_hash,
      } = candidat;
      const sql = `
      UPDATE candidats SET
        nom = ?,
        prenom = ?,
        email = ?,
        telephone = ?,
        type_bacc = ?,
        annee_bacc = ?,
        recu_paiement = ?,
        password_hash = ?
      WHERE id = ?`;
      const [result] = await pool.query(sql, [
         nom,
         prenom,
         email,
         telephone,
         type_bacc,
         annee_bacc,
         recu_paiement,
         password_hash,
         id,
      ]);

      // Vérifier si la mise à jour a affecté une ligne
      if (result.affectedRows === 0) {
         throw new Error("Aucune mise à jour effectuée (ID introuvable)");
      }

      // 🔁 faire un SELECT pour obtenir la ligne modifié
      const [rows] = await pool.query("SELECT * FROM candidats WHERE id = ?", [
         id,
      ]);
      return rows[0];
   },

   delete: async (id) => {
      const sql = `DELETE FROM candidats WHERE id = ?`;
      await pool.query(sql, [id]);
   },

   search: async (keyword) => {
      const sql = `
      SELECT * FROM candidats
      WHERE nom ILIKE $1 OR prenom ILIKE $1 OR email ILIKE $1`;
      const searchTerm = `%${keyword}%`;
      const result = await pool.query(sql, [searchTerm]);
      return result.rows;
   },

   count: async () => {
      const sql = `SELECT COUNT(*) AS total FROM candidats`;
      const [rows] = await pool.query(sql);
      return rows[0].total;
   },
};

module.exports = Candidat;
