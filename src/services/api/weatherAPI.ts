import axios from 'axios';

import { CityListState } from '../../store/slices/cities';
import { CityDetailsData } from '../../types/types';

export const weatherAPI = {
  fetchCity(city: string) {
    return axios.get<CityListState>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`,
    );
  },
  fetchDetails(city: string) {
    return axios.get<CityDetailsData>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`,
    );
  },
};
