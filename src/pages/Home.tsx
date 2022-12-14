import { Box, Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import React from 'react';

import { WeatherCard } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SearchSection } from '../sections/SearchSection';
import { fetchCitiesList } from '../store/middleware';

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
        <SearchSection />
        <Grid
          container
          sx={{ justifyContent: { lg: 'flex-start', xs: 'center' } }}
          spacing={4}
        >
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
