import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchForm } from './components/SearchForm';
import { WeatherAmbient } from './components/WeatherAmbient/WeatherAmbient';
import { WeatherGame } from './components/WeatherGame/WeatherGame';
import { WeatherMap } from './components/WeatherMap';
import { WeatherIcon } from './components/WeatherIcon/WeatherIcon';
import { generateHourlyForecast } from './utils/interpolateForecast';

function App() {
  // Navigation tabs: 'radar' | 'map' | 'game'
  const [activeTab, setActiveTab] = useState<'radar' | 'map' | 'game'>('radar');
  const [gameCondition, setGameCondition] = useState<string>('Clouds');
  
  // Custom smart hook handling fetch actions, loaders, and error states
  const { weather, forecast, loading, error, updateCity } = useWeather('London');

  // Compute background weather condition layer depending on current tab context
  const currentCondition = activeTab === 'game' ? gameCondition : (weather?.weather[0].main || 'Clouds');

  return (
    <>
      {/* Dynamic atmospheric ambient canvas layer */}
      <WeatherAmbient condition={loading ? 'Clouds' : currentCondition} />

      <div style={{ 
        maxWidth: '650px', 
        margin: '40px auto', 
        padding: '0 20px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' 
      }}>
        
        {/* TELEMETRY NAVIGATION CONTROLS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('radar')}
            style={{
              flex: 1, padding: '12px 10px', borderRadius: '12px', border: 'none',
              backgroundColor: activeTab === 'radar' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
              color: '#fff', fontWeight: 'bold', cursor: 'pointer', backdropFilter: 'blur(5px)',
              transition: 'all 0.2s ease', border: activeTab === 'radar' ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent'
            }}
          >
            🌤️ Climate Radar
          </button>
          <button 
            onClick={() => setActiveTab('map')}
            style={{
              flex: 1, padding: '12px 10px', borderRadius: '12px', border: 'none',
              backgroundColor: activeTab === 'map' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
              color: '#fff', fontWeight: 'bold', cursor: 'pointer', backdropFilter: 'blur(5px)',
              transition: 'all 0.2s ease', border: activeTab === 'map' ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent'
            }}
          >
            🗺️ World Map
          </button>
          <button 
            onClick={() => setActiveTab('game')}
            style={{
              flex: 1, padding: '12px 10px', borderRadius: '12px', border: 'none',
              backgroundColor: activeTab === 'game' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
              color: '#fff', fontWeight: 'bold', cursor: 'pointer', backdropFilter: 'blur(5px)',
              transition: 'all 0.2s ease', border: activeTab === 'game' ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent'
            }}
          >
            🎮 Detective Mode
          </button>
        </div>

        {/* CORE GLASSMORPHISM DISPLAY HUB */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.16)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '28px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.25)',
          color: '#fff',
          transition: 'all 0.3s'
        }}>
          
          {/* SCREEN ONE: CLIMATE WEATHER RADAR */}
          {activeTab === 'radar' && (
            <>
              <h1 style={{ marginTop: 0, fontSize: '26px', letterSpacing: '-0.5px' }}>Weather Intelligence</h1>
              <SearchForm onSearch={updateCity} />

              {loading && <p style={{ opacity: 0.8, fontSize: '15px' }}>Scanning atmospheric matrix telemetry...</p>}
              {error && (
                <div style={{ 
                  padding: '12px', backgroundColor: 'rgba(231, 76, 60, 0.25)', 
                  border: '1px solid #e74c3c', borderRadius: '12px', marginBottom: '20px' 
                }}>
                  ⚠️ {error}
                </div>
              )}

              {weather && !loading && (
                <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h2 style={{ margin: '0 0 5px 0', fontSize: '32px', fontWeight: 600 }}>{weather.name}</h2>
                      <span style={{ opacity: 0.7, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>
                        {weather.sys.country}
                      </span>
                    </div>
                    <WeatherIcon condition={weather.weather[0].main} size={54} />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '25px', margin: '20px 0' }}>
                    <span style={{ fontSize: '76px', fontWeight: 700, lineHeight: 1, letterSpacing: '-2px' }}>
                      {Math.round(weather.main.temp)}°
                    </span>
                    <div>
                      <p style={{ textTransform: 'capitalize', margin: 0, fontSize: '18px', fontWeight: 500 }}>
                        {weather.weather[0].description}
                      </p>
                      <p style={{ margin: '4px 0 0 0', opacity: 0.8, fontSize: '14px' }}>
                        Feels like {Math.round(weather.main.feels_like)}°
                      </p>

                      {/* Day / Night Cycle Evaluation Engine */}
                      {(() => {
                        const isDay = weather.dt >= weather.sys.sunrise && weather.dt < weather.sys.sunset;
                        const formatTime = (ts: number) => {
                          return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        };

                        return isDay ? (
                          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#ffca3a', fontWeight: 500 }}>
                            ☀️ Daytime — Sunset at {formatTime(weather.sys.sunset)}
                          </p>
                        ) : (
                          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#1982c4', fontWeight: 500 }}>
                            🌙 Nighttime — Sunrise at {formatTime(weather.sys.sunrise)}
                          </p>
                        );
                      })()}
                    </div>
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '15px', 
                    marginTop: '25px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(255,255,255,0.15)' 
                  }}>
                    <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ display: 'block', fontSize: '12px', opacity: 0.6, marginBottom: '2px' }}>Wind Speed</span>
                      <span style={{ fontSize: '17px', fontWeight: 600 }}>💨 {weather.wind.speed} m/s</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ display: 'block', fontSize: '12px', opacity: 0.6, marginBottom: '2px' }}>Humidity</span>
                      <span style={{ fontSize: '17px', fontWeight: 600 }}>💧 {weather.main.humidity}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* HIGH-END INTERPOLATED HOURLY FORECAST SLIDER */}
              {forecast && !loading && (
                <div style={{ marginTop: '30px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', opacity: 0.9 }}>
                    ⏱️ Real-time Hourly Telemetry
                  </h3>
                  <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {generateHourlyForecast(forecast.list).slice(0, 8).map((item, index) => (
                      <div 
                        key={item.dt} 
                        style={{ 
                          padding: '14px 12px', 
                          background: index % 3 === 0 ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.06)', 
                          borderRadius: '16px', 
                          minWidth: '82px', 
                          textAlign: 'center',
                          border: index % 3 === 0 ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.04)',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}
                      >
                        <span style={{ fontSize: '12px', opacity: 0.7, fontWeight: 500 }}>
                          {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div style={{ margin: '8px 0' }}>
                          <WeatherIcon condition={item.weather[0].main} size={24} />
                        </div>
                        <p style={{ fontWeight: 'bold', margin: '0', fontSize: '18px' }}>
                          {Math.round(item.main.temp)}°
                        </p>
                        {index % 3 !== 0 && (
                          <span style={{ fontSize: '9px', opacity: 0.4, display: 'block', marginTop: '3px', letterSpacing: '0.2px' }}>
                            simulated
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* SCREEN TWO: INTERACTIVE SATELLITE WORLD MAP MATRIX */}
          {activeTab === 'map' && (
            <>
              <h1 style={{ marginTop: 0, fontSize: '26px', letterSpacing: '-0.5px' }}>Global Telemetry Matrix</h1>
              <WeatherMap 
                onSelectCity={(selectedCity) => {
                  updateCity(selectedCity);  
                  setActiveTab('radar'); // Redirect immediately back to view ambient shifts
                }} 
                activeCity={weather?.name}
              />
            </>
          )}

          {/* SCREEN THREE: GEOGRAPHICAL DETECTIVE MINIGAME */}
          {activeTab === 'game' && (
            <>
              <h1 style={{ marginTop: 0, fontSize: '26px', letterSpacing: '-0.5px' }}>Weather Inspector</h1>
              <WeatherGame onGameWeatherLoad={setGameCondition} />
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default App;