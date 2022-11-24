import React from "react";

import "../styles/forecast.css";

export default function Forecast({ weatherInfo, date }) {
  return (
    <div>
      <h1 className="fore_title">{[date[0], date[1], date[2]]}</h1>
      <img
        className="forewe-icon"
        src={
          "https://openweathermap.org/img/wn/" +
          weatherInfo.weather[0].icon +
          ".png"
        }
        alt={weatherInfo.weather[0].main}
      />
      <div className="fore-temp">
        <span className="temp-max">
          {Math.round(weatherInfo.temp.max)}
          <sup className="temperature__symbol">°</sup>
        </span>
        <span className="temp-min">
          {Math.round(weatherInfo.temp.min)}
          <sup className="temperature__symbol">°</sup>
        </span>
      </div>
    </div>
  );
}
