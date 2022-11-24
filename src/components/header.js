import React from "react";
import Search from "./searchPage";

import "../styles/header.css";

export default function Header({ searchCity }) {
    return ( 
        <header className = "Header">
        <h1 className = "title">5-Day Weather Forecast</h1>
        <Search searchCity = { searchCity }/> 
        </header>
    );
}