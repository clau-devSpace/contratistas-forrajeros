import React from 'react';
import Fondo from '../assets/images/imagenes-de-fondo/fondo-mapa-1.jpg';
import Fondo2 from '../assets/images/imagenes-de-fondo/fondo-mapa-2.jpg';



export default function Mapa({url, tittle}){

     const headerStyles = {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        heigth: '50vh'
        };

        const titleStyles = {
            fontSize: '43px',
            letterSpacing: '2',
            color: '#ffffff',
            fontWeight: '700px'
            
        };


    return(
        <>
        <header style={{ backgroundImage: `url(${Fondo})`, headerStyles} }
        className='headerMapa'>
       
          <h1 style={titleStyles}>Localiza a Nuestros Socios en los Diferentes Puntos del País y del Mundo</h1>
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