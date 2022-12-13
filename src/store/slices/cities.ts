import { createSlice } from '@reduxjs/toolkit';

import { MainCard } from '../../types/types';
import { fetchCitiesList, updateWeatherInfo } from '../middleware/cities';
import { addNewLocation } from './../middleware/cities';

export interface CityListState extends MainCard {
  id: string;
  name: string;
  timezone?: number;
  loading: boolean;
  error: string;
}

const initialState = {
  loading: true,
  cityList: [] as CityListState[],
  error: '',
};

export const cityListSlice = createSlice({
  name: 'cityListSlice',
  initialState,
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.error = payload;
    },
    removeCityCard: (state, action) => {
      const findIndex = state.cityList.findIndex(el => el.name === action.payload.name);
      if (findIndex > -1) {
        state.cityList.splice(findIndex, 1);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCitiesList.fulfilled, (state, { payload }) => {
        state.cityList = payload;
        state.loading = false;
      })
      .addCase(fetchCitiesList.rejected, (state, { payload }) => {
        state.error = payload ? payload : 'Something wrong';
        state.loading = false;
      })
      .addCase(fetchCitiesList.pending, state => {
        state.error = '';
        state.loading = true;
      })
      ////////////////
      .addCase(updateWeatherInfo.fulfilled, (state, { payload }) => {
        const findIndex = state.cityList.findIndex(el => el.name === payload.name);
        if (findIndex > -1) {
          state.cityList[findIndex] = payload;
        }
        state.loading = false;
      })
      .addCase(updateWeatherInfo.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(updateWeatherInfo.pending, state => {
        state.error = '';
        state.loading = true;
      })
      ///////////
      .addCase(addNewLocation.fulfilled, (state, { payload }) => {
        state.cityList.unshift(payload);
        state.loading = false;
      })
      .addCase(addNewLocation.rejected, (state, { payload }) => {
        state.error = payload ? payload : 'Something wrong';
        state.loading = false;
      })
      .addCase(addNewLocation.pending, state => {
        state.error = '';
        state.loading = true;
      });
  },
});

export const { removeCityCard, setErrorMessage } = cityListSlice.actions;

export const cityListReducer = cityListSlice.reducer;
