import React, { useState } from 'react';

// 30 стратегических мегаполисов мира с точными относительными SVG-координатами
const MAP_POINTS = [
  // --- NORTH AMERICA ---
  { name: 'New York', country: 'USA', x: 25, y: 36, query: 'New York' },
  { name: 'Los Angeles', country: 'USA', x: 15, y: 40, query: 'Los Angeles' },
  { name: 'Toronto', country: 'Canada', x: 24, y: 31, query: 'Toronto' },
  { name: 'Mexico City', country: 'Mexico', x: 18, y: 50, query: 'Mexico City' },
  { name: 'Las Vegas', country: 'USA', x: 14, y: 37, query: 'Las Vegas' },

  // --- SOUTH AMERICA ---
  { name: 'Rio de Janeiro', country: 'Brazil', x: 35, y: 72, query: 'Rio de Janeiro' },
  { name: 'Buenos Aires', country: 'Argentina', x: 31, y: 82, query: 'Buenos Aires' },
  { name: 'Lima', country: 'Peru', x: 23, y: 63, query: 'Lima' },
  { name: 'Manaus', country: 'Brazil', x: 29, y: 58, query: 'Manaus' },

  // --- EUROPE ---
  { name: 'London', country: 'UK', x: 47, y: 28, query: 'London' },
  { name: 'Paris', country: 'France', x: 49, y: 31, query: 'Paris' },
  { name: 'Berlin', country: 'Germany', x: 52, y: 29, query: 'Berlin' },
  { name: 'Rome', country: 'Italy', x: 52, y: 36, query: 'Rome' },
  { name: 'Reykjavik', country: 'Iceland', x: 42, y: 18, query: 'Reykjavik' },

  // --- AFRICA ---
  { name: 'Cairo', country: 'Egypt', x: 57, y: 45, query: 'Cairo' },
  { name: 'Cape Town', country: 'South Africa', x: 54, y: 81, query: 'Cape Town' },
  { name: 'Nairobi', country: 'Kenya', x: 59, y: 60, query: 'Nairobi' },
  { name: 'Casablanca', country: 'Morocco', x: 44, y: 41, query: 'Casablanca' },

  // --- ASIA & MIDDLE EAST ---
  { name: 'Moscow', country: 'Russia', x: 58, y: 24, query: 'Moscow' },
  { name: 'Dubai', country: 'UAE', x: 63, y: 46, query: 'Dubai' },
  { name: 'Tokyo', country: 'Japan', x: 88, y: 38, query: 'Tokyo' },
  { name: 'Beijing', country: 'China', x: 80, y: 34, query: 'Beijing' },
  { name: 'Mumbai', country: 'India', x: 70, y: 51, query: 'Mumbai' },
  { name: 'Singapore', country: 'Singapore', x: 78, y: 61, query: 'Singapore' },
  { name: 'Bangkok', country: 'Thailand', x: 77, y: 53, query: 'Bangkok' },
  { name: 'Jakarta', country: 'Indonesia', x: 80, y: 66, query: 'Jakarta' },
  { name: 'Yakutsk', country: 'Russia', x: 84, y: 16, query: 'Yakutsk' },

  // --- OCEANIA ---
  { name: 'Sydney', country: 'Australia', x: 92, y: 82, query: 'Sydney' },
  { name: 'Melbourne', country: 'Australia', x: 90, y: 85, query: 'Melbourne' },
  { name: 'Auckland', country: 'New Zealand', x: 98, y: 86, query: 'Auckland' }
];

