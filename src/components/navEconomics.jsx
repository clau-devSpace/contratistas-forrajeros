import React from "react";
import styles from "./navEconomics.module.css";

export default function NavEconomics({activeTab, setActiveTab}) {

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button
          className={`${styles.tab} ${activeTab === "reference" ? styles.active : ""}`}
          onClick={() => setActiveTab("reference")}
        >
          Precios de Referencia
        </button>
        <button
          className={`${styles.tab} ${activeTab === "silage" ? styles.active : ""}`}
          onClick={() => setActiveTab("silage")}
        >
          Costos Silaje
        </button>
        <button
          className={`${styles.tab} ${activeTab === "ms" ? styles.active : ""}`}
          onClick={() => setActiveTab("ms")}
        >
          Costo MS
        </button>
        <button
          className={`${styles.tab} ${activeTab === "transport" ? styles.active : ""}`}
          onClick={() => setActiveTab("transport")}
        >
          Costos Transporte MV
        </button>
      </nav>

    </div>
  );
};

