const db = require("../config/db");
const pool = require("../config/db");

const Inscription = {
   getAll: async () => {
      const [rows] = await db.query("SELECT * FROM Inscriptions");
      return rows;
   },

   getById: async (id) => {
      const [rows] = await db.query("SELECT * FROM Inscriptions WHERE id = ?", [
         id,
      ]);
      return rows[0];
   },

   add: async ({ candidat_id, concours_id, date_inscription, statut }) => {
      const [result] = await db.query(
         "INSERT INTO Inscriptions (candidat_id, concours_id, date_inscription, statut) VALUES (?, ?, ?, ?)",
         [candidat_id, concours_id, date_inscription, statut || "en_attente"]
      );
      return result.insertId;
   },
   update: async (
      id,
      { candidat_id, concours_id, date_inscription, statut }
   ) => {
      try {
         await db.query(
            "UPDATE Inscriptions SET candidat_id = ?, concours_id = ?, date_inscription = ?, statut = ? WHERE id = ?",
            [candidat_id, concours_id, date_inscription, statut, id]
         );
      } catch (error) {
         console.error("Erreur lors de la mise à jour :", error);
         throw error; // pour que le contrôleur réponde avec le bon code
      }
   },

   delete: async (id) => {
      await db.query("DELETE FROM Inscriptions WHERE id = ?", [id]);
   },

   getAllWithDetails: async () => {
      const [rows] = await db.query(`
      SELECT i.*, 
             c.nom AS candidat_nom, c.prenom AS candidat_prenom,
             co.mention AS concours_mention
      FROM Inscriptions i
      JOIN Candidats c ON i.candidat_id = c.id
      JOIN Concours co ON i.concours_id = co.id
    `);
      return rows;
   },

   search: async (searchTerm, statutFilter = null) => {
      let sql = `
      SELECT i.*, 
             c.nom AS candidat_nom, c.prenom AS candidat_prenom,
             co.mention AS concours_mention
      FROM Inscriptions i
      JOIN Candidats c ON i.candidat_id = c.id
      JOIN Concours co ON i.concours_id = co.id
      WHERE (c.nom LIKE ? OR c.prenom LIKE ? OR co.mention LIKE ?)
    `;

      const params = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

      if (statutFilter) {
         sql += " AND i.statut = ?";
         params.push(statutFilter);
      }

      const [rows] = await db.query(sql, params);
      return rows;
   },

   getCandidatsValides: async () => {
      const [rows] = await db.query(`
         SELECT c.*, 
                i.statut AS statut_inscription,
                co.mention AS concours_mention
         FROM Candidats c
         JOIN Inscriptions i ON c.id = i.candidat_id
         JOIN Concours co ON i.concours_id = co.id
         WHERE i.statut = 'validé'
      `);
      return rows;
   },

   updateStatus: async (id, statut) => {
      await db.query("UPDATE inscriptions SET statut = ? WHERE id = ?", [
         statut,
         id,
      ]);
   },

   count: async () => {
      const sql = "SELECT COUNT(*) AS total FROM inscriptions";
      const [rows] = await pool.query(sql);
      return rows[0].total; // retourne { total: X }
   },

   countInscrit: async () => {
      const sql = `SELECT c.*
FROM Candidats c
JOIN Inscriptions i ON c.id = i.candidat_id
WHERE i.statut = 'validé';
`;
      const [rows] = await pool.query(sql);
      return rows;
   },
};

module.exports = Inscription;
