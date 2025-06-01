import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
    const res = await fetch(`/api/weather/?location=${location}`);
    const data = await res.json();
    onSearch(data);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Entrez une ville..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
}

export default SearchBar;
