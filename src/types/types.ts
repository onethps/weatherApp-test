export interface MainCard {
  weather: Weather[];
  main: Main;
  wind: Wind;
  visibility: number;
  dt: number;
}

interface Main {
  feels_like: number;
  temp: number;
  humidity: number;
  pressure: number;
  temp_max: number;
  temp_min: number;
}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface Wind {
  speed: number;
}

interface forecastPerDay extends MainCard {
  dt_txt: string;
  sys: { pod: string };
}

interface CityDetails {
  id: number;
  name: string;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface CityDetailsData {
  city: CityDetails;
  list: forecastPerDay[];
}
