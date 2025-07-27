import React from 'react';
import styles from './convenios.module.css';
import Akron from '../assets/images/convenios/Akron.png';
import Canavesio from '../assets/images/convenios/Canavesio.png';
import Claas from '../assets/images/convenios/CLAAS.png';
import CooperacionSeguros from '../assets/images/convenios/Cooperación Seguros.png';
import Fliegl from '../assets/images/convenios/Fliegl.png';
import Genofeed from '../assets/images/convenios/Genofeed.png';
import JohnDeere from '../assets/images/convenios/John Deere.png';
import Kuhn from '../assets/images/convenios/Kuhn.png';
import NCH from '../assets/images/convenios/NCH.png';
import NewHolland from '../assets/images/convenios/New Holland.png';
import Richiger from '../assets/images/convenios/Richiger.png';
import shakerBOX from '../assets/images/convenios/shakerBOX.png';
import Tecnidra from '../assets/images/convenios/Tecnidra.png';
import Vesta from '../assets/images/convenios/Vesta.png';
import GEA from '../assets/images/convenios/GEA.png';
import Ducart from '../assets/images/convenios/Ducart.png';
import Blade from '../assets/images/convenios/Blade.png';
import Greenpac from '../assets/images/convenios/Greenpac.png';
import Taraborelli from '../assets/images/convenios/Taraborelli.png';
import Bernardin from '../assets/images/convenios/Bernardin.png';

export default function Convenios() {
    return (
        <div className={styles.conveniosContainer}>
            <h1 className={styles.conveniossCACF}>Convenios CACF</h1>
            <p className={styles.conveniosSubtitle}>
                Conocé todas las empresas con las que tenemos convenios especiales para nuestros socios
            </p>
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
    );
}