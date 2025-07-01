import React from 'react';

export default function Mapa({url, tittle}){
    return(
        <iframe
            src= {url}
            width= "100%"
            height="900px"
            tittle={tittle}
            />
    )
}