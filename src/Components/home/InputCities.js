import React, { useState } from "react";
import { apiCities, errorToast } from "../../Utilities/apis";
import { connect } from "react-redux";
import { addCurrentCity } from "../../Redux/redux";
import "./InputCities.css";
import CardCities from "./CardCities";
import herolo from "../../Assets/herolo.png";



const InputCities = ({ addCurrentCity }) => {
  const [nCity, setCity] = useState({ key: "", nameCity: "" });
  const [citiesFound, setCitiesFound] = useState("");

  const onChange = async (event) => {
    const valInput = event.target.value;

    if (valInput.length >= 2) {
      const cityDetails = await apiCities(valInput);
      typeof cityDetails === "object"
        ? setCitiesFound(cityDetails)
        : console.log("Something Wrong - ", cityDetails);
    } else setCitiesFound("");

    setCity({ ...nCity, nameCity: valInput });
  };
  const onChooseCity = (currName) => {
    const currCityDetails = citiesFound.filter(
      (details) => currName === details.LocalizedName
    );
    setCity({ key: currCityDetails[0].Key, nameCity: currName });
    setCitiesFound([]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (nCity.key === "") {
      errorToast("You Must Choose City From The List !")
    } else {
      setCitiesFound("");

      addCurrentCity(nCity);

      setCity({ key: "", nameCity: "" });
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-input w-75">
      <div className="form-div ">
        <div className="main-title mb-2">
          <h1>
            <img src={herolo} alt="destroyd" />
            Wea<span>t</span>her
          </h1>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button className="btn btn-outline-dark" type="submit">
              Submit
            </button>
          </div>
          <input
            autoComplete="off"
            type="text"
            className="form-control"
            name="inputCountry"
            placeholder="Countries..."
            aria-label=""
            aria-describedby="basic-addon1"
            value={nCity.nameCity}
            onChange={onChange}
          />
        </div>
        {citiesFound.length > 0 &&
          citiesFound.map((city, index) => {
            return (
              <CardCities
                key={index}
                name={city.LocalizedName}
                chosenName={onChooseCity}
              ></CardCities>
            );
          })}
      </div>
    </form>
  );
};

export default connect(null, { addCurrentCity })(InputCities);
