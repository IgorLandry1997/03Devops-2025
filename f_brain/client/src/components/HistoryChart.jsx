import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./HistoryChart.css";

export default function HistoryChart({ history }) {
  if (!history || history.length === 0) return null;

  const lastEntries = history.slice(-5); // last 5 searches

  return (
    <div className="history-chart">
      <h3>📊 Température des dernières recherches</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={lastEntries}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="city" />
          <YAxis unit="°C" />
          <Tooltip />
          <Bar dataKey="temperature" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
