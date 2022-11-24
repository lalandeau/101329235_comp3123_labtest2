import React from "react";
import Weather from "./weatherPage";
import Forecast from "./forecast";
import "../styles/wefore.css";

function WeatherAndForecast({ weatherInfo, location }) {
  const day = dateBuilder(new Date());

  function dateBuilder(d) {
    const weekDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const date = [];

    for (let count = 0; count < 5; count++) {
      if (d.getDay() + count < 7) date[count] = d.getDay() + count;
      else if (d.getDay() + count === 7) date[count] = 0;
      else if (d.getDay() + count === 8) date[count] = 1;
      else if (d.getDay() + count === 9) date[count] = 2;
      else if (d.getDay() + count === 10) date[count] = 3;
    }

    return [
      weekDay[date[0]],
      weekDay[date[1]],
      weekDay[date[2]],
      weekDay[date[3]],
      weekDay[date[4]],
    ];
  }

  return (
    <div className="WeatherAndForecast">
      <Weather weatherInfo={weatherInfo} location={location} date={day[0]} />
      <div className="wf_container">
        <Forecast weatherInfo={weatherInfo.daily[0]} date={day[0]} />
        <Forecast weatherInfo={weatherInfo.daily[1]} date={day[1]} />
        <Forecast weatherInfo={weatherInfo.daily[2]} date={day[2]} />
        <Forecast weatherInfo={weatherInfo.daily[3]} date={day[3]} />
        <Forecast weatherInfo={weatherInfo.daily[4]} date={day[4]} />
      </div>
    </div>
  );
}

export default WeatherAndForecast;
