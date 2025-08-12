import React from "react";
import ImagenEstadisticas from '../assets/images/estadisticas ensilaje/CACF_Estadísticas_2023-2024.jpg';
import styles from './estadisticas.module.css';

export default function Estadisticas(){
    return(
        <div className={styles.contenedorEstadisticas}>
            <img 
            src={ImagenEstadisticas}
            alt="Estadísticas Ensilaje Argentina"/>
            {styles.imagenEstadisticas}
        </div>
    )
}