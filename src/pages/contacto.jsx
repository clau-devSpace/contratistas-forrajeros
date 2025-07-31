import React from 'react';
import './contacto.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
              <a 
              href="https://wa.me/543532431111" 
              target="_blank" 
              rel="noopener noreferrer"
            > <i className="bi bi-whatsapp icono-contacto"></i></a>
            </div>
            <div className="social-icon">
              <a
              href="mailto:info@ensiladores.com.ar"
              aria-labell="Email"
              target='_blank'
              >
              <i className="bi bi-envelope-fill icono-contacto"></i>
              </a>
            </div>
            <div className="social-icon">
              <a
              href='https://maps.app.goo.gl/3CdCyQrptb8Wq59j8'
              target='_blank'
              >
              <i className="bi bi-geo-alt icono-contacto"></i>
              </a>
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
              href="https://wa.me/543532431111" 
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
