import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';

import { WeatherCard } from '../componets/WeatherCard/WeatherCard';
import { SearchSection } from '../sections/SearchSection';
import { fetchCitiesList } from '../store/middleware/cities';
import { useAppDispatch, useAppSelector } from '../store/store';

export const Home = () => {
  const cityList = useAppSelector(state => state.home.cityList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!cityList.length) {
      dispatch(fetchCitiesList());
    }
  }, []);

  return (
    <Container data-testid="home-component">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}
        justifyContent="center"
        alignItems={'center'}
      >
        <Box sx={{ display: 'flex', gap: 3, py: 2 }}>
          <SearchSection />
        </Box>
        <Grid container justifyContent={'center'} spacing={4}>
          {cityList.map(({ name, main, weather, dt, wind }) => (
            <Grid data-testid="city-item" key={name} item>
              <WeatherCard
                date={dt}
                name={name}
                temp={main.temp}
                imgSlug={weather[0].icon}
                windSpeed={wind.speed}
                humidity={main.humidity}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
