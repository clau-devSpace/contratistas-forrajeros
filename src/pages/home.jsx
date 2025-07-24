import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import './home.css';
import { handleAnimations } from '../hooks/animations';
import socios from '../assets/images/imagenes-secciones/socios-2.jpg';
import mapa from '../assets/images/imagenes-secciones/imagen-mapa.png';
import forraje from '../assets/images/imagenes-secciones/analisis-de-forraje.jpeg';
import tractoresFondo from '../assets/images/imagenes-de-fondo/edicion2.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Gallery from '../components/gallery';

const Home = () => {
  useEffect(() => {
    
    handleAnimations();

    const video = document.querySelector(".promo-video");
    if (video) {
      video.currentTime = 1;
    }

  }, []); 
  return (
    <>
      <header id="header"
      style={{
        backgroundImage: `url(${tractoresFondo})`
      }}>
        <div id="nav"></div>
        <div className="titulo" id="titulo">
          <h1 className="animate-item" data-animation="animate__fadeIn">
            CÁMARA ARGENTINA DE<br />CONTRATISTAS FORRAJEROS
          </h1>
          <br />
          <p className="animate-item" data-animation="animate__fadeInUp">
            Somos CACF, una Institución sin fines de lucro que agrupa<br />Contratistas
            Forrajeros de Argentina y todo el mundo.
          </p>
        </div>
      </header>

      <div className="curva-header"></div>

      <main id="main">
        <section className="primer-seccion animate-item fade-in-left" data-animation="animate__fadeInUp">
          <p className="somos margenes2">
            <span className="negrita">Fundada el 14 de noviembre de 2003, la Cámara Argentina de Contratistas Forrajeros (CACF) es una asociación civil sin fines de lucro.<br /></span> Somos una red activa con una <span className="negrita">trayectoria de más de 20 años</span>, que se dedica a investigar y <span className="negrita">promover la actividad forrajera argentina</span>. Impulsamos prácticas forrajeras eficientes y sostenibles, garantizando la constante capacitación de nuestros socios en las últimas tecnologías.
          </p>

          <div className="info-button">
            <button className="mas-info">
              <p>Más información</p>
            </button>
          </div>
        </section>

        <section>
          <div>
            <Gallery/>
          </div>
        </section>

        <section className="promo-container">
          <div className= "promo-items margenes">
            <div className="promo-texto">
              <h2 className='congreso-titulo'>Primer Congreso Argentino de Forrajes</h2>
              <p className="promo-descripcion promo-descripcion1 animate-item" data-animation="animate__fadeInDown">
                2025 - AGOSTO 13, 14 Y 15 - CÓRDOBA
              </p>
              
              <div className="promo-linea"></div>
              
              <p className="promo-descripcion animate-item" data-animation="animate__fadeInDown">
                Este evento marcará un hito: <span className='primer-congreso'>es el primer congreso en el país que reúne a toda la cadena forrajera</span>, desde la producción hasta su utilización. Especialistas nacionales e internacionales, tecnología de punta y networking para el futuro del sector agropecuario argentino.
              </p>
            </div>
            
            <div className="promo-video-background gradient-1">
              <div className="promo-video-container animate-item" data-animation="animate__fadeIn">
                <video className="promo-video" controls preload="auto">
                  <source src="https://congresoargentinodeforrajes.com.ar/images/congreso/video_promo_web2_low.mp4#t=1" type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
              </div>
            </div>
          </div>
          <div className="promo-boton-container">
            <button className="promo-boton">
              <a href="https://congresoargentinodeforrajes.com.ar/" target="_blank" rel="noopener noreferrer" className="boton-congreso">
                Más información
              </a>
            </button>
          </div>
        </section>

        <section className="agrinir-container">
          <div className="margenes agrinir-items">
            <div className="agrinir1">
              <h3 className="agrinir animate-item" data-animation="animate__fadeInDown">Análisis de Forrajes</h3>

              <div className="linea-horizontal"></div>

              <p className="texto-agrinir animate-item" data-animation="animate__fadeInDown">
                El análisis de forrajes implica evaluar la composición química y nutricional de los forrajes, incluyendo proteínas, fibra, carbohidratos y minerales. Este análisis es fundamental en la agricultura y la ganadería, ya que permite a los productores tomar decisiones informadas sobre la alimentación de sus animales.
              </p>

              <ul className="texto-agrinir lista-agrinir animate-item" data-animation="animate__fadeInDown">
                <li>
                  <i className="bi bi-card-list icono-agrinir"></i>
                  <a className="descarga-pdf" href="pdf/AgriNIR_Informe_de_Analisis_TIPO.pdf" target="_blank">
                    Modelo de Informe Técnico
                  </a>
                </li>
                <li>
                  <i className="bi bi-flower3 icono-agrinir"></i>
                  <a className="descarga-pdf" href="pdf/CACF_AgriNIR_Protocolo_Extraccion_y_Conservacion_de_Muestras_de_ensilajes.pdf" target="_blank">
                    Protocolo de Extracción de Muestras
                  </a>
                </li>
              </ul>
            </div>

            <div className="agrinir2 animate-item" data-animation="animate__fadeIn">
              <img className="analisis-forraje" src={forraje}  alt="Análisis de forrajes" />
            </div>
          </div>
        </section>

        <section className="cuarta-seccion">
          <div className="informacion-util margenes">
            <div className='info-util'>
              <h3 className="titulo-informacion-util">Información Útil</h3>
              <div className="linea-horizontal-2"></div>
            </div>
            <div className="frames">
              <div className="frames1">
                <img className="imagen-socios" src={socios} alt="Socios CACF" />
                <h2 className="informacion-util-h2">Beneficios de los Socios CACF</h2>
                <p className="informacion-util-p">
                  Ser socio de la Cámara Argentina de Contratistas Forrajeros te brinda acceso exclusivo a herramientas, información y ventajas económicas; clave para potenciar tu crecimiento.
                </p>
                <Link className='beneficios-socios' style={{ textDecoration: 'none' }} to="/convenios">Te invitamos a conocer los beneficios.</Link>
              </div>

              <div className="frames1">
                <a href="https://ensiladores.com.ar/InfoSocios/Maps/MapaSociosAgrupado.php" target="_blank" rel="noopener noreferrer">
                  <img className="mapa" src={mapa} alt="Mapa de socios" />
                </a>
                <h2 className="informacion-util-h2">
                  <a href="https://ensiladores.com.ar/InfoSocios/Maps/MapaSociosAgrupado.php" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                    Localizá a nuestros socios
                  </a>
                </h2>
                <p className="informacion-util-p ver-mapa">
                  <a href="https://ensiladores.com.ar/InfoSocios/Maps/MapaSociosAgrupado.php" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                    Ver mapa en pantalla completa
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;