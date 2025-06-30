import React from 'react';
import './convenios.css';
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
        <div className='convenios-container'>
            <h1 className='conveniossCACF'>Convenios CACF</h1>
            <p className='convenios-subtitle'>
                Conocé todas las empresas con las que tenemos convenios especiales para nuestros socios
            </p>
            <div className='convenios-imagenes'>
                <img src={Akron} className='img-convenios' alt="Convenio Akron" />
                <img src={Canavesio} className='img-convenios' alt="Convenio Canavesio" />
                <img src={Claas} className='img-convenios' alt="Convenio CLAAS" />
                <img src={CooperacionSeguros} className='img-convenios' alt="Convenio Cooperación Seguros" />
                <img src={Fliegl} className='img-convenios' alt="Convenio Fliegl" />
                <img src={Genofeed} className='img-convenios' alt="Convenio Genofeed" />
                <img src={JohnDeere} className='img-convenios' alt="Convenio John Deere" />
                <img src={Kuhn} className='img-convenios' alt="Convenio Kuhn" />
                <img src={NCH} className='img-convenios' alt="Convenio NCH" />
                <img src={NewHolland} className='img-convenios' alt="Convenio New Holland" />
                <img src={Richiger} className='img-convenios' alt="Convenio Richiger" />
                <img src={shakerBOX} className='img-convenios' alt="Convenio shakerBOX" />
                <img src={Tecnidra} className='img-convenios' alt="Convenio Tecnidra" />
                <img src={Vesta} className='img-convenios' alt="Convenio Vesta" />
                <img src={GEA} className='img-convenios' alt="Convenio GEA" />
                <img src={Ducart} className='img-convenios' alt="Convenio Ducart" />
                <img src={Blade} className='img-convenios' alt="Convenio Blade" />
                <img src={Greenpac} className='img-convenios' alt="Convenio Greenpac" />
                <img src={Taraborelli} className='img-convenios' alt="Convenio Taraborelli" />
                <img src={Bernardin} className='img-convenios' alt="Convenio Bernardin" />
            </div>
        </div>
    );
}