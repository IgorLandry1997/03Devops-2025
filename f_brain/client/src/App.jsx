import { useState, useEffect } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  // Charger historique depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem("weather_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Sauvegarder historique à chaque changement
  useEffect(() => {
    localStorage.setItem("weather_history", JSON.stringify(history));
  }, [history]);

  async function fetchWeather(c) {
    const res = await fetch("/api/weather/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: c }),
    });
    if (!res.ok) {
      alert("Ville non trouvée");
      return;
    }
    const data = await res.json();
    setWeather(data);

    // Ajout dans l'historique (en évitant doublons)
    setHistory((h) => {
      const filtered = h.filter((item) => item.id !== data.id);
      return [data, ...filtered].slice(0, 10);
    });
  }

  function onSearch(e) {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWeather(city.trim());
  }

  function onSelectHistory(record) {
    setWeather(record);
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Météo</h1>

      <form onSubmit={onSearch} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Entrez une ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ width: "70%", padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 8 }}>
          Rechercher
        </button>
      </form>

      {weather && (
        <div
          style={{
            padding: 12,
            border: "1px solid #ccc",
            borderRadius: 6,
            marginBottom: 20,
          }}
        >
          <h2>{weather.city}</h2>
          <p>
            Température : {weather.temperature} °C <br />
            Description : {weather.description}
          </p>
          <small>Le {weather.created_at}</small>
        </div>
      )}

      <h3>Historique</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {history.map((item) => (
          <li key={item.id} style={{ marginBottom: 10 }}>
            <button
              style={{
                border: "none",
                background: "#eee",
                padding: 8,
                width: "100%",
                textAlign: "left",
                borderRadius: 4,
                cursor: "pointer",
              }}
              onClick={() => onSelectHistory(item)}
            >
              {item.city} — {item.temperature} °C — {item.description}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
