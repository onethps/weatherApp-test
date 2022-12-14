import { CityListState } from './../store/slices/cities';
import { CityDetailsData } from './../types/types';

export const mockCitiesListResponse: CityListState[] = [
  {
    id: '1',
    name: 'Kyiv',
    error: '',
    weather: [
      {
        description: 'cloud',
        icon: 'cloud',
        id: 11,
        main: 'cloud',
      },
    ],
    main: {
      feels_like: 1,
      temp: 1,
      humidity: 1,
      pressure: 1,
      temp_max: 1,
      temp_min: 1,
    },
    loading: false,
    wind: { speed: 1 },
    visibility: 1,
    dt: 1,
  },
  {
    id: '2',
    name: 'Kharkiv',
    error: '',
    weather: [
      {
        description: 'cloud',
        icon: 'cloud',
        id: 11,
        main: 'cloud',
      },
    ],
    main: {
      feels_like: 1,
      temp: 1,
      humidity: 1,
      pressure: 1,
      temp_max: 1,
      temp_min: 1,
    },
    loading: false,
    wind: { speed: 1 },
    visibility: 1,
    dt: 1,
  },
];

export const mockDetailsData: CityDetailsData = {
  city: {
    id: 1,
    name: 'Kyiv',
    sunrise: 1,
    sunset: 1,
    timezone: 1,
  },
  list: [
    {
      dt_txt: '1',
      sys: { pod: '2' },
      weather: [
        {
          description: 'cloud',
          icon: 'cloud',
          id: 11,
          main: 'cloud',
        },
      ],
      main: {
        feels_like: 1,
        temp: 1,
        humidity: 1,
        pressure: 1,
        temp_max: 1,
        temp_min: 1,
      },
      wind: { speed: 1 },
      visibility: 1,
      dt: 1,
    },
  ],
};

const placesResponse = [{ city: 'Kyiv' }, { city: 'Lviv' }, { city: 'Amsterdam' }];
