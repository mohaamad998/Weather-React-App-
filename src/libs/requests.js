import { CustomeError } from './error';

const WEATHER_API = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '759c1173242ceb2ab12f56fb8f4f5cfb';
const CITIES_API_URL = `https://restcountries.com/v3.1/name`;

// load countries
export const loadGeoCities = async (searchInput) => {
  const res = await fetch(`${CITIES_API_URL}/${searchInput}`);
  if (!res.ok) throw new CustomeError(res.statusText, res.status);

  const resData = await res.json();

  const results = resData
    .map((country) => {
      if (country.population < 1000000) return null;
      const {
        name: { common: name },
        capital: [capital],
        capitalInfo: { latlng },
      } = country;
      return { name, capital, latlng };
    })
    .filter(Boolean)
    .slice(0, 10);
  return results;
};

//
export const loadWeatherData = async (lat, lng) => {
  console.log('called');
  const fetchWeather =
    fetch(`${WEATHER_API}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric
  `);
  const fetchForecast = fetch(
    `${WEATHER_API}/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric
    `
  );

  const res = await Promise.all([fetchWeather, fetchForecast]);

  if (!res[0].ok) throw new CustomeError(res[0].statusText, res[0].status);
  if (!res[1].ok) throw new CustomeError(res[1].statusText, res[1].statusText);

  const weather = await res[0].json();
  const forecast = await res[1].json();

  return [weather, forecast];
};
