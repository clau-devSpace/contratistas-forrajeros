import React, { useEffect } from 'react';
import { handleAnimations } from '../hooks/animations';
import { Users, Target, Shield, TrendingUp, Scale } from 'lucide-react';
import styles from './mision-vision-valores.module.css';
import Prueba10 from '../assets/images/imagenes-de-fondo/favorita-11.jpg';
import Prueba11 from '../assets/images/imagenes-secciones/socios-newholland.jpg';
import { Link } from 'react-router-dom';

const CACFInfo = () => {

   useEffect(() => {
      
      handleAnimations();
  
    }, []); 
  return (
    <div className={styles.cacfContainer}>

      {/* Header con background */}
      <div className={styles.cacfHeader} style={{
        backgroundImage: `url(${Prueba10})`
      }}>
        <div className={styles.tituloCacf}>
          <h1 className={styles.cacfTitle}> ¿Qué es la Cámara Argentina de Contratistas Forrajeros (CACF)?</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className={styles.contentWrapper}>
        {/* ¿Qué es la CACF? */}
       <section className={styles.section}>
  <div className={styles.sectionContent}>
    <div className={styles.introTextContainer}>
      <h2 className={`${styles.introText} animate-item`} data-animation="animate__fadeIn">
        Nuestros Principales Propósitos
      </h2>
    </div>
    <div className={`${styles.cardsGrid} animate-item`} data-animation="animate__fadeIn">
      <div className={styles.propositionCard}>
        <div className={styles.cardIcon}>
          <Users size={24} color="#0c51a6" />
        </div>
        <p className={styles.cardText}>
          Agrupar a personas físicas y jurídicas que dedican parcial o totalmente su 
          actividad al ensilado de forrajes y confección de forrajes conservados.
        </p>
      </div>
      
      <div className={styles.propositionCard}>
        <div className={styles.cardIcon}>
          <Shield size={24} color="#0c51a6" />
        </div>
        <p className={styles.cardText}>
        Propender a que los ensilados de forrajes lleguen a todos los sectores de la producción agropecuaria de la república Argentina, dentro del marco de las normas de calidad que determine la presente Cámara.
        </p>
      </div>
      
      <div className={styles.propositionCard}>
        <div className={styles.cardIcon}>
          <Scale size={24} color="#0c51a6" />
        </div>
        <p className={styles.cardText}>
          Ejercer la defensa y representación de sus asociados en asuntos de tipo 
          judicial, comercial, genial, profesional y laboral, ante las autoridades 
          nacionales, provinciales y municipales, seguros, etc.
        </p>
      </div>
      
      <div className={styles.propositionCard}>
        <div className={styles.cardIcon}>
          <TrendingUp size={24} color="#0c51a6" />
        </div>
        <p className={styles.cardText}>
          Promocionar el beneficio de los ensilados, divulgando los proyectos que de 
          ellos se obtienen.
        </p>
      </div>
      
      <div className={styles.propositionCard}>
        <div className={styles.cardIcon}>
          <Target size={24} color="#0c51a6" />
        </div>
        <p className={styles.cardText}>
          Estimular y cooperar en toda clase de investigaciones, ensayos, desarrollos 
          de programas específicos que contemplen el uso del silo forrajero.
        </p>
      </div>
    </div>
  </div>   
</section>
        {/* ¿Qué beneficios obtienen sus asociados? */}

        <section className={`${styles.section} ${styles.sociosBeneficios}`}>
          <div className={styles.sectionContent}>
            <div className={styles.sectionHeader}>
            {/*<p className={styles.slogan}>Beneficios CACF</p> */} 
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleBeneficios}`}>
              Beneficios de  
              Nuestros Socios
            </h2>
            <img src={Prueba11} className={styles.imageSocios} alt='Socios con la bandera de New Holland, en el Campo' />
          </div>
            <div className={`${styles.benefitsGrid} ${styles.benefitsGrid2}`}>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Acceso a la bolsa laboral en campaña.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Viajes de capacitación en el país y al exterior.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Publicación de maquinaria en venta o en alquiler.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Permanente asesoramiento en temas generales vinculados a la actividad.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Contacto directo con empresas proveedoras de insumos.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Planillas para calcular los costos reales de un equipo.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Alquiler de equipos entre contratistas con precios prefijados.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Alojamiento de página web de forma gratuita.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Análisis de ensilajes (calidad y micotoxinas) mediante equipos propios y auditorías de trabajos; arancelados, pero muy por debajo de los precios del mercado.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i class="bi bi-caret-right-fill"></i></span>
                <span className={`${styles.benefitText} ${styles.benefitText2}`}>Acceso al grupo de socios vía WhatsApp.</span>
              </div>
              <div className={`${styles.benefitItem} ${styles.noBackground}`}>
                <span className={styles.activityBullet}><i className="bi bi-caret-right-fill"></i></span>
                <Link 
                  className={`${styles.benefitText} ${styles.benefitText2}`} 
                  to="/convenios"
                > 
                  Convenios de descuentos o beneficios haciendo click AQUÍ
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Qué hicimos y qué hacemos en la CACF? 
        <section className={`${styles.section} ${styles.sectionBackground}`}>
          <div className={styles.sectionContent}>
             <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleActivities}`}>
              ¿Qué hicimos y qué hacemos en la CACF?
            </h2>
          </div>
            <div className={styles.activitiesList}>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}> <Users size={35}/></span>
                <span className={styles.activityText}>Generamos un clima creciente de amistad y confianza entre los socios.</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><ListCollapse size={35} /></span>
                <span className={styles.activityText}>Creamos el ámbito para tratar temas y resolver problemas.</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><CircleDollarSign size={35} /></span>
                <span className={styles.activityText}>Logramos una importante mejora en los precios y obtención de la mayor utilización sílaje, etc.</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><FolderSearch size={35} /></span>
                <span className={styles.activityText}>Trabajamos con diferentes organismos para tareas de investigación (INTA, CREA, etc).</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><Building2 size={35} /></span>
                <span className={styles.activityText}>Somos nexo entre Universidades, Estaciones Experimentales y Empresas y difundimos sus resultados.</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><RefreshCcwDot size={35}/>
