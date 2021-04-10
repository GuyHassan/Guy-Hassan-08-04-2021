import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./FavoriteCities.css";
import { addCurrentCity, addFavoriteAction } from "../../Redux/redux";
import { Redirect } from 'react-router';

const FavoriteCities = ({ favCities, fiveDaysForcast, addCurrentCity, addFavoriteAction, }) => {
    const [redirectPos, setRedirectPos] = useState(false)
    const [CelorFarh, setCelorFarh] = useState(true)

    useEffect(() => {
        const storageFavCities = localStorage.getItem("favCities");

        // if has favorite on a localstorage when upload component
        if (storageFavCities && favCities.length === 0) {
            JSON.parse(storageFavCities).forEach((city) => {
                addFavoriteAction(city);
                addCurrentCity(city);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addFavoriteAction]);

    //rendering list of favorite 
    const ListOfFavorite = () => {
        const days = favCities.map(({ nameCity, key }) => {
            return (fiveDaysForcast[nameCity] ? (
                <div
                    className="list-fav col-xs-12 col-md-8 col-lg-2"
                    to="/"
                    key={key}
                    onClick={() => {
                        addCurrentCity({ nameCity, key });
                        setRedirectPos(prev => (!prev))
                    }}>
                    <p>{nameCity}</p> <br />
                    <p> {CelorFarh ? `${fiveDaysForcast[nameCity][0].degree.C} ℃` : `${fiveDaysForcast[nameCity][0].degree.F} ℉`}</p>
                    <br />
                    <p>{fiveDaysForcast[nameCity][0].degree.weather}</p>
                </div>
            ) : null
            );
        });
        return (<div className="main-days row ">{days}</div>);
    };

    return (fiveDaysForcast ? (
        <div className="container">
            <div className="favorite-cities">
                <h2><span>F</span>avorite <span>C</span>ities</h2>
                <button className="btn btn-favorite-temparture" onClick={() => { setCelorFarh(prev => !prev) }}> {!CelorFarh ? 'Celsius' : 'Fahrenheit'} </button>
            </div>
            {redirectPos && <Redirect to='/' />}
            <ListOfFavorite />
        </div>) : null
    );
};

const mapStateToProps = (state) => { return { favCities: state.favCities, fiveDaysForcast: state.fiveDaysForcast }; };

export default connect(mapStateToProps, { addCurrentCity, addFavoriteAction })(FavoriteCities);
