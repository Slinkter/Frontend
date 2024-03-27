import React, { useEffect, useState } from "react";
import Search from "../search";
import "../../App.css";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(params) {
    try {
      const api_key = "95f387e6c20dba2ec0661e6dfe0dfd9d";
      const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=${api_key}`;
      const res = await fetch(url_api);
      const data = await res.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData("Lima");
  }, []);

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="">
      <h1>Weather</h1>

      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="loading"> Loading ... </div>
      ) : (
        <div className="App">
          <div className="city-name">
            <h2>
              {weatherData?.name} , <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{weatherData?.main?.temp}</div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind"> {weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>

            <div className="column">
              <div>
                <p className="humidity"> {weatherData?.main?.humidity} %</p>
                <p>Humidy</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
