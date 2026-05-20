import React from 'react';
import './WeatherAmbient.css';

interface WeatherAmbientProps {
  condition: string;
}

export const WeatherAmbient: React.FC<WeatherAmbientProps> = ({ condition }) => {
  const normalizedCondition = condition.toLowerCase();

  // Генерируем массив для капель дождя или снежинок
  const particles = Array.from({ length: 40 });

  if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
    return (
      <div className="ambient-layer rain-bg">
        <div className="rain-container">
          {particles.map((_, i) => (
            <div 
              key={i} 
              className="drop" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                opacity: Math.random()
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (normalizedCondition.includes('snow')) {
    return (
      <div className="ambient-layer snow-bg">
        <div className="snow-container">
          {particles.map((_, i) => (
            <div 
              key={i} 
              className="snowflake" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
                transform: `scale(${0.3 + Math.random() * 0.7})`,
                opacity: Math.random()
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (normalizedCondition.includes('clear')) {
    return (
      <div className="ambient-layer sunny-bg">
        <div className="sun-ray" />
      </div>
    );
  }


  return <div className="ambient-layer cloudy-bg" />;
};