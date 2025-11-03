// preciosDeReferencia.jsx
import React, { useState, useEffect } from "react";
import { apiServiceEconomics } from "../../services/apiServiceEconomics";
import styles from "./preciosDeReferencia.module.css";
import Logo from "../../assets/images/logos/Group 5.svg";

export default function TablaPreciosServicio() {
  const [servicios, setServicios] = useState([]);
  const [fecha, setFecha] = useState();
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiServiceEconomics.obtenerDatos('PreciosDeReferencia')
      .then(data => {
        setServicios(data.servicios || []);
        setMetadata(data.metadata || {});
        setFecha(data.fecha || {}); 
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando...</div>;

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: metadata.moneda || 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(precio);
  };

  return (
    <section className={styles.container}>
      {/* Header con logo CACF */}
      <div className={styles.headerLogo}>
        <div className={styles.logoPlaceholder}>
         <img src={Logo} alt="Logo CACF" />
         <span className={styles.logoSubtitle}>Cámara Argentina de Contratistas Forrajeros</span>
        </div>
      </div>

      {/* Título principal */}
      <div className={styles.tituloPrincipal}>
        <h1>PRECIOS DE REFERENCIA DEL SERVICIO DE ENSILADO</h1>
        <h3>{fecha}</h3>
      </div>

      {/* Servicios */}
      <div className={styles.serviciosContainer}>
        {servicios.map((servicio) => (
          <div key={servicio.id} className={styles.servicioCard}>
            <div className={styles.servicioHeader}>
              {servicio.titulo}
            </div>
            <div className={styles.servicioBody}>
              <div className={styles.precioRow}>
                <span className={styles.precioLabel}>Precio base / Ha.</span>
                <span className={styles.precioValor}>
                  {formatearPrecio(servicio.precios.precio_base_ha)}
                </span>
              </div>
              
              {servicio.precios.precio_tn_mv && (
                <div className={styles.precioRow}>
                  <span className={styles.precioLabel}>+ Precio / Tn MV</span>
                  <span className={styles.precioValor}>
                    {formatearPrecio(servicio.precios.precio_tn_mv)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Notas al pie */}
      <div className={styles.notasContainer}>
        <ol className={styles.notasList}>
          <li>Precios de <strong>contado</strong> en pesos argentinos. <strong>No</strong> incluyen el IVA del 21%.</li>
          <li><strong>No incluye el costo financiero. El mismo será pactado con el cliente.</strong></li>
          <li>El costo del uso del cracker tendrá un incremento del 20% sobre el Precio / Tn MV</li>
          <li>Bolsa e inoculante a cargo del cliente.</li>
          <li>Tn MV: Toneladas de Materia Verde, medidas a la finalización de la confección del silo.</li>
          <li>Incluye 1000 mts. de distancia del lote al silo<br/>
            <span className={styles.subNota}>(distancias superiores a los 1000mts se cobrarán a razón de 1lt Gasoil/Tonelada/Kilómetro)</span>
          </li>
        </ol>
      </div>
    </section>
  );
}