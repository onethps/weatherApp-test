import axios, { AxiosResponse } from 'axios';
import React from 'react';

import { mockDetailsData } from './../../../mock/mockResponse';
import { getDetailsForecastData } from './../cityDetails';

jest.mock('axios');

describe('details should be fetched', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be fulfilled', async () => {
    const mockResponse = {
      data: mockDetailsData,
      status: 200,
      statusText: 'ok',
    } as AxiosResponse;

    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    const thunk = getDetailsForecastData({ name: 'Kyiv' });
    const dispatch = jest.fn();

    await thunk(dispatch, () => {}, undefined);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('cities/getDetailsForecastData/pending');
    expect(end[0].type).toBe('cities/getDetailsForecastData/fulfilled');
    expect(end[0].payload.city.name).toBe('Kyiv');
  });

  it('should be rejected', async () => {
    const mockResponse = {
      data: mockDetailsData,
      status: 200,
      statusText: 'ok',
    } as AxiosResponse;

    jest.spyOn(axios, 'get').mockRejectedValue(mockResponse);

    const thunk = getDetailsForecastData({ name: 'Kyiv' });
    const dispatch = jest.fn();

    await thunk(dispatch, () => {}, undefined);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('cities/getDetailsForecastData/pending');
    expect(end[0].type).toBe('cities/getDetailsForecastData/rejected');
    expect(end[0].payload).toBe('Something wrong, details not updated');
  });
});
