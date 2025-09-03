// preciosDeReferencia.jsx (tu componente modificado)
import React, { useState, useEffect } from "react";
import { apiServiceEconomics } from "../../services/apiServiceEconomics";
import styles from "./preciosDeReferencia.module.css";

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
    <section className={styles.tablaEnsilado}>
      <h2>Precios de Referencia del Servicio de Ensilado</h2>
      <p>{fecha}</p>
      <p>Fuente: Cámara Argentina de Contratistas Forrajeros</p>

      {servicios.map((servicio) => (
        <div key={servicio.id} className={styles.card}>
          <div className={styles.cardHeader}>
            {servicio.titulo}
          </div>
          <div className={styles.cardBody}>
            <div className={styles.fila}>
              <span>Precio base / Ha.</span>
              <span className={styles.valor}>
                {formatearPrecio(servicio.precios.precio_base_ha)}
              </span>
            </div>
            
            {servicio.precios.precio_tn_mv && (
              <div className={styles.fila}>
                <span>Precio / Tn MV</span>
                <span className={styles.valor}>
                  {formatearPrecio(servicio.precios.precio_tn_mv)}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}