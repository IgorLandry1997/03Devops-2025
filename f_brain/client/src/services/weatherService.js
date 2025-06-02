const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeatherByCity(city) {
  try {
    const res = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!res.ok) throw new Error("Not found");
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err.message);
    return null;
  }
}
