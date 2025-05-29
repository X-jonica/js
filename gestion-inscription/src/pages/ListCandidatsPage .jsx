import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ListCandidats.css";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const ListCandidatsPage = () => {
   const [candidatsValides, setCandidatsValides] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCandidat, setSelectedCandidat] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [error, setError] = useState(null);


   useEffect(() => {
      const fetchCandidats = async () => {
         try {
            setIsLoading(true);
            setError(null);
            
            const response = await axios.get("http://localhost:4000/api/inscriptions/valides");
            
            // Debug: Afficher la structure complète de la réponse
            console.log("Réponse complète de l'API:", response);
            
            // Vérification plus robuste de la réponse
            const responseData = response.data;
            
            if (!responseData) {
               throw new Error("Aucune donnée reçue du serveur");
            }
   
            // Vérifie si la réponse est déjà un tableau (structure directe)
            if (Array.isArray(responseData)) {
               setCandidatsValides(responseData);
               return;
            }
   
            // Vérifie si la réponse est un objet avec une propriété 'data' contenant le tableau
            if (responseData.data && Array.isArray(responseData.data)) {
               setCandidatsValides(responseData.data);
               return;
            }
   
            // Si aucune des structures ci-dessus ne correspond
            throw new Error(`Format de réponse inattendu: ${JSON.stringify(responseData)}`);
            
         } catch (err) {
            console.error("Erreur détaillée:", err);
            setError(err.message || "Erreur lors du chargement des données. Veuillez réessayer.");
         } finally {
            setIsLoading(false);
         }
      };
   
      fetchCandidats();
   }, []);

   // Filtrer les candidats selon le terme de recherche
   const filteredCandidats = candidatsValides.filter((candidat) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
         candidat.nom.toLowerCase().includes(searchLower) ||
         candidat.prenom.toLowerCase().includes(searchLower) ||
         candidat.email.toLowerCase().includes(searchLower)
      );
   });

   // Gérer l'affichage du modal
   const handleShowModal = (candidat) => {
      setSelectedCandidat(candidat);
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
            <h1 className="page-header">
               <span>Liste des Candidats</span>
            </h1>

            {/* Message d'information */}
            <div className="alert alert-info mb-4">
               <i className="bi bi-info-circle me-2"></i>
               Seuls les candidats dont l'inscription a été validée et qui
               participeront au concours sont affichés ici.
            </div>

            {/* Formulaire de recherche */}
            <div className="search-container">
               <form className="row g-3">
                  <div className="col-md-12 search-box">
                     <i className="bi bi-search"></i>
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher par nom, prénom ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
               </form>
            </div>

            {/* Tableau des candidats */}
            <div className="table-container">
               {isLoading ? (
                  <div className="text-center py-5">
                     <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                     </div>
                  </div>
               ) : (
                  <div className="table-responsive">
                     <table className="table table-hover table-sm">
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Nom</th>
                              <th>Prénom</th>
                              <th>Email</th>
                              <th>Téléphone</th>
                              <th className="text-nowrap">Type Bac</th>
                              <th className="text-nowrap">Année Bac</th>
                              <th>Paiement</th>
                              <th>Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {filteredCandidats.length === 0 ? (
                              <tr>
                                 <td colSpan="9" className="text-center py-4">
                                    Aucun candidat validé trouvé
                                 </td>
                              </tr>
                           ) : (
                              filteredCandidats.map((candidat) => (
                                 <tr key={candidat.id}>
                                    <td>{candidat.id}</td>
                                    <td>{candidat.nom}</td>
                                    <td>{candidat.prenom}</td>
                                    <td>{candidat.email}</td>
                                    <td>{candidat.telephone}</td>
                                    <td>{candidat.type_bacc}</td>
                                    <td>{candidat.annee_bacc}</td>
                                    <td>
                                       <span
                                          className={`badge ${
                                             candidat.recu_paiement
                                                ? "bg-success"
                                                : "bg-danger"
                                          }`}
                                       >
                                          {candidat.recu_paiement
                                             ? "Oui"
                                             : "Non"}
                                       </span>
                                    </td>
                                    <td className="action-btns">
                                       <button
                                          className="btn btn-sm btn-primary me-2"
                                          data-bs-toggle="modal"
                                          data-bs-target="#candidatModal"
                                          onClick={() =>
                                             handleShowModal(candidat)
                                          }
                                       >
                                          <i className="bi bi-eye"></i> Voir
                                       </button>
                                    </td>
                                 </tr>
                              ))
                           )}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>
         </div>

         {/* Modal pour afficher les détails */}
         {selectedCandidat && (
            <div
               className={`modal fade ${showModal ? "show d-block" : ""}`}
               id="candidatModal"
               tabIndex="-1"
               aria-labelledby="candidatModalLabel"
               aria-hidden={!showModal}
               style={{
                  backgroundColor: showModal
                     ? "rgba(0,0,0,0.5)"
                     : "transparent",
               }}
            >
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="candidatModalLabel">
                           Détails du candidat
                        </h5>
                        <button
                           type="button"
                           className="btn-close"
                           onClick={handleCloseModal}
                           aria-label="Close"
                        ></button>
                     </div>
                     <div className="modal-body">
                        <div className="mb-3">
                           <label className="form-label modal-detail-label">
                              ID
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              value={selectedCandidat.id}
                              disabled
                           />
                        </div>
                        <div className="mb-3">
                           <label className="form-label modal-detail-label">
                              Nom
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              value={selectedCandidat.nom}
                              disabled
                           />
                        </div>
                        <div className="mb-3">
                           <label className="form-label modal-detail-label">
                              Prénom
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              value={selectedCandidat.prenom}
                              disabled
                           />
                        </div>
                        <div className="mb-3">
                           <label className="form-label modal-detail-label">
                              Email
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              value={selectedCandidat.email}
                              disabled
                           />
                        </div>
                        <div className="mb-3">
                           <label className="form-label modal-detail-label">
                              Téléphone
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              value={selectedCandidat.telephone}
                              disabled
                           />
                        </div>
                        <div className="mb-3">
                           <label className="form-label modal-detail-label">
                              Type Bac
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              value={selectedCandidat.type_bacc}
                              disabled
                           />
                        </div>
                        <div className="mb-3">
                           <label className="form-label modal-detail-label">
                              Année Bac
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              value={selectedCandidat.annee_bacc}
                              disabled
                           />
                        </div>
                        <div className="mb-3">
                           <label className="form-label modal-detail-label">
                              Paiement reçu
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              value={
                                 selectedCandidat.recu_paiement ? "Oui" : "Non"
                              }
                              disabled
                           />
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

export default ListCandidatsPage;
