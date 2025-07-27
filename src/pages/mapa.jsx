import React from 'react';
import Fondo from '../assets/images/imagenes-de-fondo/tractor-2.jpg';
import Fondo2 from '../assets/images/imagenes-de-fondo/fondo-mapa-2.jpg';



export default function Mapa({url, tittle}){

     const headerStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '50vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
        };

        const titleStyles = {
            fontSize: '38px',
            paddingTop: '55px',
            letterSpacing: '2',
            color: '#ffffff',
            fontWeight: '600px',
            maxWidth: '800px',
            zIndex: '2'
        };

        const overlayStyles = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
            zIndex: 1
        }


    return(
        <>
        <header style={{ backgroundImage: `url(${Fondo})`, ...headerStyles} }
        className='headerMapa'>
          <div style={overlayStyles}></div>
          <h1 style={titleStyles}>Localizá a Nuestros Socios</h1>
        </header>
        <iframe
            src= {url}
            width= "100%"
            height="900px"
            tittle={tittle}
            />
    </>
    )
}