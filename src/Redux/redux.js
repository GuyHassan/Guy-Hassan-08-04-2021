import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { calculateHourTemp, getForecast } from "../Utilities/apis";
import { errorToast } from "../Utilities/apis";

const initialState = {
    currentCity: null,
    fiveDaysForcast: null,
    favCities: [],
};
// Middaleware help us with async function on redux - manage values after async call to reducer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

// -----------------------  Reducer --------------------------------
function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_FAVORITE":
            // if user click twice on same favorite
            const cityExists = state.favCities.some((city) => city.nameCity === action.payload.nameCity)
            if (cityExists) {
                errorToast('This City Is In Your Favorite !');
                return { ...state }
            }
            // enable only 5 favorite at time
            if (state.favCities.length === 5) {
                state.favCities.shift();
            }
            // updating the storage
            localStorage.setItem("favCities", JSON.stringify([action.payload, ...state.favCities]));

            return {
                ...state,
                favCities: [...state.favCities, action.payload],
            };
        case "ADD_CURRENT_WEATHER":
            return {
                ...state,
                currentCity: { ...state.currentCity, ...action.payload },
            };
        case "SET_FIVE_DAYS_FORECAST":
            return {
                ...state,
                fiveDaysForcast: { ...state.fiveDaysForcast, ...action.payload },
            };
        default:
            return state;
    }
}

// -----------------------  Actions --------------------------------

export const addFavoriteAction = (favCities) => ({
    type: "ADD_FAVORITE",
    payload: favCities,
});

export const setFiveDays = (fiveDaysForcast) => ({
    type: "SET_FIVE_DAYS_FORECAST",
    payload: fiveDaysForcast,
});

// when we add current city we update couple of values (forecast and city name)
export const addCurrentCity = (currentCity) => async (dispatch, getState) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        hour = new Date();
    if (!currentCity['Key'] && !currentCity['nameCity']) { return {} }

    try {
        const fiveDaysForcast = {};
        fiveDaysForcast[currentCity.nameCity] = [];

        const daysForecast = await getForecast(
            currentCity.nameCity,
            5,
            currentCity.key
        );
        daysForecast.temp.forEach((eachTemp, i) => {
            const getTemp = calculateHourTemp(hour, eachTemp);
            fiveDaysForcast[currentCity.nameCity].push({
                degree: getTemp,
                day: days[i],
            });
        });
        dispatch({
            type: "SET_FIVE_DAYS_FORECAST",
            payload: { ...fiveDaysForcast },
        });
        dispatch({
            type: "ADD_CURRENT_WEATHER",
            payload: currentCity,
        });
    } catch (err) {
        errorToast('Something Wrong With The - Days Forecast - API !')
        console.log(err);
    }
};
