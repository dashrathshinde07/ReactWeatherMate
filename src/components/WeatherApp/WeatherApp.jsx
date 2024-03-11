import React, { useState } from "react";
import "./WeatherApp.css";

// Importing icons
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  // API key for accessing weather data
  let api_key = "45ddd58ae8d3146d35014e19fc36cfcb";

  // State variable to manage weather icon
  const [wicon, setWicon] = useState(clear_icon);

  // Function to fetch weather data
  const search = async () => {
    // Get the value of the input element with class 'city'
    const element = document.getElementsByClassName("city");
    if (element[0].value === "") {
      return 0;
    }

    // Constructing the API URL for fetching weather data
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    // Fetching weather data from the API
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");

    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    // Update UI with fetched weather data
    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    temprature[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;

    // Setting weather icon based on weather condition
    if (data.weather[0].icon === "01d" || data.weather[0] === "01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0] === "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "03d" || data.weather[0] === "03n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "04d" || data.weather[0] === "04n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0] === "09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "10d" || data.weather[0] === "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0] === "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        {/* Input field for city search */}
        <input type="text" className="city" placeholder="Search" />
        {/* Search icon */}
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>

      {/* Weather image */}
      <div className="weather-image">
        <img src={wicon} alt="cloud-icon" />
      </div>

      {/* Displaying weather temperature */}
      <div className="weather-temp">24°C</div>
      {/* Displaying weather location */}
      <div className="weather-location">London</div>

      {/* Container for additional weather data */}
      <div className="data-container">
        <div className="element">
          {/* Humidity icon */}
          <img src={humidity_icon} alt="" className="icon" />

          {/* Humidity data */}
          <div className="data">
            <div className="humidity-percent">64°C</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          {/* Wind icon */}
          <img src={wind_icon} alt="wind-icon" className="icon" />
          {/* Wind speed data */}
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
