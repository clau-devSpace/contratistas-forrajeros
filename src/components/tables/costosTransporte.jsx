import React, { useState, useEffect } from 'react';
import { apiServiceEconomics } from '../../services/apiServiceEconomics';
import styles from './costoTransporte.module.css';

export default function CostosTransporte() {
  const [datosTransporte, setDatosTransporte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const datos = await apiServiceEconomics.obtenerDatos('CostosMV');
      setDatosTransporte(datos);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos de transporte');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.card}>
        <div>Cargando datos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <div>{error}</div>
      </div>
    );
  }

  if (!datosTransporte || !datosTransporte.costo_adicional_flete) {
    return (
      <div className={styles.card}>
        <div>No hay datos disponibles</div>
      </div>
    );
  }

  const { costo_adicional_flete } = datosTransporte;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        Costo adicional de flete
        <span className={styles.subtitle}>
          {' '}sobre los 1000mts de flete incluido en el precio
        </span>
      </h3>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>km</th>
              {costo_adicional_flete.toneladas_materia_verde.map(tonelada => (
                <th key={tonelada}>{tonelada} Tn</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {costo_adicional_flete.costos_adicionales.map((fila, idx) => (
              <tr key={fila.km}>
                <td data-label="Distancia (km)">{fila.km}</td>
                {fila.costos.map((costo, costoIdx) => (
                  <td key={costoIdx} data-label={`${costo_adicional_flete.toneladas_materia_verde[costoIdx]} Tn`}>
                    {costo}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <span className={styles.highlight}>
          Precio del Gasoil: <strong>{costo_adicional_flete.precio_gasoil}</strong>
        </span>
      </div>
    </div>
  );
}