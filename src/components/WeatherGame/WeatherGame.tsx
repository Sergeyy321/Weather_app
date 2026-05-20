import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../../services/api';
import type { WeatherData } from '../../types/weather';

// Quest data structure with localized English hints
const QUESTS = [
  { correct: 'Yakutsk', fakes: ['Cairo', 'Singapore'], Hint: 'Built on continuous permafrost. It holds records for the most extreme winter temperatures.' },
  { correct: 'Dubai', fakes: ['London', 'Reykjavik'], Hint: 'A futuristic metropolis built right in the middle of the Arabian Desert.' },
  { correct: 'Reykjavik', fakes: ['Miami', 'Astana'], Hint: 'The world\'s northernmost capital city, located just below the Arctic Circle.' },
  { correct: 'Singapore', fakes: ['Yakutsk', 'London'], Hint: 'An island city-state located almost directly on the Earth\'s equator. Eternal summer.' },
  { correct: 'Cairo', fakes: ['Manaus', 'Reykjavik'], Hint: 'An ancient cradle of civilization, split by the Nile and bordered by endless sands.' },
  { correct: 'London', fakes: ['Dubai', 'Singapore'], Hint: 'Famous for its historic charm, red buses, and notoriously unpredictable, cloudy days.' },
  { correct: 'Miami', fakes: ['Astana', 'Yakutsk'], Hint: 'Sandy beaches, heavy ocean breezes, and a hot tropical climate prone to sudden storms.' }
];

interface WeatherGameProps {
  onGameWeatherLoad: (condition: string) => void;
}

export const WeatherGame: React.FC<WeatherGameProps> = ({ onGameWeatherLoad }) => {
  const [targetWeather, setTargetWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(() => {
    return Number(localStorage.getItem('weather_game_score')) || 0;
  });
  const [currentHint, setCurrentHint] = useState('');

  // Pro-level meteorologist ranking system
  const getRank = (xp: number) => {
    if (xp >= 500) return '⚡ Storm Bringer (Master)';
    if (xp >= 300) return '🛰️ Chief Forecaster';
    if (xp >= 100) return '🌤️ Weather Analyst';
    return '🌱 Weather Station Intern';
  };

  const startNewRound = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    
    const quest = QUESTS[Math.floor(Math.random() * QUESTS.length)];
    setCurrentHint(quest.Hint);
    
    try {
      const data = await fetchWeather(quest.correct);
      setTargetWeather(data);
      onGameWeatherLoad(data.weather[0].main);

      // Shuffle options using clean JS sorting
      const shuffledOptions = [data.name, ...quest.fakes].sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    } catch (err) {
      console.error('Failed to generate game round:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleAnswerClick = (chosenCity: string) => {
    if (selectedAnswer || !targetWeather) return;

    setSelectedAnswer(chosenCity);
    const correctName = targetWeather.name;
    const win = chosenCity.toLowerCase() === correctName.toLowerCase();
    setIsCorrect(win);

    if (win) {
      const newScore = score + 100;
      setScore(newScore);
      localStorage.setItem('weather_game_score', String(newScore));
    }
  };

  const handleResetScore = () => {
    if (window.confirm('Are you sure you want to reset your meteorological career?')) {
      setScore(0);
      localStorage.setItem('weather_game_score', '0');
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      {/* Game Dashboard Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(255,255,255,0.1)' 
      }}>
        <div>
          <span style={{ display: 'block', fontSize: '11px', opacity: 0.6 }}>Your Status:</span>
          <strong style={{ color: '#ffd700', fontSize: '15px' }}>{getRank(score)}</strong>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ background: '#ffd700', color: '#000', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' }}>
            {score} XP
          </span>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '10px 0', opacity: 0.8 }}>
          📡 Intercepting satellite data...
        </div>
      ) : targetWeather ? (
        <div>
          {/* Weather Telemetry Briefing */}
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '16px', marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#64ffda', fontSize: '13px', letterSpacing: '0.5px' }}>
              🕵️‍♂️ ANOMALOUS TELEMETRY REPORT:
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
              <div>🌡️ Temperature: <strong>{Math.round(targetWeather.main.temp)}°C</strong></div>
              <div>💧 Humidity: <strong>{targetWeather.main.humidity}%</strong></div>
              <div>💨 Wind Speed: <strong>{targetWeather.wind.speed} m/s</strong></div>
              <div>🌌 Sky Conditions: <strong style={{ textTransform: 'capitalize' }}>{targetWeather.weather[0].description}</strong></div>
            </div>

            <div style={{ margin: '15px 0 0 0', fontSize: '13px', opacity: 0.8, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
              💡 <strong>Intel Briefcase:</strong> {currentHint}
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '15px', fontWeight: 500, marginBottom: '15px' }}>
            Where on Earth were these metrics recorded?
          </p>

          {/* Answer Choice Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {options.map((cityOption) => {
              let btnBg = 'rgba(255, 255, 255, 0.1)';
              let borderStyle = '1px solid rgba(255,255,255,0.2)';
              
              if (selectedAnswer) {
                if (cityOption === targetWeather.name) {
                  btnBg = 'rgba(46, 204, 113, 0.4)'; // Correct variant (Green)
                  borderStyle = '1px solid #2ecc71';
                } else if (selectedAnswer === cityOption && !isCorrect) {
                  btnBg = 'rgba(231, 76, 60, 0.4)'; // Wrong picked variant (Red)
                  borderStyle = '1px solid #e74c3c';
                }
              }

              return (
                <button
                  key={cityOption}
                  onClick={() => handleAnswerClick(cityOption)}
                  disabled={!!selectedAnswer}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: borderStyle,
                    backgroundColor: btnBg,
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: selectedAnswer ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                >
                  📍 {cityOption}
                </button>
              );
            })}
          </div>

          {/* Feedback Display System */}
          {selectedAnswer && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 15px 0' }}>
                {isCorrect ? '🎉 Outstanding Work! +100 XP' : `❌ Signal Lost! It was ${targetWeather.name}`}
              </p>
              <button
                onClick={startNewRound}
                style={{
                  padding: '12px 25px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#ffd700',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '15px'
                }}
              >
                Next Anomaly ➡️
              </button>
            </div>
          )}
        </div>
      ) : null}

      {/* Clear Career Progress Button */}
      {score > 0 && (
        <button 
          onClick={handleResetScore}
          style={{ 
            display: 'block', margin: '30px auto 0 auto', background: 'none', border: 'none', 
            color: '#ff7675', fontSize: '11px', cursor: 'pointer', opacity: 0.6 
          }}
        >
          Reset Meteorological Career
        </button>
      )}
    </div>
  );
};