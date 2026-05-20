import type { WeatherData, ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';


if (!API_KEY) {
  console.warn('Warning: VITE_WEATHER_API_KEY is missing in your environment variables.');
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    
    if (!response.ok) {
      if (response.status === 404) throw new Error('City not found. Please check the city name.');
      if (response.status === 401) throw new Error('Authorization error. Please check your API key.');
      throw new Error('Failed to load weather data.');
    }
    
    return await response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error('Something went wrong while fetching the weather data.');
  }
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
    
    if (!response.ok) {
      if (response.status === 404) throw new Error('Forecast not found. Please check the city name.');
      throw new Error('Something went wrong while fetching the forecast.');
    }
    
    return await response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error('Something went wrong while fetching the forecast');
  }
};