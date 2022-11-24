import React, { useState } from "react";

import "../styles/search.css";

export default function Search({ searchCity }) {
  const [currentCity, setCurrentCity] = useState("");

  function handleInputChange(event) {
    setCurrentCity(event.target.value);
  }

  function handleButtonClick() {
    if (currentCity.trim() === "") return;
    searchCity(currentCity);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleButtonClick();
  }

  return (
    <div className="Search">
      <label className="label">
        <input
          className="input"
          placeholder="Enter a Location"
          value={currentCity}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </label>
      <button className="button" onClick={handleButtonClick}>
        Search
      </button>
    </div>
  );
}
