import React from "react";

export default function AreaEconomica({url, tittle}){
    return(
        <div className="externalContent">
            <h2>{tittle}</h2>
            <iframe
            src= {url}
            width= "100%"
            height="100%"
            tittle={tittle}
            style={
                {
                    marginTop:"30px"
            
                }
            }
            />
        </div>
    );
}