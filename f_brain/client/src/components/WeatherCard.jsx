import "./WeatherCard.css";

export default function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <h2>{data.name}</h2>
      <p>{data.weather[0].description}</p>
      <div className="temperature">{Math.round(data.main.temp)}°C</div>
      <p>Feels like {Math.round(data.main.feels_like)}°C</p>
      <div className="metrics">
        <div><strong>Humidity:</strong> {data.main.humidity}%</div>
        <div><strong>Pressure:</strong> {data.main.pressure} hPa</div>
        <div><strong>Wind:</strong> {data.wind.speed} m/s</div>
        <div><strong>Visibility:</strong> {data.visibility / 1000} km</div>
      </div>
    </div>
  );
}