</span>
                <span className={styles.activityText}>Logramos respaldo y trabajo solidario entre los miembros de la Cámara.</span>
              </div>
               <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><Handshake size={35} /></span>
                <span className={styles.activityText}>Hacemos negocios en común (convenios por combustibles, seguros, neumáticos, bolsas, etc)</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><Shrink size={35} /></span>
                <span className={styles.activityText}>Realizamos encuentros anuales.</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><Scale size={35} /></span>
                <span className={styles.activityText}>Nos consolidamos como una institución formal y legal.</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><Globe size={35} /> 
</span>
                <span className={styles.activityText}>Una página web anual de internet a disposición de todos los miembros de la CACF, material técnico-económico y la posibilidad de contactarse 24hs con la cámara.</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><BriefcaseBusiness size={35} />
</span>
                <span className={styles.activityText}>Una bolsa de trabajo (trabajos que no pueden ser tomados por los contratistas son derivados a otros miembros de la CACF), con lo cual los clientes están de algún modo "amparados" ante situaciones adversas.</span>
              </div>
              <div className={`${styles.activityItem} ${styles.benefitItemEnhanced}`}>
                <span className={styles.activityBullet}><Tractor size={35} />
</span>
                <span className={styles.activityText}>Préstamo y alquiler de equipos entre contratistas.</span>
              </div>
            </div>
          </div>
        </section> 

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <Shield size={45} />
              Código de ÉTICA
            </h2>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.ethicsGrid}>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Fomentar un ambiente de respeto, lealtad y sinceridad entre los miembros.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Resolver diferencias entre miembros dentro de la CACF, con espíritu de acuerdo.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Fomentar la comunicación y el diálogo directo entre los miembros.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Fomentar la generosidad, solidaridad y colaboración entre los miembros, especialmente en campaña.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Prestigiar la actividad a través de un trabajo honesto y calificado.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Participar, respetar y apoyar las decisiones de la CACF tomadas por mayoría aunque personalmente no se estuviera de acuerdo.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Aceptar la crítica constructiva como medio para mejorar nuestras tareas.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Capacitación permanente para brindar mejor servicio.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Promover la confección de reservas y apoyar acciones de la CACF en este sentido.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Promover y utilizar la página Web de la CACF, compartiendo información y nuevas ideas con el grupo.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Mantenerse actualizado en los costos del servicio de ensilado y difundir la información.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Cotizar siempre los trabajos por escrito.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Apoyar a los colegas con dificultad para cotizar precios justos.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Priorizar a otros miembros en la derivación de trabajos cuando no se los puede atender.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Aceptar que trabajos derivados, no otorgan derecho a futuro.</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Fomentar la incorporación de nuevos miembros</span>
              </div>
              <div className={styles.ethicsItem}>
                <span className={styles.ethicsBullet}>•</span>
                <span className={styles.ethicsText}>Estar al día con las cuotas de la CACF.</span>
              </div>
            </div>
          </div>
        </section> */} 
      </div>
    </div>
  );
};

export default CACFInfo;