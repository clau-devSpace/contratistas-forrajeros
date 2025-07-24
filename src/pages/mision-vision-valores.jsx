import React, { useEffect } from 'react';
import { handleAnimations } from '../hooks/animations';
import { CheckCircle, Users, Target, Shield, TrendingUp, Award, ArrowDownFromLine, ChevronDown, ChevronRight} from 'lucide-react';
import './mision-vision-valores.css';
import Campo from '../assets/images/imagenes-de-fondo/campo.jpg';
import Prueba1 from '../assets/images/imagenes-de-fondo/prueba-1.jpg';
import Prueba2 from '../assets/images/imagenes-de-fondo/prueba-2.jpg';
import Prueba3 from '../assets/images/imagenes-de-fondo/prueba-3.jpg';
import Pixabay from '../assets/images/imagenes-de-fondo/pixabay.png';
import Beneficios from '../assets/images/imagenes-de-fondo/beneficios-socios-2.jpg';
import Prueba4 from '../assets/images/imagenes-de-fondo/edicion5.jpg';
import Prueba5 from '../assets/images/imagenes-de-fondo/prueba-4.png';
import Prueba6 from '../assets/images/imagenes-de-fondo/prueba-6.jpg';
import Prueba7 from '../assets/images/imagenes-de-fondo/6forraje.jpg';
import Prueba8 from '../assets/images/imagenes-secciones/carrusel4.JPG';
import Prueba9 from '../assets/images/imagenes-de-fondo/expo-agro.jpg';
import Prueba10 from '../assets/images/imagenes-secciones/carrusel.jpg';

