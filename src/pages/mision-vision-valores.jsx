import React from 'react';
import { CheckCircle, Users, Target, Shield, TrendingUp, Globe, FileText, Phone, Mail, Award, Building, Handshake } from 'lucide-react';
import Campo from '../assets/images/imagenes-de-fondo/campo.jpg';

const CACFInfo = () => {
  return (
    <div className="cacf-container">
      <style jsx>{`
        .cacf-container {
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #333;
          line-height: 1.6;
        }

        .cacf-header {
          display: flex;
          flex-direction: column;
          height: 300px;
          justify-content: center;
          align-items: center;
          text-align: center;
          flex-wrap: wrap;
          gap: 1rem;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          padding: 2rem 1rem;
          position: relative;
        }

        .cacf-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }

        .titulo-cacf {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          gap: 1rem;
          margin-top: 35px;
          position: relative;
          z-index: 2;
        }

        .cacf-title {
          font-family: "Roboto Condensed", sans-serif;
          font-optical-sizing: auto;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 35px;
          color: #ffffff;
          margin: 0 auto;
          text-align: center;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 800px;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .section {
          margin-bottom: 50px;
        }

        .section-header {
          color: white;
          padding: 20px 30px;
          border-radius: 12px;
          margin-bottom: 30px;
          margin-top: 100px;
          text-align: center;
          align-items: center;
          justify-content: center;
          max-width: 800px;
          width: 100vw;
          margin: 0 auto;
          margin-bottom: 30px;
          margin-top: 100px;
        }

        .section-title {
          font-size: 30px;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-transform: uppercase;
        }

        .section-content {
          padding: 0 20px;
        }

        .intro-text {
          font-size: 20px;
          font-weight: 500;
          margin-top: 25px;
          margin-bottom: 25px;
          color: #555;
          text-align: justify;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          transition: all 0.3s ease;
        }

        .benefit-item:hover {
          transform: translateX(5px);
        }

        .benefit-icon {
          color: #4a6fa5;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .benefit-text {
          font-size: 15px;
          color: #444;
        }

        .activities-list {
          margin-top: 20px;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(74, 111, 165, 0.1);
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-bullet {
          color: #4a6fa5;
          font-weight: bold;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .activity-text {
          font-size: 15px;
          color: #444;
        }

        .ethics-grid {
          margin-top: 20px;
        }

        .ethics-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 8px 0;
        }

        .ethics-bullet {
          color: #4a6fa5;
          font-weight: bold;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .ethics-text {
          font-size: 15px;
          color: #444;
          font-weight: 500;
        }

        @media (max-width: 1024px) and (min-width: 768px) {
          .cacf-header {
            height: 280px;
            padding: 1.5rem;
          }
          
          .titulo-cacf {
            gap: 1rem;
          }
          
          .cacf-title {
            font-size: 36px;
          }
        }

        @media (max-width: 768px) {
          .cacf-header {
            height: 250px;
            padding: 1rem;
          }
          
          .titulo-cacf {
            gap: 1rem;
          }
          
          .cacf-title {
            font-size: 32px;
          }
          
          .content-wrapper {
            padding: 20px 15px;
          }

          .section-header {
            padding: 15px 20px;
          }

          .section-title {
            font-size: 20px;
          }

          .section-content {
            padding: 0 10px;
          }

          .benefits-grid, .activities-list, .ethics-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .benefit-item, .ethics-item {
            padding: 12px;
          }
        }

        @media (max-width: 400px) {
          .cacf-title {
            font-size: 28px;
          }
        }
      `}</style>

      {/* Header con background */}
      <div className="cacf-header"  style={{
        backgroundImage: `url(${Campo})`
      }}>
        <div className='titulo-cacf'>
          <h1 className="cacf-title"> ¿Qué es la Cámara Argentina de Contratistas Forrajeros (CACF)?</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="content-wrapper">
        {/* ¿Qué es la CACF? */}
        <section className="section">
          <div className="section-content">
            <p className="intro-text">
              La CACF es una asociación civil sin fines de lucro, constituida como institución formal el día 14 de Noviembre de 2003, cuyos principales propósitos son:
            </p>
            <div className="benefits-grid">
              <div className="benefit-item">
                <Users className="benefit-icon" size={20} />
                <span className="benefit-text">Agrupar a personas físicas y jurídicas que dedican parcial o totalmente su actividad al ensilado de forrajes y confección de forrajes conservados.</span>
              </div>
              <div className="benefit-item">
                <Shield className="benefit-icon" size={20} />
                <span className="benefit-text">Protección de los intereses de los miembros legítimos; siendo sectores de aplicación en propósitos defensas; dentro del marco de las normas de calidad que determine la presente Cámara.</span>
              </div>
              <div className="benefit-item">
                <Award className="benefit-icon" size={20} />
                <span className="benefit-text">Ejercer la defensa y representación de sus asociados en asuntos de tipo judicial, comercial, genial, profesional y laboral, ante las autoridades nacionales, provinciales y municipales, seguros, etc.</span>
              </div>
              <div className="benefit-item">
                <TrendingUp className="benefit-icon" size={20} />
                <span className="benefit-text">Promocionar el beneficio de los ensilados, divulgando los proyectos que de ellos se obtienen.</span>
              </div>
              <div className="benefit-item">
                <Target className="benefit-icon" size={20} />
                <span className="benefit-text">Estimular y cooperar en toda clase de investigaciones, ensayos, desarrollos de programas específicos que contemplen el uso del silo forrajero.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Qué beneficios obtienen sus asociados? */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <CheckCircle size={28} />
              ¿Qué beneficios obtienen sus asociados?
            </h2>
          </div>
          <div className="section-content">
            <div className="benefits-grid">
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Acceso a la bolsa laboral en campaña.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Viajes de capacitación en el país y al exterior.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Publicación de maquinaria en venta o en alquiler.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Permanente asesoramiento en temas generales vinculados a la actividad.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Contacto directo con empresas proveedoras de insumos.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Planillas para calcular los costos reales de un equipo.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Asesoramiento permanente para la confección de presupuestos.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Ampliación de página web de forma gratuita.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Análisis de ensilajes (calidad y micotoxinas) mediante equipos propios y auditorías de trabajos.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Capacitación en comercialización y posicionamiento de mercado.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Acceso al grupo de socios vía WhatsApp.</span>
              </div>
              <div className="benefit-item">
                <span className="activity-bullet">•</span>
                <span className="benefit-text">Convenios de descuentos o beneficios haciendo uso AQUÍ.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Qué hicimos y qué hacemos en la CACF? */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp size={28} />
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