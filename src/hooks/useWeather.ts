import { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast } from '../services/api';
import type { WeatherData, ForecastData } from '../types/weather';

export const useWeather = (initialCity: string = 'Москва') => {
  const [city, setCity] = useState<string>(initialCity);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      if (!city.trim()) return;

      setLoading(true);
      setError(null);

      try {

        const [weatherRes, forecastRes] = await Promise.all([
          fetchWeather(city),
          fetchForecast(city),
        ]);

        setWeather(weatherRes);
        setForecast(forecastRes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [city]);

  return { weather, forecast, loading, error, updateCity: setCity };
};