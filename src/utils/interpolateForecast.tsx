import type { ForecastItem } from '../types/weather';

export const generateHourlyForecast = (threeHourForecast: ForecastItem[]): ForecastItem[] => {
  if (threeHourForecast.length < 2) return threeHourForecast;

  const hourlyList: ForecastItem[] = [];


  for (let i = 0; i < threeHourForecast.length - 1; i++) {
    const current = threeHourForecast[i];
    const next = threeHourForecast[i + 1];

    const currentTemp = current.main.temp;
    const nextTemp = next.main.temp;
    

    const tempStep = (nextTemp - currentTemp) / 3;


    hourlyList.push(current);

    hourlyList.push({
      ...current,
      dt: current.dt + 3600,
      main: {
        ...current.main,
        temp: currentTemp + tempStep,
        feels_like: current.main.feels_like + (next.main.feels_like - current.main.feels_like) / 3
      },
      dt_txt: new Date((current.dt + 3600) * 1000).toISOString()
    });

  
    hourlyList.push({
      ...current,
      dt: current.dt + 7200,
      main: {
        ...current.main,
        temp: currentTemp + (tempStep * 2),
        feels_like: current.main.feels_like + ((next.main.feels_like - current.main.feels_like) / 3) * 2
      },
      dt_txt: new Date((current.dt + 7200) * 1000).toISOString()
    });
    
   
    if (hourlyList.length >= 12) break;
  }

  return hourlyList;
}