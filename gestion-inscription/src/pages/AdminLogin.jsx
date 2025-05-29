import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";
import axios from "axios";

const AdminLogin = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
         const response = await axios.post(
            "http://localhost:4000/api/admin/login",
            {
               email,
               password,
            }
         );

         if (response.status === 200 && response.data.data) {
            // Authentification réussie
            localStorage.setItem("admin", JSON.stringify(response.data.data));
            navigate("/admin/dashboard");
         } else {
            setError("Identifiants incorrects. Veuillez réessayer.");
         }
      } catch (err) {
         setError(`Une erreur est survenue lors de la connexion `);
         console.error(`erreur de connexion : ${err}`);
      }
   };

   return (
      <div className="login-container">
         <div className="login-card">
            <div className="login-header text-center mb-4">
               <div className="login-icon">
                  <i className="bi bi-shield-lock"></i>
               </div>
               <h2 className="login-title">Connexion Admin</h2>
               <p className="text-muted">Accès réservé à l'administration</p>
            </div>

            {error && (
               <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
               >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                  <button
                     type="button"
                     className="btn-close"
                     onClick={() => setError("")}
                  ></button>
               </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
               <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                     <i className="bi bi-envelope-fill me-2"></i>Email
                  </label>
                  <input
                     type="email"
                     className="form-control form-control-lg"
                     id="email"
                     placeholder="admin@gmail.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                     <i className="bi bi-key-fill me-2"></i>Mot de passe
                  </label>
                  <input
                     type="password"
                     className="form-control form-control-lg"
                     id="password"
                     placeholder="••••••••"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>

               <div className="d-grid gap-2 mb-3">
                  <button
                     type="submit"
                     className="btn btn-primary btn-lg"
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <>
                           <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                           ></span>
                           Connexion en cours...
                        </>
                     ) : (
                        <>
                           <i className="bi bi-box-arrow-in-right me-2"></i>
                           Se connecter
                        </>
                     )}
                  </button>
               </div>

               <div className="text-center">
                  <Link to="/" className="btn btn-outline-secondary">
                     <i className="bi bi-arrow-left me-2"></i>
                     Retour à l'accueil
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AdminLogin;
