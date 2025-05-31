// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const DashboardAdminPage = ({ adminData }) => {
   const [countConcours, setCountConcours] = useState(0);
   const [countInscriptions, setCountInscriptions] = useState(0);
   const [countCandidats, setCountCandidats] = useState(0);
   const [countCandidatsInscrit, setCountCandidatsInscrit] = useState(0);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            // Requête pour le nombre de concours
            const responseConcours = await axios.get(
               "http://localhost:4000/api/concours/count"
            );
            const totalConcours = responseConcours.data.data;
            setCountConcours(totalConcours);
            console.log(`Nombre de concours disponible : ${totalConcours}`);

            // Requête pour le nombre d'inscriptions
            const responseInscriptions = await axios.get(
               "http://localhost:4000/api/inscriptions/count"
            );
            const totalInscriptions = responseInscriptions.data.data;
            setCountInscriptions(totalInscriptions);
            console.log(`Nombre d'inscriptions : ${totalInscriptions}`);

            // Requete pour le nombre de candidat
            const responseCandidats = await axios.get(
               "http://localhost:4000/api/candidats/count"
            );
            const totalCandidats = responseCandidats.data.data;
            setCountCandidats(totalCandidats);
            console.log(`Nombre de candidat : ${totalCandidats}`);

            // Requette pour get le candidat inscrit avec status valide
            const responseCandidatInscrit = await axios.get(
               "http://localhost:4000/api/inscriptions/count/inscrit"
            );
            const totalCandidatInscrit =
               responseCandidatInscrit.data.data.length;
            setCountCandidatsInscrit(totalCandidatInscrit);
            console.log(
               `Nombre de candidat inscrit avec status validé : ${totalCandidatInscrit}`
            );
         } catch (error) {
            console.error(`Erreur de récupération : ${error}`);
            setError(error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, []);

   return (
      <div className="dashboard-container">
         <div className="d-flex">
            <Sidebar adminName={adminData?.nom || "Admin"} />

            <div className="main-content">
               <h2 className="welcome-header">
                  Bienvenue, vous êtes connecté en tant qu'Administrateur{" "}
                  <i className="bi bi-emoji-smile"></i>,{" "}
                  <strong>{adminData?.nom || "Admin"}</strong>
               </h2>

               {error ? (
                  <div className="alert alert-danger">{error}</div>
               ) : isLoading ? (
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
                                 {countCandidatsInscrit}
                              </div>
                              <small className="text-muted">
                                 sur {countCandidats} candidats au total
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
                                 {countInscriptions}
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
                                 {countConcours}
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
