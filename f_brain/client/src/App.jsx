import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import HistoryList from "./components/HistoryList";
import { fetchWeatherByCity } from "./services/weatherService";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearch = async (city) => {
    const data = await fetchWeatherByCity(city);
    if (data) {
      setWeatherData(data);
      setHistory([{ city, date: new Date().toLocaleString() }, ...history]);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <HistoryList history={history} />
      </div>
      <div className="main">
        <h1>☁️ Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
}

export default App;
