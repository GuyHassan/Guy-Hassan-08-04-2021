import React from 'react';
import './InputCities.css';

const CardCities = ({ name, chosenName }) => {

    return (
        <div className="card-country">
            <hr />
            <h2 onClick={event => { chosenName(event.target.getAttribute('name')) }} name={name}> {name} </h2>
            <hr />
        </div>
    )
}
export default CardCities;