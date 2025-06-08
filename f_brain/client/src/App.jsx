import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import HistoryList from "./components/HistoryList";
import { fetchWeatherByCity, fetchSearchHistory } from "./services/weatherService";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ error state

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError(""); // ✅ Clear previous errors
      try {
        const historyData = await fetchSearchHistory();
        if (historyData.length) {
          const formattedHistory = historyData.map(item => ({
            id: item.id,
            city: item.city,
            date: new Date(item.searched_at).toLocaleString(),
            temperature: item.temperature,
            description: item.description
          }));
          setHistory(formattedHistory);
        }
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
    if (fromHistory) {
      // Get the stored weather data directly from the history array
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
      // Fresh search from API
      const data = await fetchWeatherByCity(city);
      if (data) {
        setWeatherData(data);

        // Refresh history
        const historyData = await fetchSearchHistory();
        if (historyData.length) {
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
    }
  } catch (err) {
    console.error("Erreur lors de la recherche:", err);
    setError("❌ Une erreur est survenue.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="app-container">
      <div className="sidebar">
        <HistoryList history={history} onSelect={handleSearch} />
      </div>
      <div className="main">
        <h1>☁️ Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {error && <p className="error">{error}</p>} {/* ✅ Error UI */}
        {weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
}

export default App;
