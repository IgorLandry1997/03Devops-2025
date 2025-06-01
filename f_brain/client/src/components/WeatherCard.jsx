// src/components/WeatherCard.jsx
import "./WeatherCard.css";

function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <div className="top-info">
        <div>
          <h2>{data.city}</h2>
          <p>{data.country}</p>
          <div className="condition">
            <span>{data.icon}</span>
            <span>{data.condition}</span>
          </div>
        </div>
        <div className="temperature">
          <h2>{data.temp}</h2>
          <p>Feels like {data.feels_like}</p>
          <p>H: {data.high} L: {data.low}</p>
        </div>
      </div>

      <div className="details-grid">
        <div>Wind<br />{data.wind}</div>
        <div>Humidity<br />{data.humidity}</div>
        <div>Visibility<br />{data.visibility}</div>
        <div>Pressure<br />{data.pressure}</div>
      </div>

      <div className="sun-times">
        <div>🌅 Sunrise<br />{data.sunrise}</div>
        <div>🌇 Sunset<br />{data.sunset}</div>
      </div>
    </div>
  );
}

export default WeatherCard;
