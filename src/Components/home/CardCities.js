import React from 'react';
import './InputCities.css';
// autoComplete component - get name and callback useState function and change the state when user is clicked
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