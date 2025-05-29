import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/ListConcours.css";
import axios from "axios";

const ListConcoursPage = () => {
   const [concours, setConcours] = useState([]);
   const [selectedConcours, setSelectedConcours] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   // Récupération des données depuis l'API
   useEffect(() => {
      const fetchConcours = async () => {
         try {
            setIsLoading(true);
            setError(null);

            const response = await axios.get(
               "http://localhost:4000/api/concours/ouverts"
            );

            // Debug: Afficher la structure complète de la réponse
            console.log("Réponse API complète:", response);

            // Vérification plus robuste de la structure de réponse
            const responseData = response.data;

            if (!responseData) {
               throw new Error("Aucune donnée reçue du serveur");
            }

            // Cas 1: La réponse est directement un tableau
            if (Array.isArray(responseData)) {
               setConcours(responseData);
               return;
            }

            // Cas 2: La réponse est un objet avec une propriété 'data' contenant le tableau
            if (responseData.data && Array.isArray(responseData.data)) {
               setConcours(responseData.data);
               return;
            }

            // Cas 3: La réponse est un objet avec d'autres propriétés
            if (
               typeof responseData === "object" &&
               responseData.success !== undefined
            ) {
               if (Array.isArray(responseData.result)) {
                  setConcours(responseData.result);
                  return;
               }
               if (Array.isArray(responseData.concours)) {
                  setConcours(responseData.concours);
                  return;
               }
            }

            // Si aucun des cas ci-dessus ne correspond
            throw new Error(
               `Format de réponse inattendu: ${JSON.stringify(responseData)}`
            );
         } catch (err) {
            console.error("Erreur détaillée:", err);
            setError(err.message || "Erreur lors du chargement des concours");
         } finally {
            setIsLoading(false);
         }
      };

      fetchConcours();
   }, []);

   // Gérer l'affichage du modal
   const handleShowModal = (concour) => {
      setSelectedConcours(concour);
      setShowModal(true);
   };

   // Gérer la fermeture du modal
   const handleCloseModal = () => {
      setShowModal(false);
   };

   return (
      <div className="d-flex">
         {/* Sidebar réutilisable */}
         <Sidebar />

         {/* Main content */}
         <div className="main-content">
            <h1 className="page-header">Concours Disponibles</h1>

            <div className="table-container mx-auto">
               <div className="table-responsive">
                  <table className="table table-hover">
                     <thead className="thead-light">
                        <tr>
                           <th>ID</th>
                           <th>Mention</th>
                           <th className="text-nowrap">Date du concours</th>
                           <th>Statut</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {concours.length === 0 ? (
                           <tr>
                              <td colSpan="5" className="text-center py-4">
                                 Aucun concours disponible
                              </td>
                           </tr>
                        ) : (
                           concours.map((concour) => (
                              <tr key={concour.id}>
                                 <td>{concour.id}</td>
                                 <td>{concour.mention}</td>
                                 <td>
                                    {new Date(
                                       concour.date_concours
                                    ).toLocaleDateString("fr-FR")}
                                 </td>
                                 <td>
                                    <span
                                       className={`badge ${
                                          concour.statut === "ouvert"
                                             ? "bg-success"
                                             : "bg-secondary"
                                       }`}
                                    >
                                       {concour.statut}
                                    </span>
                                 </td>
                                 <td className="action-btns">
                                    <button
                                       className="btn btn-sm btn-primary me-2"
                                       onClick={() => handleShowModal(concour)}
                                    >
                                       Voir
                                    </button>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Modal pour afficher les détails */}
         {selectedConcours && (
            <div
               className={`modal fade ${showModal ? "show d-block" : ""}`}
               style={{
                  backgroundColor: showModal
                     ? "rgba(0,0,0,0.5)"
                     : "transparent",
               }}
               tabIndex="-1"
               aria-labelledby="concoursModalLabel"
               aria-hidden={!showModal}
            >
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="concoursModalLabel">
                           Détails du concours
                        </h5>
                        <button
                           type="button"
                           className="btn-close"
                           onClick={handleCloseModal}
                           aria-label="Close"
                        ></button>
                     </div>
                     <div className="modal-body">
                        <div className="modal-detail-item">
                           <span className="modal-detail-label">ID:</span>
                           <span>{selectedConcours.id}</span>
                        </div>
                        <div className="modal-detail-item">
                           <span className="modal-detail-label">Mention:</span>
                           <span>{selectedConcours.mention}</span>
                        </div>
                        <div className="modal-detail-item">
                           <span className="modal-detail-label">
                              Date du concours:
                           </span>
                           <span>
                              {new Date(
                                 selectedConcours.date_concours
                              ).toLocaleDateString("fr-FR")}
                           </span>
                        </div>
                        <div className="modal-detail-item">
                           <span className="modal-detail-label">Statut:</span>
                           <span
                              className={`badge ${
                                 selectedConcours.statut === "ouvert"
                                    ? "bg-success"
                                    : "bg-secondary"
                              }`}
                           >
                              {selectedConcours.statut}
                           </span>
                        </div>
                     </div>
                     <div className="modal-footer">
                        <button
                           type="button"
                           className="btn btn-secondary"
                           onClick={handleCloseModal}
                        >
                           Fermer
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ListConcoursPage;
