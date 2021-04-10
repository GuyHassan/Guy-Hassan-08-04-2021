import axios from "axios";
import { toast } from 'react-toastify';

// get some characters and return the cities that start with that characters (autoComplete)
const apiCities = async (city) => {
  try {
    const response = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=CSiPIYWEAubHmLLzcNs7OWeDfX8Q5tkM&q=${city}`
    );
    return response.data;
  } catch (err) {
    errorToast('Something Wrong With The - AutoComplete - API !');
    console.log(err);
  }
};
// get latitude and longtitude than convert them to current city (using for Navbar temparture & city name)
const reverseLocation = (setCurrLocation, setCurrentForecast) => {
  const hour = new Date().getHours();

  // callback fucntion for navigator geoLocation
  const success = async (position) => {
    const latitude = position.coords.latitude,
      longitude = position.coords.longitude;

    const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=CSiPIYWEAubHmLLzcNs7OWeDfX8Q5tkM&q=${latitude}%2C${longitude}`;

    try {
      const getCityByLat_Lon = await axios.get(url);
      console.log(getCityByLat_Lon);
      const cityName = getCityByLat_Lon.data.LocalizedName;

      const getTemp_PropCity = await getForecast(cityName, 1);

      const temparture = calculateHourTemp(hour, getTemp_PropCity.temp[0]);

      setCurrLocation({
        nameCity: getTemp_PropCity.nameCity,
        key: getTemp_PropCity.key,
      });
      setCurrentForecast(temparture);
      localStorage.setItem("autoLocationCity", JSON.stringify({
        nameCity: getTemp_PropCity.nameCity, key: getTemp_PropCity.key, hour, temp: temparture,
      }));
    } catch (err) {
      errorToast('Something Wrong With The - GeoLocation - API !');
      console.log(err);
    }
  };

  // callback function for navigator geoLocation
  const error = () => {
    errorToast('Unable to retrieve your location !');
    return "Unable to retrieve your location";
  };

  const autoLocationCity = JSON.parse(localStorage.getItem("autoLocationCity"));

  // modify the auto current city weather in each hour
  if (autoLocationCity === null || autoLocationCity.hour + 1 <= hour) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    setCurrLocation({ nameCity: autoLocationCity.nameCity, key: autoLocationCity.key, });
    setCurrentForecast(autoLocationCity.temp);
  }
};

// handaling temparture and weather icon
const calculateHourTemp = (hour, tempFahr) => {
  let F = Math.ceil(tempFahr.Temperature.Maximum.Value);
  let weather = tempFahr.Night.IconPhrase;

  if ((hour >= 0 && hour <= 10) || hour >= 20)
    F = Math.ceil(tempFahr.Temperature.Minimum.Value);

  if (hour >= 8 && hour <= 19) weather = tempFahr.Day.IconPhrase;

  const C = Math.ceil((F - 32) / 1.8);

  return { F, C, weather };
};

// get current Forecast depending on the number of days (5days / 1day)
const getForecast = async (cityName, amountDays, cityId = null) => {
  let cityProerties = {}, getTemp = null;
  try {
    if (cityId === null) {
      const getCityId = await apiCities(cityName);
      cityProerties = {
        key: getCityId[0].Key,
        nameCity: getCityId[0].LocalizedName,
      };
      cityId = cityProerties.key;
    }
    getTemp = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/${amountDays}day/${cityId}?apikey=CSiPIYWEAubHmLLzcNs7OWeDfX8Q5tkM`);

  } catch (err) {
    errorToast('Something Wrong With The - Days Forecast - API !');
    console.log(err)
  }

  return { ...cityProerties, temp: getTemp.data.DailyForecasts };
};

// toast error handaling
const errorToast = (errMessage) => {
  toast(errMessage, {
    className: "custom-toast",
    draggable: true,
    position: toast.POSITION.TOP_CENTER,
  })
}
export { apiCities, reverseLocation, getForecast, calculateHourTemp, errorToast };
