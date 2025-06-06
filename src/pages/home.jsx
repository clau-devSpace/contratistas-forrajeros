import React, { useEffect } from 'react';
import 'animate.css';
import './Home.css';
import contratista from '../assets/images/imagenes-secciones/contratista-imagen.jpg';
import ganado from '../assets/images/imagenes-secciones/ganado-imagen.jpg';
import maquinas from '../assets/images/imagenes-secciones/maquinas-imagen.jpg';
import socios from '../assets/images/imagenes-secciones/socioss.jpg';
import mapa from '../assets/images/imagenes-secciones/imagen-mapa.png';
import forraje from '../assets/images/imagenes-secciones/analisis-forraje-4.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  useEffect(() => {
    // Función para manejar animaciones (convertida de tu JavaScript original)
    const handleAnimations = () => {
      const animateItems = document.querySelectorAll('.animate-item');

      const options = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animationClass = entry.target.getAttribute('data-animation');
            
            if (entry.target.classList.contains('sequential-animate')) {
              const index = Array.prototype.indexOf.call(animateItems, entry.target);
              setTimeout(() => {
                entry.target.style.opacity = 1; 
                entry.target.classList.add('animate__animated', animationClass); 
              }, index * 300); 
            } else {
              entry.target.style.opacity = 1; 
              entry.target.classList.add('animate__animated', animationClass); 
            }

            observer.unobserve(entry.target); 
          }
        });
      }, options);

      animateItems.forEach(item => {
        observer.observe(item); 
      });
    };

    // Setup del video (tu código original)
    const video = document.querySelector(".promo-video");
    if (video) {
      video.currentTime = 1;
    }

    // Inicializar animaciones
    handleAnimations();

    // Cleanup function (opcional pero buena práctica)
    return () => {
      // Observer cleanup se maneja automáticamente por React
    };
  }, []); // Array vacío = solo se ejecuta una vez al montar

  return (
    <>
      <header id="header">
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

        <div className="version-label"></div>
        <div className="image-gallery-v1 margenes">
          <div className="image-card-v1">
            <img src={contratista} alt="Contratista Forrajero" />
            <div className="image-overlay-v1">
              <div className="image-title-v1">Ganadería Sustentable</div>
              <div className="image-description-v1">Promovemos prácticas ganaderas responsables que garantizan la calidad del forraje y el bienestar animal</div>
            </div>
          </div>
          <div className="image-card-v1">
            <img src={ganado} alt="Vacas comiendo" />
            <div className="image-overlay-v1">
              <div className="image-title-v1">Forrajes de Calidad</div>
              <div className="image-description-v1">Tecnología avanzada para la producción de forrajes nutritivos y de alta calidad para el ganado</div>
            </div>
          </div>
          <div className="image-card-v1">
            <img src={maquinas} alt="Maquinaria agrícola" />
            <div className="image-overlay-v1">
              <div className="image-title-v1">Tecnología Moderna</div>
              <div className="image-description-v1">Maquinaria especializada para la cosecha y procesamiento eficiente de forrajes</div>
            </div>
          </div>
        </div>

        <section className="promo-container">
          <div className="margenes promo-items">
            <div className="promo-texto">
              <h3 className="promo-titulo animate-item" data-animation="animate__fadeInDown">
                Congreso Argentino de Forrajes
              </h3>
              <p className="promo-descripcion promo-descripcion1 animate-item" data-animation="animate__fadeInDown">
                13 al 15 de Agosto - Córdoba
              </p>
              
              <div className="promo-linea"></div>
              
              <p className="promo-descripcion animate-item" data-animation="animate__fadeInDown">
                Este evento marcará un hito: es el primer congreso en el país que reúne a toda la cadena forrajera, desde la producción hasta su utilización, integrando los distintos eslabones que conforman este sector clave para la producción de carne, leche y energía (biogás). Especialistas nacionales e internacionales, tecnología de punta y networking para el futuro del sector agropecuario argentino.
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

        <section>
          <div className="empresas-cacf margenes">
            <h2 className="h2-empresas">Nos acompañan</h2>
            <div className="linea-horizontal2"></div>
            <div className="swiper mySwiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide img-johndeere">
                  <img src="imagenes/logos/johndeere.png" alt="John Deere" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/claas.jpg" alt="Claas" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/akron.png" alt="Akron" />
                </div>
                <div className="swiper-slide">
                  <img className="img-newholland" src="imagenes/logos/new-holland - copia.png" alt="New Holland" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/richiger.png" alt="Richiger" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/canavesio.jpg" alt="Canavesio" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/kuhn.jpg" alt="Kuhn" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/greenpack.png" alt="Greenpack" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/blade.png" alt="Blade" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/shakerbox.png" alt="Shakerbox" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/novonesis.png" alt="Novonesis" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/cooperacion.png" alt="Cooperacion" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/mouras.png" alt="Mouras" />
                </div>
                <div className="swiper-slide">
                  <img src="imagenes/logos/toolking.png" alt="Toolking" />
                </div>
              </div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        </section>

        <section className="agrinir-container">
          <div className="margenes agrinir-items">
            <div className="agrinir1">
              <h3 className="agrinir animate-item" data-animation="animate__fadeInDown">Análisis de Forrajes</h3>

              <div className="linea-horizontal"></div>

              <p className="texto-agrinir animate-item" data-animation="animate__fadeInDown">
                El análisis de forrajes implica evaluar la composición química y nutricional de los forrajes, incluyendo proteínas, fibra, carbohidratos y minerales.Este análisis es fundamental en la agricultura y la ganadería, ya que permite a los productores tomar decisiones informadas sobre la alimentación de sus animales.
              </p>

              <ul className="texto-agrinir lista-agrinir animate-item" data-animation="animate__fadeInDown">
                <li>
                  <i className="bi bi-card-list icono-agrinir"></i>
                  <a className="descarga-pdf" href="pdfs/AgriNIR_Informe_de_Analisis_TIPO.pdf" target="_blank" rel="noopener noreferrer">
                    Modelo de Informe Técnico
                  </a>
                </li>
                <li>
                  <i className="bi bi-flower3 icono-agrinir"></i>
                  <a className="descarga-pdf" href="pdfs/CACF_AgriNIR_Protocolo_Extraccion_y_Conservacion_de_Muestras_de_ensilajes.pdf" target="_blank" rel="noopener noreferrer">
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
            <div>
              <h3 className="titulo-informacion-util">Información Útil</h3>
              <div className="linea-horizontal2"></div>
            </div>
            <div className="frames">
              <div className="frames1">
                <img className="imagen-socios" src={socios} alt="Socios CACF" />
                <div className="linea-horizontal3"></div>
                <h2 className="informacion-util-h2">Beneficios de los Socios CACF</h2>
                <p className="informacion-util-p">
                  Ser socio de la Cámara Argentina de Contratistas Forrajeros te brinda acceso exclusivo a herramientas, información y ventajas económicas; clave para potenciar tu crecimiento. Te invitamos a conocer los beneficios.
                </p>
              </div>

              <div className="frames1">
                <img className="mapa" src={mapa} alt="Mapa de socios" />
                <div className="linea-horizontal3"></div>
                <h2 className="informacion-util-h2">Localizá a nuestros socios</h2>
                <p className="informacion-util-p">Ver mapa en pantalla completa</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="container-footer">
          <div logo-texto="">
            <a href="index.html">
              <img src="imagenes/logos/Group 5.svg" className="logo-footer" alt="Logo CACF" />
            </a>
            <p>Cámara Argentina de Contratistas Forrajeros</p>
          </div>
          <div className="redes-sociales">
            <h4>Seguinos en nuestras Redes Sociales</h4>
            <div>
              <a href="https://www.instagram.com/ensiladores/?hl=es" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram icono-redes"></i>
              </a>
              <a href="https://www.facebook.com/ensiladores?locale=es_LA" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook icono-redes"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter-x icono-redes"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;