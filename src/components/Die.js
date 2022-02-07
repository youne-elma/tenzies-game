import React from 'react'

export default function Die(props){

    return(
        <div 
            className="die" 
            onClick={() => props.dieLock(props.id)}
            style={ props.isHeld ? {
                color: "#DACC96",
                backgroundColor: "#632626"
            } : {} }
        >
            <p className="symbol">{props.value}</p>
        </div>
    )
}