const CACFInfo = () => {

   useEffect(() => {
      
      handleAnimations();
  
    }, []); 
  return (
    <div className="cacf-container">

      {/* Header con background */}
      <div className="cacf-header"  style={{
        backgroundImage: `url(${Prueba7})`
      }}>
        <div className='titulo-cacf'>
          <h1 className="cacf-title"> ¿Qué es la Cámara Argentina de Contratistas Forrajeros (CACF)?</h1>
          <p className='conocer-mas'>Conocer más</p>
          <ChevronDown color='white' />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="content-wrapper">
        {/* ¿Qué es la CACF? */}
        <section className="section">
          <div className="section-content">
            <div className='intro-text-container'>
              <p className="intro-text animate-item" data-animation="animate__fadeIn">
                Nuestros Principales Propósitos
            </p>
            </div>
            <div className="benefits-grid animate-item" data-animation="animate__fadeIn">
              <div className="benefit-item benefit-item-enhanced">
                <Users className="benefit-icon" size={35} />
                <span className="benefit-text benefit-text-enhanced">Agrupar a personas físicas y jurídicas que dedican parcial o totalmente su actividad al ensilado de forrajes y confección de forrajes conservados.</span>
              </div>
              <div className="benefit-item benefit-item-enhanced">
                <Shield className="benefit-icon" size={35} />
                <span className="benefit-text benefit-text-enhanced">Protección de los intereses de los miembros legítimos; siendo sectores de aplicación en propósitos defensas; dentro del marco de las normas de calidad que determine la presente Cámara.</span>
              </div>
              <div className="benefit-item benefit-item-enhanced">
                <Award className="benefit-icon" size={35} />
                <span className="benefit-text benefit-text-enhanced">Ejercer la defensa y representación de sus asociados en asuntos de tipo judicial, comercial, genial, profesional y laboral, ante las autoridades nacionales, provinciales y municipales, seguros, etc.</span>
              </div>
              <div className="benefit-item benefit-item-enhanced">
                <TrendingUp className="benefit-icon" size={35} />
                <span className="benefit-text benefit-text-enhanced">Promocionar el beneficio de los ensilados, divulgando los proyectos que de ellos se obtienen.</span>
              </div>
              <div className="benefit-item benefit-item-enhanced">
                <Target className="benefit-icon" size={35} />
                <span className="benefit-text benefit-text-enhanced">Estimular y cooperar en toda clase de investigaciones, ensayos, desarrollos de programas específicos que contemplen el uso del silo forrajero.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Qué beneficios obtienen sus asociados? */}
        <section className="section socios-beneficios" style={{
        backgroundImage: `url(${Prueba8})`
      }}>
          <div className="section-header section-header-1">
            <h2 className="section-title section-title-beneficios">
              <CheckCircle className='benefit-icon-2' size={35} />
              Beneficios que tienen Nuestros Socios
            </h2>
          </div>
          <div className="section-content section-content-1">
            <div className="benefits-grid benefits-grid-2">
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight/></span>
                <span className="benefit-text benefit-text-2">Acceso a la bolsa laboral en campaña.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Viajes de capacitación en el país y al exterior.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Publicación de maquinaria en venta o en alquiler.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Permanente asesoramiento en temas generales vinculados a la actividad.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Contacto directo con empresas proveedoras de insumos.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Planillas para calcular los costos reales de un equipo.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Asesoramiento permanente para la confección de presupuestos.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Ampliación de página web de forma gratuita.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Análisis de ensilajes (calidad y micotoxinas) mediante equipos propios y auditorías de trabajos.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Capacitación en comercialización y posicionamiento de mercado.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text benefit-text-2">Acceso al grupo de socios vía WhatsApp.</span>
              </div>
              <div className="benefit-item no-background">
                <span className="activity-bullet"><ChevronRight /></span>
                <span className="benefit-text  benefit-text-2">Convenios de descuentos o beneficios haciendo uso AQUÍ.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Qué hicimos y qué hacemos en la CACF? */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp className='benefit-icon-2' size={35} />
              ¿Qué hicimos y qué hacemos en la CACF?
            </h2>
          </div>
          <div className="section-content">
            <div className="activities-list">
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Generamos un clima creciente de amistad y confianza entre los socios.</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Creamos el ámbito para tratar temas y resolver problemas.</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Logramos una importante mejora en los precios y obtención de la mayor utilización sílaje, etc.</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Trabajamos con diferentes organismos para tareas de investigación (INTA, CREA, etc).</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Somos nexo entre Universidades, Estaciones Experimentales y Empresas y difundimos sus resultados.</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Logramos respaldo y trabajo solidario entre los miembros de la Cámara.</span>
              </div>
               <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Hacemos negocios en común (convenios por combustibles, seguros, neumáticos, bolsas, etc)</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Realizamos encuentros anuales.</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Nos consolidamos como una institución formal y legal.</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Una página web anual de internet a disposición de todos los miembros de la CACF, material técnico-económico y la posibilidad de contactarse 24hs con la cámara.</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Una bolsa de trabajo (trabajos que no pueden ser tomados por los contratistas son derivados a otros miembros de la CACF), con lo cual los clientes están de algún modo "amparados" ante situaciones adversas.</span>
              </div>
              <div className="activity-item">
                <span className="activity-bullet">•</span>
                <span className="activity-text">Préstamo y alquiler de equipos entre contratistas.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Código de ÉTICA */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <Shield size={28} />
              Código de ÉTICA
            </h2>
          </div>
          <div className="section-content">
            <div className="ethics-grid">
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Fomentar un ambiente de respeto, lealtad y sinceridad entre los miembros.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Resolver diferencias entre miembros dentro de la CACF, con espíritu de acuerdo.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Fomentar la comunicación y el diálogo directo entre los miembros.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Fomentar la generosidad, solidaridad y colaboración entre los miembros, especialmente en campaña.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Prestigiar la actividad a través de un trabajo honesto y calificado.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Participar, respetar y apoyar las decisiones de la CACF tomadas por mayoría aunque personalmente no se estuviera de acuerdo.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Aceptar la crítica constructiva como medio para mejorar nuestras tareas.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Capacitación permanente para brindar mejor servicio.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Promover la confección de reservas y apoyar acciones de la CACF en este sentido.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Promover y utilizar la página Web de la CACF, compartiendo información y nuevas ideas con el grupo.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Mantenerse actualizado en los costos del servicio de ensilado y difundir la información.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Cotizar siempre los trabajos por escrito.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Apoyar a los colegas con dificultad para cotizar precios justos.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Priorizar a otros miembros en la derivación de trabajos cuando no se los puede atender.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Aceptar que trabajos derivados, no otorgan derecho a futuro.</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Fomentar la incorporación de nuevos miembros</span>
              </div>
              <div className="ethics-item">
                <span className="ethics-bullet">•</span>
                <span className="ethics-text">Estar al día con las cuotas de la CACF.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CACFInfo;