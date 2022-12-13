import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { weatherAPI } from '../../services/api/weatherAPI';
import { CityDetailsData } from './../../types/types';

export const DAILY_THREE_HOURS_DATA = 8;

export const getDetailsForecastData = createAsyncThunk<
  CityDetailsData,
  { name: string },
  { rejectValue: string }
>('cities/getDetailsForecastData', async ({ name }, { rejectWithValue }) => {
  try {
    const response = await weatherAPI.fetchDetails(name);

    ///filter data on 5 days (1 day / 3 hours update)
    const getTempPerDay = response.data.list.filter((_, index) => {
      return index % DAILY_THREE_HOURS_DATA === 0;
    });

    return { ...response.data, list: getTempPerDay };
  } catch (err: unknown | AxiosError) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Something wrong, details not updated');
  }
});
