import React from "react";
import '../styles/HomePage.css'
import { Link } from "react-router-dom";

const HomePage = () => {
   return (
      <>
         <div className="homepage">
            <div className="overlay"></div>
            <div className="container d-flex flex-column justify-content-center align-items-center text-center text-white h-100 position-relative z-1">
               <h1 className="display-4 mb-4">
                  Bienvenue sur la plateforme de concours de l'EMIT
               </h1>
               <div className="d-flex gap-3 flex-wrap justify-content-center">
                  <Link
                     to="/inscription"
                     className="btn btn-primary px-4 py-2 fs-5"
                  >
                     S'inscrire
                  </Link>
                  <Link
                     to="/login"
                     className="btn btn-primary px-4 py-2 fs-5"
                  >
                     Se connecter
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
};

export default HomePage;
