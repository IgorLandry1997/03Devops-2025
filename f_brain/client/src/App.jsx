// src/App.jsx
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import HistoryList from "./components/HistoryList";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearch = (city) => {
    const data = {
      city,
      country: "Demo",
      temp: "12°C",
      feels_like: "11°C",
      high: "17°C",
      low: "7°C",
      condition: "Light Rain",
      icon: "🌧️",
      wind: "8.2 m/s NE",
      humidity: "6%",
      visibility: "5.7 km",
      pressure: "1004 hPa",
      sunrise: "16:04",
      sunset: "02:04",
      timestamp: new Date().toLocaleString("fr-FR"),
    };

    setWeather(data);
    setHistory((prev) => [data, ...prev]);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Search History</h2>
        <HistoryList history={history} />
      </aside>
      <main className="main-content">
        <h1>🌤️ Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {weather && <WeatherCard data={weather} />}
      </main>
    </div>
  );
}

export default App;
