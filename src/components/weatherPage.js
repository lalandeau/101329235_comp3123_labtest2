import React from "react";

import "../styles/weather.css";

export default function Current({ weatherInfo, location, date }) {
  const ts = weatherInfo.current.dt;
  function dayConverter(timestamp){
    var a = new Date(timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var day = month + ' ' + date + ', ' + year
    return day;
  }

  function timeConverter(timestamp){
    var a = new Date(timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var date = hour + ':' + min + ':' + sec
    return date;
  }

  return (
    <div className="Weather">
      <div className="info">
        <img
          className="icon"
          src={
            "https://openweathermap.org/img/wn/" +
            weatherInfo.current.weather[0].icon +
            ".png"
          }
          alt={weatherInfo.current.weather[0].main}
        />
        <ul className="list">
          <li className="temp">
            {Math.round(weatherInfo.current.temp)}
            <sup className="temp-sym">°C</sup>
          </li>
          <li> Humidity: {weatherInfo.current.humidity}% </li>
          <li>
            {" "}
            Wind: {Math.round(weatherInfo.current.wind_speed * 3.6)} km/h{" "}
          </li>
          <li> Pressure: {weatherInfo.current.pressure} mb </li>
          <li> Feels Like: {Math.round(weatherInfo.current.feels_like)}°C </li>
        </ul>
      </div>
      <div className="other-info">
        <h2 className="other-city">
          {location.city || location.town},{" "}
          {location.state || location.country.toUpperCase()}
        </h2>
        <h3 className="other-clouds">
          {weatherInfo.current.weather[0].description.toUpperCase()}
        </h3>
        <h3 className="other-clouds">{date}</h3>
        <h3 className="other-clouds">{dayConverter(ts)}</h3>
        <h3 className="other-clouds">{timeConverter(ts)}</h3>
      </div>
      
    </div>
  );
}
