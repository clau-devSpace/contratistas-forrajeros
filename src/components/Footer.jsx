import React from 'react';
import Logo from '../assets/images/logos/Group 5.svg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container-footer">
        <div logo-texto="">
          <a href="/">
            <img src={Logo} className="logo-footer" alt="Logo CACF" />
          </a>
          <p>Cámara Argentina de Contratistas Forrajeros</p>
        </div>
        <div className="redes-sociales">
          <h4>Seguinos en nuestras Redes Sociales</h4>
          <div>
            <a className="enlace-redes" href="https://www.instagram.com/ensiladores/?hl=es" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram icono-redes"></i>
            </a>
            <a className="enlace-redes" href="https://www.facebook.com/ensiladores?locale=es_LA" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook icono-redes"></i>
            </a>
            <a className="enlace-redes" href="#" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter-x icono-redes"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
