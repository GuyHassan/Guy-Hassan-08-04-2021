import React, { useState } from "react";
import "./ListForecast.css";
import { connect } from "react-redux";
import { addFavoriteAction } from "../../Redux/redux";

// five days forecast list
const ListForecast = ({ getCurrentCity, addFavoriteAction, fiveDaysForcast }) => {
    const [CelorFarh, setCelorFarh] = useState(true)

    const ListOfDays = () => {
        const days = fiveDaysForcast[getCurrentCity.nameCity].map(
            (currDay, index) => {
                return (
                    <div key={index} className="each-days col-sm-2 col-4">
                        {currDay.day}
                        <br />
                        {CelorFarh ? `${currDay.degree.C} ℃` : `${currDay.degree.F} ℉`}
                    </div>
                );
            }
        );
        return <div className="list-days row">{days}</div>;
    };

    return (
        getCurrentCity ?
            (<div className="home-degree container" >
                <h1>{getCurrentCity.nameCity}</h1>
                <h3>{fiveDaysForcast[getCurrentCity.nameCity][0].degree.weather}</h3>
                <div>
                    <button className="btn btn-favorite-temparture" onClick={() => { addFavoriteAction(getCurrentCity); }}>Add To Favorite</button>
                    <button className="btn btn-favorite-temparture" onClick={() => { setCelorFarh(prev => !prev) }}> {!CelorFarh ? 'Celsius' : 'Fahrenheit'} </button>
                </div>
                <ListOfDays />
            </div >)
            : null
    );
};

const mapStateToProps = (state) => {
    return {
        getCurrentCity: state.currentCity,
        fiveDaysForcast: state.fiveDaysForcast,
    };
};

export default connect(mapStateToProps, { addFavoriteAction })(
    ListForecast
);