interface WeatherMapProps {
  onSelectCity: (cityName: string) => void;
  activeCity?: string;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ onSelectCity, activeCity }) => {
  const [hoveredPoint, setHoveredPoint] = useState<typeof MAP_POINTS[0] | null>(null);

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <p style={{ margin: '0 0 15px 0', fontSize: '13px', opacity: 0.8, textAlign: 'center' }}>
        📡 Select from 30 global telemetry stations to synchronize climate radar:
      </p>

      <div style={{
        position: 'relative',
        width: '100%',
        background: 'rgba(10, 12, 18, 0.6)',
        borderRadius: '20px',
        padding: '12px',
        border: '1px solid rgba(255,255,255,0.12)',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4)'
      }}>
        
        <svg viewBox="0 0 100 95" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Технологическая координатная сетка */}
          <g stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" fill="none">
            {Array.from({ length: 19 }).map((_, i) => {
              const pos = (i + 1) * 5;
              return (
                <React.Fragment key={pos}>
                  <line x1={pos} y1="0" x2={pos} y2="100" />
                  <line x1="0" y1={pos} x2="100" y2={pos} />
                </React.Fragment>
              );
            })}
          </g>

          {/* Улучшенные, более детализированные векторные контуры континентов */}
          <g fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.25">
            {/* North America & Greenland */}
            <path d="M 12 18 L 28 15 L 38 12 L 40 22 L 30 25 L 35 34 L 28 35 L 24 45 L 14 51 L 8 45 L 12 30 Z" />
            <path d="M 36 8 L 45 10 L 41 18 L 34 16 Z" /> 
            {/* South America */}
            <path d="M 16 52 L 24 50 L 32 55 L 37 68 L 35 78 L 29 90 L 26 90 L 21 70 L 16 58 Z" />
            {/* Africa */}
            <path d="M 42 42 L 54 40 L 59 45 L 63 52 L 60 62 L 55 78 L 52 82 L 48 68 L 43 56 Z" />
            {/* Eurasia */}
            <path d="M 44 38 L 46 25 L 56 22 L 68 12 L 88 14 L 94 22 L 90 38 L 84 48 L 78 56 L 68 52 L 60 42 L 50 42 Z" />
            {/* United Kingdom & Japan & Islands */}
            <path d="M 44 24 L 46 27 L 44 29 Z" />
            <path d="M 88 34 L 90 38 L 87 44 Z" />
            <path d="M 76 58 L 80 59 L 78 63 Z" />
            {/* Australia */}
            <path d="M 80 74 L 92 73 L 94 82 L 87 86 L 81 81 Z" />
          </g>

          {/* Слой рендеринга метео-маркеров */}
          {MAP_POINTS.map((point) => {
            const isActive = activeCity?.toLowerCase() === point.name.toLowerCase();
            const isHovered = hoveredPoint?.name === point.name;
            
            return (
              <g 
                key={point.name}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectCity(point.query)}
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Эффект пульсации для активного выбранного города */}
                {isActive && (
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="3.5" 
                    fill="none" 
                    stroke="#00f5d4" 
                    strokeWidth="0.4"
                    style={{ 
                      transformOrigin: `${point.x}px ${point.y}px`, 
                      animation: 'pulse 2s infinite ease-in-out' 
                    }}
                  />
                )}

                {/* Дополнительная подсветка при наведении */}
                {isHovered && (
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="2.5" 
                    fill="none" 
                    stroke="#ffd700" 
                    strokeWidth="0.3"
                  />
                )}
                
                {/* Ядро маркера */}
                <circle 
                  cx={point.x} 
                  cy={point.y} 
                  r={isActive ? "1.4" : "1.0"} 
                  fill={isActive ? "#00f5d4" : (isHovered ? "#ffd700" : "rgba(255, 255, 255, 0.75)")}
                  stroke="rgba(0,0,0,0.8)"
                  strokeWidth="0.2"
                  style={{ transition: 'fill 0.2s, r 0.2s' }}
                />
              </g>
            );
          })}
        </svg>

        {/* Информационный HUD-дисплей */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          background: 'rgba(6, 8, 14, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '10px 14px',
          borderRadius: '10px',
          fontSize: '11px',
          fontFamily: 'monospace',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.08)',
          minHeight: '36px',
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}>
          {hoveredPoint ? (
            <>
              <span style={{ color: '#ffd700' }}>▶ NODE: {hoveredPoint.name.toUpperCase()} ({hoveredPoint.country})</span>
              <span style={{ opacity: 0.6 }}>COORDS: X:{hoveredPoint.x} Y:{hoveredPoint.y}</span>
            </>
          ) : activeCity ? (
            <>
              <span style={{ color: '#00f5d4', fontWeight: 'bold' }}>🛰️ TARGET LINK STABLE: {activeCity.toUpperCase()}</span>
              <span style={{ color: '#00f5d4', opacity: 0.7 }}>[RECEIVING DATA]</span>
            </>
          ) : (
            <span style={{ opacity: 0.4, letterSpacing: '0.5px' }}>📡 SCANNING GLOBAL TELEMETRY MATRIX... OVERLAY ACTIVE</span>
          )}
        </div>
      </div>
    </div>
  );
};