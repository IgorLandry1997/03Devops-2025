import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity(""); // reset champ
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
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
  );
}
