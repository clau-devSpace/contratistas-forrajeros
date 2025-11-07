import React, { useState, useEffect } from 'react';
import { apiServiceEconomics } from '../../services/apiServiceEconomics';
import styles from './costosSilaje.module.css';

export default function CostosSilaje() {
  const [datosCompletos, setDatosCompletos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const datos = await apiServiceEconomics.obtenerEcoCS();
      setDatosCompletos(datos);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos de silos');
    } finally {
      setLoading(false);
    }
  };

  const parsePrecio = (precioStr) => {
    if (!precioStr) return 0;
    return parseInt(precioStr.replace(/[$.\s]/g, '').replace(',', ''));
  };

  const formatearPrecio = (precioStr) => {
    if (!precioStr) return 'N/A';
    const precio = parsePrecio(precioStr);
    return `$${precio.toLocaleString('es-AR')}`;
  };

  if (loading) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.tableCard}>
          <div>Cargando datos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.tableCard}>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  if (!datosCompletos) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.tableCard}>
          <div>No hay datos disponibles</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2>Precios de Confección de Silos</h2>
      <div className={styles.tabContent}>
        {Object.entries(datosCompletos).map(([cultivo, datos]) => {
          const tiposSilo = Object.keys(datos.confeccion_de_silo.precio_basico);
          
          return (
            <div key={cultivo} className={styles.tableCard}>
              <div className={styles.tableTitle}>{cultivo}</div>
              <table>
                <thead>
                  <tr>
                    <th>Confección de Silo</th>
                    {tiposSilo.map(tipo => (
                      <th key={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Precio básico</td>
                    {tiposSilo.map(tipo => (
                      <td key={tipo}>
                        {formatearPrecio(datos.confeccion_de_silo.precio_basico[tipo])}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Precio por Ton.</td>
                    {tiposSilo.map(tipo => (
                      <td key={tipo}>
                        {formatearPrecio(datos.confeccion_de_silo.precio_por_ton[tipo])}
                      </td>
                    ))}
                  </tr>
                  <tr className={styles.highlight}>
                    <td>Precio por Ha.</td>
                    {tiposSilo.map(tipo => (
                      <td key={tipo}>
                        {formatearPrecio(datos.confeccion_de_silo.precio_por_ha[tipo])}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td colSpan={tiposSilo.length + 1}>
                      <strong>{datos.costo_cultivo.descripcion}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Semilla</td>
                    <td colSpan={tiposSilo.length}>
                      {formatearPrecio(datos.costo_cultivo.Semilla)}
                    </td>
                  </tr>
                  <tr>
                    <td>Labranza + Fumigadas</td>
                    <td colSpan={tiposSilo.length}>
                      {formatearPrecio(datos.costo_cultivo['Labranza + Fumigadas'])}
                    </td>
                  </tr>
                  <tr>
                    <td>Agroquímicos + Fertilizantes</td>
                    <td colSpan={tiposSilo.length}>
                      {formatearPrecio(datos.costo_cultivo['Agroquimicos + Fertilizantes'])}
                    </td>
                  </tr>
                  <tr>
                    <td>Alquiler de la tierra*</td>
                    <td colSpan={tiposSilo.length}>
                      {formatearPrecio(datos.costo_cultivo['Alquiler de la tierra*'])}
                    </td>
                  </tr>
                  <tr className={styles.total}>
                    <td>Total Costo del Cultivo</td>
                    <td colSpan={tiposSilo.length}>
                      {formatearPrecio(datos.costo_cultivo.total_costo_cultivo)}
                    </td>
                  </tr>
                  <tr>
                    <td>Costo de ensilaje x Tn MV</td>
                    {tiposSilo.map(tipo => (
                      <td key={tipo}>
                        {formatearPrecio(datos.costos_ensilaje.costo_ensilaje_tn_mv[tipo])}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Costo de ensilaje x Tn MS</td>
                    {tiposSilo.map(tipo => (
                      <td key={tipo}>
                        {formatearPrecio(datos.costos_ensilaje.costo_ensilaje_tn_ms[tipo])}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Costo Total del silo x Tn MV</td>
                    {tiposSilo.map(tipo => (
                      <td key={tipo}>
                        {formatearPrecio(datos.costos_ensilaje.costo_total_silo_tn_mv[tipo])}
                      </td>
                    ))}
                  </tr>
                  <tr className={styles.total}>
                    <td>Costo Total del silo x Tn MS</td>
                    {tiposSilo.map(tipo => (
                      <td key={tipo}>
                        {formatearPrecio(datos.costos_ensilaje.costo_total_silo_tn_ms[tipo])}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
}