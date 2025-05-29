// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";

const DashboardAdminPage = ({ adminData }) => {
   const [stats, setStats] = useState({
      candidatsInscrits: 0,
      totalCandidats: 0,
      inscriptions: 0,
      concours: 0,
   });
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      // Simuler le chargement des données
      const fetchData = async () => {
         try {
            // En réalité, vous feriez des appels API ici
            const mockData = {
               candidatsInscrits: 42,
               totalCandidats: 125,
               inscriptions: 87,
               concours: 5,
            };
            setStats(mockData);
         } catch (error) {
            console.error("Erreur lors du chargement des données", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, []);

   return (
      <div className="dashboard-container">
         <div className="d-flex">
            {/* Utilisation du composant Sidebar */}
            <Sidebar adminName={adminData?.nom || "Admin"} />

            {/* Content area */}
            <div className="main-content">
               <h2 className="welcome-header">
                  Bienvenue, vous êtes connecté en tant qu'Administrateur{" "}
                  <i className="bi bi-emoji-smile"></i>,
                  <strong> {adminData?.nom || "Admin"}</strong>
               </h2>

               {isLoading ? (
                  <div className="text-center py-5">
                     <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                     </div>
                  </div>
               ) : (
                  <div className="row g-4">
                     {/* Card Candidats */}
                     <div className="col-md-4">
                        <div className="card dashboard-card h-100 border-0 shadow-sm">
                           <div className="card-body text-center p-4 d-flex flex-column">
                              <h5 className="card-title text-primary mb-3">
                                 <i className="bi bi-people me-2"></i>Candidats
                                 Inscrits
                              </h5>
                              <div className="card-count display-5 fw-bold text-dark mb-3">
                                 {stats.candidatsInscrits}
                              </div>
                              <small className="text-muted">
                                 sur {stats.totalCandidats} candidats au total
                              </small>
                              <Link
                                 to="/admin/candidats"
                                 className="btn btn-primary mt-auto align-self-center"
                              >
                                 Voir la liste
                              </Link>
                           </div>
                        </div>
                     </div>

                     {/* Card Inscriptions */}
                     <div className="col-md-4">
                        <div className="card dashboard-card h-100 border-0 shadow-sm">
                           <div className="card-body text-center p-4 d-flex flex-column">
                              <h5 className="card-title text-success mb-3">
                                 <i className="bi bi-file-earmark-text me-2"></i>
                                 Inscriptions
                              </h5>
                              <div className="card-count display-5 fw-bold text-dark mb-3">
                                 {stats.inscriptions}
                              </div>
                              <Link
                                 to="/admin/inscriptions"
                                 className="btn btn-success mt-auto align-self-center"
                              >
                                 Voir la liste
                              </Link>
                           </div>
                        </div>
                     </div>

                     {/* Card Concours */}
                     <div className="col-md-4">
                        <div className="card dashboard-card h-100 border-0 shadow-sm">
                           <div className="card-body text-center p-4 d-flex flex-column">
                              <h5 className="card-title text-info mb-3">
                                 <i className="bi bi-trophy me-2"></i>Concours
                              </h5>
                              <div className="card-count display-5 fw-bold text-dark mb-3">
                                 {stats.concours}
                              </div>
                              <Link
                                 to="/admin/concours"
                                 className="btn btn-info mt-auto align-self-center"
                              >
                                 Voir la liste
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default DashboardAdminPage;
