import React from "react";

export default function Login({url, tittle}){
    return(
        <div className="externalContent">
            <h2>{tittle}</h2>
            <iframe
            src= {url}
            width= "100%"
            height="900px"
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