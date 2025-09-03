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

  const formatearPrecio = (precio) => {
    return `$ ${precio.toLocaleString('es-AR')}`;
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

  if (!datosTransporte || !datosTransporte.servicio_transporte) {
    return (
      <div className={styles.card}>
        <div>No hay datos disponibles</div>
      </div>
    );
  }

  const { servicio_transporte } = datosTransporte;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        {servicio_transporte.titulo.split(' sobre los')[0]}
        <span className={styles.subtitle}>
          {' '}sobre los {servicio_transporte.flete_incluido_metros}mts de flete incluido en el precio
        </span>
      </h3>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>km</th>
              {servicio_transporte.rendimientos_disponibles.map(rendimiento => (
                <th key={rendimiento}>{rendimiento} Tn</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {servicio_transporte.distancias_km.map(distancia => (
              <tr key={distancia}>
                <td data-label="Distancia (km)">{distancia}</td>
                {servicio_transporte.rendimientos_disponibles.map(rendimiento => (
                  <td key={rendimiento} data-label={`${rendimiento} Tn`}>
                    {formatearPrecio(servicio_transporte.costos_por_distancia[distancia][rendimiento])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <span className={styles.highlight}>
          Precio del Gasoil: <strong>{formatearPrecio(servicio_transporte.precio_gasoil.valor)}</strong>
        </span>
      </div>
    </div>
  );
}