// ...existing code...
import React, { useState } from "react";
import './App.css'

const API_KEY = "a0b4cc52a527ecbf66aa7dce55999876";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Weather app</h1>
      </div>

      <div className="section">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="button" onClick={getWeather}>
            Submit
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>{weather.name}</h2>
            {weather.main && <p>Temperature: {weather.main.temp}°C</p>}
            {weather.weather && weather.weather[0] && (
              <p>Description: {weather.weather[0].description}</p>
            )}
            {weather.main && <p>Humidity: {weather.main.humidity}%</p>}
            {weather.wind && <p>Wind Speed: {weather.wind.speed} m/s</p>}
          </div>
        )}
      </div>
    </div>
  );
}
