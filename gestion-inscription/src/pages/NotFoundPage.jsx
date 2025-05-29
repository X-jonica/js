import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css"; // Créez ce fichier CSS

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}></div>
        ))}
      </div>
      
      <div className="not-found-content">
        <div className="glitch-container">
          <h1 className="glitch" data-text="404">404</h1>
          <h2 className="subtitle">Page Non Trouvée</h2>
        </div>
        
        <p className="description">
          Oups! La page que vous cherchez semble s'être égarée dans l'espace numérique.
        </p>
        
        <div className="astronaut">
          <div className="helmet"></div>
          <div className="face">
            <div className="eyes">
              <div className="left-eye"></div>
              <div className="right-eye"></div>
            </div>
            <div className="mouth"></div>
          </div>
          <div className="body"></div>
          <div className="left-arm"></div>
          <div className="right-arm"></div>
          <div className="left-leg"></div>
          <div className="right-leg"></div>
        </div>
        
        <button 
          className="home-button"
          onClick={() => navigate("/")}
        >
          <span>Retour à l'accueil</span>
          <div className="rocket">
            <div className="rocket-body">
              <div className="window"></div>
            </div>
            <div className="fire"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;