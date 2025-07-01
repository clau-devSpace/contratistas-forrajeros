import React from 'react';
import './contacto.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/images/logos/Group 5.svg';
import Fondo from '../assets/images/imagenes-de-fondo/edicion3.jpg';

const Contacto = () => {
  return (
    <div 
      className="pagina-contacto" 
      style={{
        backgroundImage: `url(${Fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <div className="profile-card-wrapper">
        <div className="profile-card-content">
          <h1 className="title">Cámara Argentina de Contratistas Forrajeros</h1>
          <p className="hashtag">#ensiladores</p>

          <div className="social-icons">
            <div className="social-icon">
              <i className="bi bi-whatsapp"></i>
            </div>
            <div className="social-icon">
              <i className="bi bi-envelope-fill"></i>
            </div>
            <div className="social-icon">
              <i className="bi bi-geo-alt"></i>
            </div>
          </div>

          <div className="action-buttons">
            <a 
              href="https://congresoargentinodeforrajes.com.ar/"
              className="action-button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="bi bi-globe"></i>
              Congreso Argentino de Forrajes
            </a>

            <a 
              href="https://www.instagram.com/ensiladores/#" 
              className="action-button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
              Instagram
            </a>

            <a 
              href="https://www.facebook.com/ensiladores"
              className="action-button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
              Facebook
            </a>

            <a 
              href="https://x.com/ensiladores" 
              className="action-button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter-x"></i>
              Twitter
            </a>

            <a 
              href="https://wa.me/5491234567890" 
              className="action-button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="bi bi-whatsapp"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
