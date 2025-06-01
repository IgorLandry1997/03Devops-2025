// src/App.jsx
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import HistoryList from "./components/HistoryList";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearch = (city) => {
    // Simule une réponse météo
    const fakeData = {
      city,
      temperature: Math.floor(Math.random() * 30) + "°C",
      condition: "Sunny ☀️",
    };
    setWeather(fakeData);
    setHistory((prev) => [fakeData, ...prev]);
  };

  return (
    <div className="app">
      <h1>🌤️ MétéoApp</h1>
      <SearchBar onSearch={handleSearch} />
      {weather && (
        <div className="result">
          <h2>{weather.city}</h2>
          <p>{weather.temperature}</p>
          <p>{weather.condition}</p>
        </div>
      )}
      <HistoryList history={history} />
    </div>
  );
}

export default App;
