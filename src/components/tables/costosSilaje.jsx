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
      const datos = await apiServiceEconomics.obtenerDatos('CostosSilos');
      setDatosCompletos(datos);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos de silos');
    } finally {
      setLoading(false);
    }
  };

  const formatearPrecio = (precio) => {
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

  if (!datosCompletos || !datosCompletos.confeccion_silos) {
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
      {datosCompletos.confeccion_silos.map((cultivo) => {
        const tiposSiloDisponibles = Object.keys(cultivo.tipos_silo);
        
        return (
          <div key={cultivo.id} className={styles.tableCard}>
            <div className={styles.tableTitle}>{cultivo.cultivo}</div>
            <table>
              <thead>
                <tr>
                  <th>Confección de Silo</th>
                  {tiposSiloDisponibles.map(tipo => (
                    <th key={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Precio básico</td>
                  {tiposSiloDisponibles.map(tipo => (
                    <td key={tipo}>
                      {formatearPrecio(cultivo.tipos_silo[tipo].precio_basico)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Precio por Ton.</td>
                  {tiposSiloDisponibles.map(tipo => (
                    <td key={tipo}>
                      {formatearPrecio(cultivo.tipos_silo[tipo].precio_por_ton)}
                    </td>
                  ))}
                </tr>
                <tr className={styles.highlight}>
                  <td>Precio por Ha.</td>
                  {tiposSiloDisponibles.map(tipo => (
                    <td key={tipo}>
                      {formatearPrecio(cultivo.precio_por_ha[tipo])}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td colSpan={tiposSiloDisponibles.length + 1}>
                    <strong>
                      Costo $/ha de {cultivo.cultivo} 35%MS (Rinde estimado {cultivo.costo_ha.rinde_estimado})
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Semilla</td>
                  <td colSpan={tiposSiloDisponibles.length}>
                    {formatearPrecio(cultivo.costos_cultivo.semilla)}
                  </td>
                </tr>
                <tr>
                  <td>Labranza + Fumigadas</td>
                  <td colSpan={tiposSiloDisponibles.length}>
                    {formatearPrecio(cultivo.costos_cultivo.labranza_fumigadas)}
                  </td>
                </tr>
                <tr>
                  <td>Agroquímicos + Fertilizantes</td>
                  <td colSpan={tiposSiloDisponibles.length}>
                    {formatearPrecio(cultivo.costos_cultivo.agroquimicos_fertilizantes)}
                  </td>
                </tr>
                <tr>
                  <td>Alquiler de la tierra*</td>
                  <td colSpan={tiposSiloDisponibles.length}>
                    {formatearPrecio(cultivo.costos_cultivo.alquiler_tierra)}
                  </td>
                </tr>
                <tr className={styles.total}>
                  <td>Total Costo del Cultivo</td>
                  <td colSpan={tiposSiloDisponibles.length}>
                    {formatearPrecio(cultivo.costos_cultivo.total)}
                  </td>
                </tr>
                <tr>
                  <td>Costo de ensilaje x Tn MV</td>
                  {tiposSiloDisponibles.map(tipo => (
                    <td key={tipo}>
                      {formatearPrecio(cultivo.costos_ensilaje.tn_mv[tipo])}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Costo de ensilaje x Tn MS</td>
                  {tiposSiloDisponibles.map(tipo => (
                    <td key={tipo}>
                      {formatearPrecio(cultivo.costos_ensilaje.tn_ms[tipo])}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Costo Total del silo x Tn MV</td>
                  {tiposSiloDisponibles.map(tipo => (
                    <td key={tipo}>
                      {formatearPrecio(cultivo.costos_ensilaje.total_silo_tn_mv[tipo])}
                    </td>
                  ))}
                </tr>
                <tr className={styles.total}>
                  <td>Costo Total del silo x Tn MS</td>
                  {tiposSiloDisponibles.map(tipo => (
                    <td key={tipo}>
                      {formatearPrecio(cultivo.costos_ensilaje.total_silo_tn_ms[tipo])}
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