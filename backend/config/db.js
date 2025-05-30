const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0,
});

const promisePool = pool.promise();

(async () => {
   try {
      await promisePool.query("SELECT 1");
      console.log("✅ Connexion à la base de données réussie.");
   } catch (error) {
      console.error(
         "❌ Erreur de connexion à la base de données :",
         error.message
      );
   }
})();

module.exports = pool.promise(); // pour async/await*
