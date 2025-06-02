// src/components/HistoryList.jsx
import "./HistoryList.css";

function HistoryList({ history }) {
  return (
    <ul className="history-list">
      {history.map((entry, idx) => (
        <li key={idx}>
          <p>📍 {entry.city}, {entry.country}</p>
          <small>{entry.timestamp}</small>
        </li>
      ))}
    </ul>
  );
}

export default HistoryList;
