import { useEffect, useState } from 'react';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/api/history/')
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <div className="history">
      <h2>Historique</h2>
      <ul>
        {history.map((item, i) => (
          <li key={i}>
            {item.location} : {item.temperature}°C ({item.description}) – {new Date(item.searched_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
