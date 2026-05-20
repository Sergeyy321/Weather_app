import React from 'react';

interface WeatherIconProps {
  condition: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 48 }) => {
  const cond = condition.toLowerCase();


  if (cond.includes('rain') || cond.includes('drizzle')) {
    return (
      <span style={{ fontSize: `${size}px`, filter: 'drop-shadow(0 2px 8px rgba(0,180,216,0.4))' }}>
        🌧️
      </span>
    );
  }
  if (cond.includes('snow')) {
    return (
      <span style={{ fontSize: `${size}px`, filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.6))' }}>
        ❄️
      </span>
    );
  }
  if (cond.includes('clear')) {
    return (
      <span style={{ fontSize: `${size}px`, filter: 'drop-shadow(0 2px 10px rgba(255,213,0,0.6))', display: 'inline-block', animation: 'spin 20s linear infinite' }}>
        ☀️
      </span>
    );
  }
  if (cond.includes('thunderstorm')) {
    return (
      <span style={{ fontSize: `${size}px`, filter: 'drop-shadow(0 2px 8px rgba(157,78,221,0.5))' }}>
        ⛈️
      </span>
    );
  }
  
  // Дефолт — облака
  return (
    <span style={{ fontSize: `${size}px`, filter: 'drop-shadow(0 2px 6px rgba(255,255,255,0.3))' }}>
      ☁️
    </span>
  );
};