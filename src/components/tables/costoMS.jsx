import React, { useState, useEffect } from 'react';
import { apiServiceEconomics } from '../../services/apiServiceEconomics';
import styles from "./costoMS.module.css";

export default function CostoMS() {
  const [datosEnsilado, setDatosEnsilado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const datos = await apiServiceEconomics.obtenerDatos('datosEnsilado');
      setDatosEnsilado(datos);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos de ensilado');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className={styles.economicas}>
        <div>Cargando datos...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.economicas}>
        <div>{error}</div>
      </section>
    );
  }

  if (!datosEnsilado) {
    return (
      <section className={styles.economicas}>
        <div>No hay datos disponibles</div>
      </section>
    );
  }

  const silosAereos = datosEnsilado["Silos aéreos (maíz, sorgo)"];
  const silosEmbolsados = datosEnsilado["Silos embolsados (maíz, sorgo)"];
  const rendimiento45 = datosEnsilado["Para un rendimiento de 45Tn (Maíz)"];
  const variacionCostos = datosEnsilado["variacion_costos_silo_aereo"].datos;

  return (
    <section className={styles.economicas}>
      <h2 className={styles.title}>
        Costos del servicio de ensiladores en $/kg/MS
      </h2>
      <p className={styles.subtitle}>
        Silos: Variación de los costos del servicio de ensilado de la MS respecto al rinde
      </p>

      <div className={styles.grid}>
        {/* Silos aéreos */}
        <div className={styles.tableCard}>
          <div className={styles.tableTitle}>Silos aéreos (maíz, sorgo)</div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Referencia</th>
                {silosAereos.referencia.map((ref, idx) => (
                  <th key={idx}>{ref}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Costo Ton/MV</td>
                {silosAereos.costo_ton_mv.map((costo, idx) => (
                  <td key={idx}>{costo}</td>
                ))}
              </tr>
              <tr>
                <td>Costo Ton MS</td>
                {silosAereos.costo_ton_ms.map((costo, idx) => (
                  <td key={idx}>{costo}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Silos embolsados */}
        <div className={styles.tableCard}>
          <div className={styles.tableTitle}>Silos embolsados (maíz, sorgo)</div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Referencia</th>
                {silosEmbolsados.referencia.map((ref, idx) => (
                  <th key={idx}>{ref}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Costo Ton/MV</td>
                {silosEmbolsados.costo_ton_mv.map((costo, idx) => (
                  <td key={idx}>{costo}</td>
                ))}
              </tr>
              <tr>
                <td>Costo Ton MS</td>
                {silosEmbolsados.costo_ton_ms.map((costo, idx) => (
                  <td key={idx}>{costo}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rendimiento */}
      <div className={styles.tableCard}>
        <div className={styles.tableTitle}>Para un rendimiento de 45Tn (Maíz)</div>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Costo de confección del silaje aéreo:</td>
              <td>{rendimiento45.costo_confeccion_silaje_aereo.valor}</td>
              <td>{rendimiento45.costo_confeccion_silaje_aereo.unidad}</td>
            </tr>
            <tr>
              <td>Costo de confección del silaje embolsado:</td>
              <td>{rendimiento45.costo_confeccion_silaje_embolsado.valor}</td>
              <td>{rendimiento45.costo_confeccion_silaje_embolsado.unidad}</td>
            </tr>
            <tr className={styles.total}>
              <td>Costo total del silaje aéreo:</td>
              <td>{rendimiento45.costo_total_silaje_aereo.valor}</td>
              <td>{rendimiento45.costo_total_silaje_aereo.unidad}</td>
            </tr>
            <tr className={styles.total}>
              <td>Costo total del silaje embolsado:</td>
              <td>{rendimiento45.costo_total_silaje_embolsado.valor}</td>
              <td>{rendimiento45.costo_total_silaje_embolsado.unidad}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Variación de costos */}
      <div className={styles.tableCard}>
        <div className={styles.tableTitleOrange}>
          Silo aéreo: Variación de los costos de la MS respecto al rinde
        </div>
        <table className={`${styles.table} ${styles.orangeTable}`}>
          <thead>
            <tr>
              <th>Rinde al picado (ton MV/ha)</th>
              <th>Rinde al picado (ton MS/ha)</th>
              <th>Costo de ensilar ($/ha)</th>
              <th>Costo de ensilar ($/ton MV)</th>
              <th>Costo de ensilar ($/ton MS)</th>
              <th>Costo total ($/kg MS)*</th>
            </tr>
          </thead>
          <tbody>
            {variacionCostos.map((dato, idx) => (
              <tr key={idx}>
                <td data-label="Rinde MV/ha">{dato.rinde_picado_ton_mv_ha}</td>
                <td data-label="Rinde MS/ha">{dato.rinde_picado_ton_ms_ha.toString().replace('.', ',')}</td>
                <td data-label="Costo $/ha">{dato.costo_ensilar_ha}</td>
                <td data-label="Costo $/ton MV">{dato.costo_ensilar_ton_mv}</td>
                <td data-label="Costo $/ton MS">{dato.costo_ensilar_ton_ms}</td>
                <td data-label="Costo total $/kg MS">{dato.costo_total_kg_ms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notas */}
      <div className={styles.notes}>
        <p>*$/kg MS (Cultivo+Costo de la tierra+Ensilada)</p>
        <p>
          Precios y costos de referencia tomados de la CACF y de la revista
          Márgenes Agropecuarios
        </p>
        <p>
          Precios en pesos más IVA, bolsa e inoculante a cargo del cliente.
        </p>
        <p>
          Incluye 1000 mts. de distancia del potrero al silo (distancias
          superiores a los 1000mts se cobrarán a razón de 1lt Gasoil/Tonelada/Kilómetro)
        </p>
        <p>
          Maíz: precio promedio de alquiler de la tierra 16qq de soja (ocupación
          del lote: 6 meses)
        </p>
        <p>(MS)=Materia Seca; (MV)=Materia Verde</p>
      </div>
    </section>
  );
}