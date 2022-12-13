import { createSlice } from '@reduxjs/toolkit';

import { CityDetailsData } from '../../types';
import { getDetailsForecastData } from '../middleware';

interface initStateType {
  cityDetails: null | CityDetailsData;
  loading: boolean;
}

const initialState: initStateType = {
  cityDetails: null,
  loading: false,
};

const { reducer } = createSlice({
  name: 'detailsCitySlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDetailsForecastData.fulfilled, (state, { payload }) => {
        state.cityDetails = payload;
        state.loading = false;
      })
      .addCase(getDetailsForecastData.pending, state => {
        state.loading = true;
      })
      .addCase(getDetailsForecastData.rejected, state => {
        state.loading = false;
      });
  },
});

export const detailsReducer = reducer;
