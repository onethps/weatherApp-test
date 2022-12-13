import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { weatherAPI } from '../../services/api/weatherAPI';
import { CityListState } from './../slices/cities';

const initCityList = ['Lviv', 'Kyiv', 'Kharkov'];

///TODO:FIX REJECT

export const fetchCitiesList = createAsyncThunk<
  CityListState[],
  void,
  { rejectValue: string }
>('cities/fetchCitiesList', async (_, { rejectWithValue }) => {
  try {
    const cities = await Promise.all(
      initCityList.map(async c => {
        const city = await weatherAPI.fetchCity(c);
        return city.data;
      }),
    );
    return cities;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.message);
    }
    return rejectWithValue('Something wrong, cities not fetched');
  }
});

export const updateWeatherInfo = createAsyncThunk<
  CityListState,
  { name: string },
  { rejectValue: string }
>('cities/updateWeatherInfo', async ({ name }, { rejectWithValue }) => {
  try {
    const response = await weatherAPI.fetchCity(name);
    // TEST UPDATE DATE
    return response.data;
  } catch (err: unknown | AxiosError) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.message);
    }
    return rejectWithValue('Something wrong, city not updated');
  }
});

export const addNewLocation = createAsyncThunk<
  CityListState,
  { name: string },
  { rejectValue: string }
>('cities/addNewLocation', async ({ name }, { rejectWithValue }) => {
  try {
    const response = await weatherAPI.fetchCity(name);
    return response.data;
  } catch (err: unknown | AxiosError) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data.message);
    }
    return rejectWithValue('Something wrong, city not added');
  }
});
