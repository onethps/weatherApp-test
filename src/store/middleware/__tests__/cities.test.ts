import axios, { AxiosResponse } from 'axios';

import { mockCitiesListResponse } from '../../../mock';
import { setupStore } from '../..';
import { fetchCitiesList, updateWeatherInfo } from '../cities';

jest.mock('axios');

describe('fetchCitiesList thunk', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be fulfilled', async () => {
    const mockResponse = {
      data: mockCitiesListResponse,
      status: 200,
      statusText: 'ok',
    } as AxiosResponse;

    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    const thunk = fetchCitiesList();
    const dispatch = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await thunk(dispatch, () => {}, undefined);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('cities/fetchCitiesList/pending');
    expect(end[0].type).toBe('cities/fetchCitiesList/fulfilled');
    expect(end[0].payload[0][0].name).toBe('Kyiv');
  });
  it('should be rejected', async () => {
    const mockResponse = {
      data: mockCitiesListResponse,
      status: 200,
      statusText: 'ok',
    } as AxiosResponse;

    jest.spyOn(axios, 'get').mockRejectedValue(mockResponse);

    const thunk = fetchCitiesList();
    const dispatch = jest.fn();

    await thunk(dispatch, () => {}, undefined);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('cities/fetchCitiesList/pending');
    expect(end[0].type).toBe('cities/fetchCitiesList/rejected');
    expect(end[0].payload).toBe('Something wrong, cities not fetched');
  });
});
////////////////////
describe('updateWeatherInfo thunk', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('city should be updated', async () => {
    const store = setupStore();
    store.dispatch(
      fetchCitiesList.fulfilled([mockCitiesListResponse[0]], 'requestId', undefined),
    );

    expect(store.getState().home.cityList[0].main.temp).toEqual(1);

    const payload = {
      id: '1',
      name: 'Kyiv',
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
        temp: 12,
        humidity: 1,
        pressure: 1,
        temp_max: 1,
        temp_min: 1,
      },
      loading: false,
      wind: { speed: 1 },
      visibility: 1,
      dt: 1,
    };

    const mockResponse = {
      data: payload,
      status: 200,
      statusText: 'ok',
    } as AxiosResponse;

    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    const thunk = updateWeatherInfo({ name: 'Kyiv' });

    await thunk(store.dispatch, () => store.getState(), undefined);

    expect(store.getState().home.cityList[0].main.temp).toEqual(payload.main.temp);
  });
  it('city should not be updated', async () => {
    const store = setupStore();
    store.dispatch(
      fetchCitiesList.fulfilled([mockCitiesListResponse[0]], 'requestId', undefined),
    );

    expect(store.getState().home.cityList[0].main.temp).toEqual(1);

    const payload = {
      id: '1',
      name: 'Kyiv',
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
        temp: 12,
        humidity: 1,
        pressure: 1,
        temp_max: 1,
        temp_min: 1,
      },
      loading: false,
      wind: { speed: 1 },
      visibility: 1,
      dt: 1,
    };

    const mockResponse = {
      data: payload,
      status: 200,
      statusText: 'ok',
    } as AxiosResponse;

    jest.spyOn(axios, 'get').mockRejectedValue(mockResponse);

    const thunk = updateWeatherInfo({ name: 'Kyiv' });

    await thunk(store.dispatch, () => store.getState(), undefined);

    expect(store.getState().home.cityList[0].main.temp).toEqual(1);
  });
});
