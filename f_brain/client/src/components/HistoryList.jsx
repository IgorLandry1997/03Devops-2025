export default function HistoryList({ history, onSelect }) {
  return (
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
            onClick={() => onSelect(item)}
          >
            {item.city} — {item.temperature} °C — {item.description}
          </button>
        </li>
      ))}
    </ul>
  );
}
