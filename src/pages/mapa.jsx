import React from 'react';
import styles from './mapa.module.css';
import Fondo from '../assets/images/imagenes-de-fondo/tractor-2.jpg';

export default function Mapa({ url, tittle }) {
    return (
        <>
            <header 
                className={styles.headerMapa}
                style={{ backgroundImage: `url(${Fondo})` }}
            >
                <div className={styles.overlay}></div>
                <h1 className={styles.title}>
                    Localizá a Nuestros Socios
                </h1>
            </header>
            
            <iframe
                src={url}
                className={styles.mapFrame}
                title={tittle}
            />
        </>
    );
}