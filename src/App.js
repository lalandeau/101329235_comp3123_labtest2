import React, { useState, useEffect } from "react";

import Header from "./components/header";
import WeatherAndForecast from "./components/wfPage";
import Footer from "./components/footer";
import Loader from "./components/loaderPage";
import Warning from "./components/mesPage";

import getAddressOfCoordinates from "./api/reverseGeocoding";
import getCoordinatesOfAddress from "./api/forwardGeocoding";
import getWeatherAndForecast from "./api/weatherAndForecast";

import "./styles/App.css";

function App() {
  const [add, setAddress] = useState("");
  const [coor, setCoordinates] = useState({});
  const [weatherinfo, setWeatherAndForecastInfo] = useState({});
  const [loc_info, setLocationInfo] = useState({});
  const [state, setContentState] = useState("blank");

  function city_search(target) {
    setAddress(target);
  }

  function error() {
    setContentState("warning");
    setTimeout(() => setContentState("blank"), 3000);
  }

  useEffect(() => {
    function loc_req(position) {
      setContentState("loading");
      getAddressOfCoordinates(
        position.coords.latitude,
        position.coords.longitude
      )
        .then((res) => {
          setLocationInfo({
            city: res.data.results[0].components.city_district,
            town: res.data.results[0].components.town,
            state: res.data.results[0].components.state_code,
            country: res.data.results[0].components.country_code
          });
        })
        .then(() =>
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        )
        .catch((error) => error());
    }

    function error_catch(err) {
      alert("ERROR(" + err.code + "): " + err.message);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(loc_req, error_catch);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (add === "") return;

    setContentState("loading");
    getCoordinatesOfAddress(add)
      .then((res) => {
        if (
          res.data.results.length === 0 ||
          (res.data.results[0].components.city === undefined &&
            res.data.results[0].components.town === undefined)
        ) {
          error();
          return;
        }

        setCoordinates(res.data.results[0].geometry);
        setLocationInfo({
          city: res.data.results[0].components.city,
          town: res.data.results[0].components.town,
          state: res.data.results[0].components.state_code,
          country: res.data.results[0].components.country_code
        });
      })
      .catch((error) => error());
  }, [add]);

  useEffect(() => {
    if (Object.keys(coor).length === 0) return;

    getWeatherAndForecast(coor)
      .then((res) => {
        setWeatherAndForecastInfo(res.data);
        setContentState("weatherAndForecast");
      })
      .catch((error) => error());
  }, [coor]);

  const app_main = {
    blank: () => null,
    loading: () => <Loader />,
    warning: () => <Warning />,
    weatherAndForecast: () => (
      <WeatherAndForecast
        weatherInfo={weatherinfo}
        location={loc_info}
      />
    )
  };

  return (
    <div className="App">
      <div className="container">
        <div>
          <Header searchCity={city_search} />
          {app_main[state]()}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
