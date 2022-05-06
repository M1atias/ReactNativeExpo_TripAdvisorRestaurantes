import React from 'react';

export default function Saludar (props){
    const {userInfo, saludarFN} = props;
    const {nombre = 'Anonimo'} = userInfo

    return(
        <div>
           <button onClick={ () => saludarFN(nombre)}>Saludar</button>
        </div>
    );
}