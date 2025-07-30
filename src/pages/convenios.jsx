import React from 'react';
import styles from './convenios.module.css';
import Akron from '../assets/images/convenios/Akron.webp';
import Canavesio from '../assets/images/convenios/Canavesio.webp';
import Claas from '../assets/images/convenios/CLAAS.webp';
import CooperacionSeguros from '../assets/images/convenios/Cooperación Seguros.webp';
import Fliegl from '../assets/images/convenios/Fliegl.webp';
import Genofeed from '../assets/images/convenios/Genofeed.webp';
import JohnDeere from '../assets/images/convenios/John Deere.webp';
import Kuhn from '../assets/images/convenios/Kuhn.webp';
import NCH from '../assets/images/convenios/NCH.webp';
import NewHolland from '../assets/images/convenios/New Holland.webp';
import Richiger from '../assets/images/convenios/Richiger.webp';
import shakerBOX from '../assets/images/convenios/shakerBOX.webp';
import Tecnidra from '../assets/images/convenios/Tecnidra.webp';
import Vesta from '../assets/images/convenios/Vesta.webp';
import GEA from '../assets/images/convenios/GEA.webp';
import Ducart from '../assets/images/convenios/Ducart.webp';
import Blade from '../assets/images/convenios/Blade.webp';
import Greenpac from '../assets/images/convenios/Greenpac.webp';
import Taraborelli from '../assets/images/convenios/Taraborelli.webp';
import Bernardin from '../assets/images/convenios/Bernardin.webp';
import Fondo from '../assets/images/imagenes-de-fondo/prueba-2.webp';

export default function Convenios() {
    return (
        <>
         <header className={styles.headerConvenios} style={{backgroundImage: `url(${Fondo})`}}>
            <h1 className={styles.conveniossCACF}>Convenios CACF</h1>
             <h2 className={styles.conveniosSubtitle}>
                Conocé todas las empresas con las que tenemos convenios especiales para nuestros socios
              </h2>
        </header>
        <div className={styles.conveniosContainer}>
            
            <div className={styles.conveniosImagenes}>
                <img src={Akron} className={styles.imgConvenios} alt="Convenio Akron" />
                <img src={Canavesio} className={styles.imgConvenios}  alt="Convenio Canavesio" />
                <img src={Claas} className={styles.imgConvenios} alt="Convenio CLAAS" />
                <img src={CooperacionSeguros}  className={styles.imgConvenios} alt="Convenio Cooperación Seguros" />
                <img src={Fliegl}  className={styles.imgConvenios} alt="Convenio Fliegl" />
                <img src={Genofeed} className={styles.imgConvenios} alt="Convenio Genofeed" />
                <img src={JohnDeere} className={styles.imgConvenios} alt="Convenio John Deere" />
                <img src={Kuhn} className={styles.imgConvenios} alt="Convenio Kuhn" />
                <img src={NCH} className={styles.imgConvenios} alt="Convenio NCH" />
                <img src={NewHolland} className={styles.imgConvenios}  alt="Convenio New Holland" />
                <img src={Richiger} className={styles.imgConvenios}  alt="Convenio Richiger" />
                <img src={shakerBOX} className={styles.imgConvenios} alt="Convenio shakerBOX" />
                <img src={Tecnidra} className={styles.imgConvenios} alt="Convenio Tecnidra" />
                <img src={Vesta} className={styles.imgConvenios} alt="Convenio Vesta" />
                <img src={GEA}  className={styles.imgConvenios} alt="Convenio GEA" />
                <img src={Ducart} className={styles.imgConvenios}  alt="Convenio Ducart" />
                <img src={Blade} className={styles.imgConvenios} alt="Convenio Blade" />
                <img src={Greenpac}  className={styles.imgConvenios} alt="Convenio Greenpac" />
                <img src={Taraborelli} className={styles.imgConvenios} alt="Convenio Taraborelli" />
                <img src={Bernardin} className={styles.imgConvenios}  alt="Convenio Bernardin" />
            </div>
        </div>
        
        </>
       
    );
}