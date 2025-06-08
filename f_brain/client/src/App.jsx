import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import HistoryChart from "./components/HistoryChart";
import HistoryList from "./components/HistoryList";
import { fetchWeatherByCity, fetchSearchHistory, clearSearchHistory } from "./services/weatherService";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError("");
      try {
        const historyData = await fetchSearchHistory();
        const formattedHistory = historyData.map(item => ({
          id: item.id,
          city: item.city,
          date: new Date(item.searched_at).toLocaleString(),
          temperature: item.temperature,
          description: item.description
        }));
        setHistory(formattedHistory);
      } catch (err) {
        console.error("Impossible de charger l'historique:", err);
        setError("❌ Impossible de charger l'historique.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleSearch = async (city, fromHistory = false) => {
    setLoading(true);
    setError("");

    try {
      let data;
      if (fromHistory) {
        const entry = history.find(item => item.city.toLowerCase() === city.toLowerCase());
        if (entry) {
          setWeatherData({
            city: entry.city,
            temperature: entry.temperature,
            description: entry.description,
          });
        } else {
          setError("Données non trouvées pour cette ville.");
        }
      } else {
        data = await fetchWeatherByCity(city);
        if (data) {
          setWeatherData(data);
          // Refresh history after new search
          const historyData = await fetchSearchHistory();
          const formattedHistory = historyData.map(item => ({
            id: item.id,
            city: item.city,
            date: new Date(item.searched_at).toLocaleString(),
            temperature: item.temperature,
            description: item.description
          }));
          setHistory(formattedHistory);
        }
      }
    } catch (err) {
      console.error("Erreur lors de la recherche:", err);
      setError("❌ Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearSearchHistory();
      setHistory([]); // Immediately clear the local state
      setWeatherData(null); // Clear weather data if it was from history
      // Optionally refetch history to confirm it's empty
      const historyData = await fetchSearchHistory();
      if (historyData.length === 0) {
        console.log("History cleared successfully.");
      } else {
        console.warn("History not fully cleared on backend.");
      }
    } catch (err) {
      console.error("Erreur lors du vidage de l'historique:", err);
      setError("❌ Impossible de vider l'historique.");
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <HistoryList history={history} onSelect={handleSearch} />
        <button onClick={handleClearHistory} className="clear-history-btn">
          Clear History
        </button>
      </div>
      <div className="main">
        <h1>☁️ Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {weatherData && (
          <div className="info-panel">
            <WeatherCard data={weatherData} />
            <HistoryChart history={history} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;