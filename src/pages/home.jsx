import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import styles from './home.module.css';
import { handleAnimations } from '../hooks/animations';
import socios from '../assets/images/imagenes-secciones/socios-2.jpg';
import mapa from '../assets/images/imagenes-secciones/imagen-mapa.png';
import forraje from '../assets/images/imagenes-secciones/analisis-de-forraje.jpeg';
import tractoresFondo from '../assets/images/imagenes-de-fondo/edicion2.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Gallery from '../components/gallery';
import Banner from '../assets/images/imagenes-secciones/banner_BLADE_791x80.gif';

const Home = () => {
  useEffect(() => {
    
    handleAnimations();

    const video = document.querySelector(`.${styles.promoVideo}`);
    if (video) {
      video.currentTime = 1;
    }

  }, []); 
  return (
    <>
      <header 
        id="header"
        className={styles.header}
        style={{
          backgroundImage: `url(${tractoresFondo})`
        }}>
        <div id="nav"></div>
        <div className={styles.titulo} id="titulo">
          <h1 className={`${styles.h1} animate-item`} data-animation="animate__fadeIn">
            CÁMARA ARGENTINA DE<br />CONTRATISTAS FORRAJEROS
          </h1>
          <br />
          <p className="animate-item" data-animation="animate__fadeInUp">
            Somos CACF, una Institución sin fines de lucro que agrupa<br />Contratistas
            Forrajeros de Argentina y todo el mundo.
          </p>
        </div>
      </header>

      <div className={styles.curvaHeader}></div>

      <main id="main">
        <section className={`${styles.primerSeccion} animate-item fade-in-left`} data-animation="animate__fadeInUp">
          <p className={`${styles.somos} ${styles.margenes2}`}>
            <span className={styles.negrita}>Fundada el 14 de noviembre de 2003, la Cámara Argentina de Contratistas Forrajeros (CACF) es una asociación civil sin fines de lucro.<br /></span> Somos una red activa con una <span className={styles.negrita}>trayectoria de más de 20 años</span>, que se dedica a investigar y <span className={styles.negrita}>promover la actividad forrajera argentina</span>. Impulsamos prácticas forrajeras eficientes y sostenibles, garantizando la constante capacitación de nuestros socios en las últimas tecnologías.
          </p>

          <div className={styles.infoButton}>
            <button className={styles.masInfo}>
              <p>Más información</p>
            </button>
          </div>
        </section>

        <section>
          <div>
            <Gallery/>
          </div>
        </section>

        <section className={styles.promoContainer}>
          <div className={`${styles.promoItems} ${styles.margenes}`}>
            <div className={styles.promoTexto}>
              <h2 className={styles.congresoTitulo}>Primer Congreso Argentino de Forrajes</h2>
              <p className={`${styles.promoDescripcion} ${styles.promoDescripcion1} animate-item`} data-animation="animate__fadeInDown">
                2025 - Agosto 13, 14 y 15 - Córdoba
              </p>
              
              <div className={styles.promoLinea}></div>
              
              <p className={`${styles.promoDescripcion} animate-item`} data-animation="animate__fadeInDown">
                Este evento marcará un hito: <span className={styles.primerCongreso}>es el primer congreso en el país que reúne a toda la cadena forrajera</span>, desde la producción hasta su utilización. Especialistas nacionales e internacionales, tecnología de punta y networking para el futuro del sector agropecuario argentino.
              </p>
            </div>
            
            <div className={`${styles.promoVideoBackground} ${styles.gradient1}`}>
              <div className={`${styles.promoVideoContainer} animate-item`} data-animation="animate__fadeIn">
                <video className={styles.promoVideo} controls preload="auto">
                  <source src="https://congresoargentinodeforrajes.com.ar/images/congreso/video_promo_web2_low.mp4#t=1" type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
              </div>
            </div>
          </div>
          <div className={styles.promoBotonContainer}>
            <button className={styles.promoBoton}>
              <a href="https://congresoargentinodeforrajes.com.ar/" target="_blank" rel="noopener noreferrer" className={styles.botonCongreso}>
                Más información
              </a>
            </button>
          </div>
        </section>

        <section className= {styles.bannerSection}>
          <img src={Banner} className={styles.bannerBlade} alt='Banner publicitario Blade' />
        </section>

        <section className={styles.agrinirContainer}>
          <div className={`${styles.margenes} ${styles.agrinirItems}`}>
            <div className={styles.agrinir1}>
              <h3 className={`${styles.agrinir} animate-item`} data-animation="animate__fadeInDown">Análisis de Forrajes</h3>

              <div className={styles.lineaHorizontal}></div>

              <p className={`${styles.textoAgrinir} animate-item`} data-animation="animate__fadeInDown">
                El análisis de forrajes implica evaluar la composición química y nutricional de los forrajes, incluyendo proteínas, fibra, carbohidratos y minerales. Este análisis es fundamental en la agricultura y la ganadería, ya que permite a los productores tomar decisiones informadas sobre la alimentación de sus animales.
              </p>

              <ul className={`${styles.textoAgrinir} ${styles.listaAgrinir} animate-item`} data-animation="animate__fadeInDown">
                <li>
                  <i className={`bi bi-card-list ${styles.iconoAgrinir}`}></i>
                  <a className={styles.descargaPdf} href="pdf/AgriNIR_Informe_de_Analisis_TIPO.pdf" target="_blank">
                    Modelo de Informe Técnico
                  </a>
                </li>
                <li>
                  <i className={`bi bi-flower3 ${styles.iconoAgrinir}`}></i>
                  <a className={styles.descargaPdf} href="pdf/CACF_AgriNIR_Protocolo_Extraccion_y_Conservacion_de_Muestras_de_ensilajes.pdf" target="_blank">
                    Protocolo de Extracción de Muestras
                  </a>
                </li>
              </ul>
            </div>

            <div className={`${styles.agrinir2} animate-item`} data-animation="animate__fadeIn">
              <img className={styles.analisisForraje} src={forraje}  alt="Análisis de forrajes" />
            </div>
          </div>
        </section>

        <section className={styles.cuartaSeccion}>
          <div className={`${styles.informacionUtil} ${styles.margenes}`}>
            <div className={styles.infoUtil}>
              <h3 className={styles.tituloInformacionUtil}>Información Útil</h3>
              <div className={styles.lineaHorizontal2}></div>
            </div>
            <div className={styles.frames}>
              <div className={styles.frames1}>
                <img className={styles.imagenSocios} src={socios} alt="Socios CACF" />
                <h2 className={styles.informacionUtilH2}>Beneficios de los Socios CACF</h2>
                <p className={styles.informacionUtilP}>
                  Ser socio de la Cámara Argentina de Contratistas Forrajeros te brinda acceso exclusivo a herramientas, información y ventajas económicas; clave para potenciar tu crecimiento.
                </p>
                <Link className={styles.beneficiosSocios} style={{ textDecoration: 'none' }} to="/convenios">Te invitamos a conocer los beneficios.</Link>
              </div>

              <div className={styles.frames1}>
                <a href="https://ensiladores.com.ar/InfoSocios/Maps/MapaSociosAgrupado.php" target="_blank" rel="noopener noreferrer">
                  <img className={styles.mapa} src={mapa} alt="Mapa de socios" />
                </a>
                <h2 className={styles.informacionUtilH2}>
                  <a href="https://ensiladores.com.ar/InfoSocios/Maps/MapaSociosAgrupado.php" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                    Localizá a nuestros socios
                  </a>
                </h2>
                <p className={`${styles.informacionUtilP} ${styles.verMapa}`}>
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