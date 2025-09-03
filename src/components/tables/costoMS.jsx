import React from "react";
import styles from "./costoMS.module.css";

export default function CostoMS() {
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
                <th>25 Tn/ha</th>
                <th>35 Tn/ha</th>
                <th>45 Tn/ha</th>
                <th>55 Tn/ha</th>
                <th>65 Tn/ha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Costo Ton/MV</td>
                <td>$31.400,0</td>
                <td>$26.542,9</td>
                <td>$23.844,4</td>
                <td>$22.127,3</td>
                <td>$20.938,5</td>
              </tr>
              <tr>
                <td>Costo Ton MS</td>
                <td>$89.714,3</td>
                <td>$75.836,7</td>
                <td>$68.127,0</td>
                <td>$63.220,8</td>
                <td>$59.824,2</td>
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
                <th>25 Tn/ha</th>
                <th>35 Tn/ha</th>
                <th>45 Tn/ha</th>
                <th>55 Tn/ha</th>
                <th>65 Tn/ha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Costo Ton/MV</td>
                <td>$34.200,0</td>
                <td>$29.342,9</td>
                <td>$26.644,4</td>
                <td>$24.927,3</td>
                <td>$23.738,5</td>
              </tr>
              <tr>
                <td>Costo Ton MS</td>
                <td>$97.714,3</td>
                <td>$83.836,7</td>
                <td>$76.127,0</td>
                <td>$71.220,8</td>
                <td>$67.824,2</td>
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
              <td>$68,127</td>
              <td>$/kg MS</td>
            </tr>
            <tr>
              <td>Costo de confección del silaje embolsado:</td>
              <td>$76,127</td>
              <td>$/kg MS</td>
            </tr>
            <tr className={styles.total}>
              <td>Costo total del silaje aéreo:</td>
              <td>$117,949</td>
              <td>$/kg MS</td>
            </tr>
            <tr className={styles.total}>
              <td>Costo total del silaje embolsado:</td>
              <td>$125,949</td>
              <td>$/kg MS</td>
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
            <tr>
              <td data-label="Rinde MV/ha">25</td>
              <td data-label="Rinde MS/ha">8,75</td>
              <td data-label="Costo $/ha">$785.000,0</td>
              <td data-label="Costo $/ton MV">$31.400,0</td>
              <td data-label="Costo $/ton MS">$89.714,3</td>
              <td data-label="Costo total $/kg MS">$179,395</td>
            </tr>
            <tr>
              <td data-label="Rinde MV/ha">35</td>
              <td data-label="Rinde MS/ha">12,25</td>
              <td data-label="Costo $/ha">$929.000,0</td>
              <td data-label="Costo $/ton MV">$26.542,9</td>
              <td data-label="Costo $/ton MS">$75.836,7</td>
              <td data-label="Costo total $/kg MS">$139,894</td>
            </tr>
            <tr>
              <td data-label="Rinde MV/ha">45</td>
              <td data-label="Rinde MS/ha">15,75</td>
              <td data-label="Costo $/ha">$1.073.000,0</td>
              <td data-label="Costo $/ton MV">$23.844,4</td>
              <td data-label="Costo $/ton MS">$68.127,0</td>
              <td data-label="Costo total $/kg MS">$117,949</td>
            </tr>
            <tr>
              <td data-label="Rinde MV/ha">55</td>
              <td data-label="Rinde MS/ha">19,25</td>
              <td data-label="Costo $/ha">$1.217.000,0</td>
              <td data-label="Costo $/ton MV">$22.127,3</td>
              <td data-label="Costo $/ton MS">$63.220,8</td>
              <td data-label="Costo total $/kg MS">$103,985</td>
            </tr>
            <tr>
              <td data-label="Rinde MV/ha">65</td>
              <td data-label="Rinde MS/ha">22,75</td>
              <td data-label="Costo $/ha">$1.361.000,0</td>
              <td data-label="Costo $/ton MV">$20.938,5</td>
              <td data-label="Costo $/ton MS">$59.824,2</td>
              <td data-label="Costo total $/kg MS">$94,317</td>
            </tr>
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
};