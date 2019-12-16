import React from 'react';
import './Card.css'

export default function Card(props){
    return(
        <div className={"CardContainer " + (props.shown ? "Active" : "Toto")}>
            <div className="CardBody">
                <CardBack/>

                <CardFront card={props.data.card} color={props.data.color}/>
            </div>
        </div>
    )
}

function CardBack() {
    return(
        <div className="CardSide CardBack NeonPink ">

        </div>
    )
}

function CardFront(props) {
    return (
        <div className={"CardSide CardFront NeonPink FlexCenter " + props.color}>
            <h1>{props.card}</h1>
        </div>
    )
}
