import "./HistoryList.css";

export default function HistoryList({ history }) {
  return (
    <div className="history-list">
      <h3>Search History</h3>
      {history.map((item, idx) => (
        <div key={idx} className="history-item">
          <span>📍 {item.city}</span>
          <span className="timestamp">{item.date}</span>
        </div>
      ))}
    </div>
  );
}
