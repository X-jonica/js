const pool = require("../config/db");

async function trouverParEmail(email, password) {
   const [rows] = await pool.query(
      "SELECT * FROM admin WHERE email = ? AND mot_de_passe = ?",
      [email, password]
   );
   return rows[0];
}

module.exports = { trouverParEmail };
