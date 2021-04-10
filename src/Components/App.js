import React, { useEffect } from "react";
import InputCountries from "./home/InputCities";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nav from "./navbar/Nav";
import ListForecast from "../Components/home/ListForecast";
import FavoriteCities from "../Components/favoritesCities/FavoriteCities";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from '../Components/footer/Footer';
import { connect } from "react-redux";
import { addCurrentCity, addFavoriteAction } from "../Redux/redux";

const App = ({ addCurrentCity, getCurrentCity, addFavoriteAction }) => {

  // update on start application
  useEffect(() => {
    if (!getCurrentCity) {
      addCurrentCity({ nameCity: "Tel Aviv", key: "215854" })
      addFavoriteAction({ nameCity: "Tel Aviv", key: "215854" })

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCurrentCity, getCurrentCity])

  return (
    <Router >
      <div className="App">
        <>
          <ToastContainer draggable={false} transition={Zoom} autoClose={6000} />
        </>
        <Nav />
        <Switch>
          <Route path="/favorite" component={FavoriteCities} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    </Router>

  );
};

const Home = () => {
  return (
    <div className='main-days'>
      <InputCountries />
      <ListForecast />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { getCurrentCity: state.currentCity };
};
export default connect(mapStateToProps, { addCurrentCity, addFavoriteAction })(App);
