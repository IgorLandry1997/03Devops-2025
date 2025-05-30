import { useState, useEffect } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("weather_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("weather_history", JSON.stringify(history));
  }, [history]);

  async function fetchWeather(c) {
    try {
      const res = await fetch("/api/weather/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: c }),
      });
      if (!res.ok) throw new Error("Ville non trouvée");
      const data = await res.json();
      setWeather(data);
      setHistory((h) => {
        const filtered = h.filter((item) => item.id !== data.id);
        return [data, ...filtered].slice(0, 10);
      });
    } catch (err) {
      alert(err.message);
    }
  }

  function onSearch(e) {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWeather(city.trim());
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌤️ Météo App</h1>

      <form onSubmit={onSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Entrez une ville..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          🔍 Rechercher
        </button>
      </form>

      {weather && (
        <div style={styles.card}>
          <h2>{weather.city}</h2>
          <p style={styles.temp}>{weather.temperature} °C</p>
          <p style={styles.desc}>{weather.description}</p>
          <p style={styles.date}>📅 {weather.created_at}</p>
        </div>
      )}

      <h3 style={styles.subTitle}>📜 Historique</h3>
      <ul style={styles.list}>
        {history.map((item) => (
          <li key={item.id}>
            <button style={styles.historyItem} onClick={() => setWeather(item)}>
              {item.city} — {item.temperature} °C — {item.description}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
  height: "100vh",
  padding: 20,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#f8f9fa",
  fontFamily: "Arial, sans-serif",
  overflowY: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 20,
    color: "#333",
  },
  form: {
    display: "flex",
    marginBottom: 20,
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: 20,
    textAlign: "center",
  },
  temp: {
    fontSize: 28,
    fontWeight: "bold",
    margin: "8px 0",
  },
  desc: {
    fontStyle: "italic",
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  subTitle: {
    marginTop: 30,
    fontSize: 20,
    borderBottom: "1px solid #ccc",
    paddingBottom: 5,
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  historyItem: {
    width: "100%",
    textAlign: "left",
    background: "#e9ecef",
    border: "none",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    cursor: "pointer",
  },
};
