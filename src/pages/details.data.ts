import pressureIcon from '../assets/gauge.png';
import humidityIcon from '../assets/humidity.png';
import visibilityIcon from '../assets/low-visibility.png';
import windSpeedIcon from '../assets/wind.png';
import { CityDetailsData } from './../types/types';

export const detailsHighLights = (currentCity: CityDetailsData) => [
  {
    id: 1,
    title: 'Wind Speed',
    data: currentCity.list[0].wind.speed + ' m/s',
    icon: windSpeedIcon,
  },
  {
    id: 2,
    title: 'Pressure',
    data: Math.floor(currentCity.list[0].main.pressure / 1.333) + ' mm',
    icon: pressureIcon,
  },
  {
    id: 3,
    title: 'Humidity',
    data: currentCity.list[0].main.humidity + ' %',
    icon: humidityIcon,
  },
  {
    id: 4,
    title: 'Visibility',
    data: (currentCity.list[0].visibility / 1000).toFixed(2) + ' km',
    icon: visibilityIcon,
  },
];
