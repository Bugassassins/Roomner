import React from 'react';
import "./Card.css";

const Card = (props) => {
    return(
        <div className="Card-container">
            <img src={props.src} alt="step 1"/>
            <h3>{props.head}</h3>
            <p>{props.des}</p>
        </div>
    )
}

export default Card;