import React, { useEffect, useState } from "react";
import "./Nav.css";
import { reverseLocation } from "../../Utilities/apis";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [currentLocation, setCurrLocation] = useState({
    key: "",
    nameCity: "----",
  });
  const [currentForecast, setCurrForecast] = useState({ F: "", C: "" });

  useEffect(() => {
    reverseLocation(setCurrLocation, setCurrForecast);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="d-flex location">
        <div className="navbar-brand d-flex">
          {currentLocation.nameCity}{" "}
          <p className="mb-0 ml-1"> - {`${currentForecast.C}`}&#8451;</p>
        </div>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="ml-auto form-inline my-2 my-lg-0">
          <Link to="/">
            <button className="btn btn-outline-danger my-2 my-sm-0 m-2">
              Home
            </button>
          </Link>

          <Link to="favorite">
            <button className="btn btn-outline-danger my-2 my-sm-0">
              Favorite
            </button>
          </Link>
        </form>
      </div>
    </nav>
  );
};
export default Navbar;
