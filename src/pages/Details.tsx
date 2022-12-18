import FmdGoodIcon from '@mui/icons-material/FmdGood';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import sunriseIcon from '../assets/sunrise.png';
import sunsetIcon from '../assets/sunset.png';
import { HighlightCard } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getDetailsForecastData } from '../store/middleware';
import { detailsHighLights } from './data/detailsData';

export const Details = () => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(state => state.details.cityDetails);
  const loading = useAppSelector(state => state.details.loading);

  const { city } = useParams();

  useEffect(() => {
    if (city) {
      dispatch(getDetailsForecastData({ name: city }));
    }
  }, []);

  const href = 'http://openweathermap.org/img/wn/';

  if (loading) {
    return (
      <Container
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress data-testid="loader-element" />
      </Container>
    );
  }

  if (!currentCity) {
    return <div>loading</div>;
  }

  return (
    <Container data-testid="details-component">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 3,
          mt: 10,
          flexWrap: 'wrap',
        }}
      >
        {/* main card */}
        <Card sx={{ minWidth: { xs: '100%', md: '30%' } }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                alignSelf: 'left',
                display: 'flex',
                gap: 1,
                width: '100%',
                fontSize: 16,
              }}
            >
              <FmdGoodIcon fontSize="small" />
              <Typography>{currentCity.city.name}</Typography>
            </Box>
            <img
              alt={'weather-icon'}
              width={100}
              height={100}
              src={`${href + currentCity.list[0].weather[0].icon}@2x.png`}
            />
            <Typography variant="h3">
              {Math.ceil(currentCity.list[0].main.temp)}&deg;
            </Typography>{' '}
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {dayjs(new Date()).format('dddd, HH:mm')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                mt: 3,
                justifyContent: 'space-around',
              }}
            >
              {/* sunrise */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box>
                  <img src={sunriseIcon} width={40} height={40} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Sunrise
                  </Typography>
                  <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    {dayjs(currentCity.city.sunrise * 1000).format('HH:mm')}
                  </Typography>
                </Box>
              </Box>

              {/* sunset */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box>
                  <img src={sunsetIcon} width={40} height={40} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Sunset
                  </Typography>
                  <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    {dayjs(currentCity.city.sunset * 1000).format('HH:mm')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxWidth: { xs: '100%', md: '60%' },
          }}
        >
          {/* weather days */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {currentCity &&
              currentCity.list.map(el => (
                <Card key={el.dt} sx={{ flexGrow: 1, maxWidth: '100px' }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="subtitle1">
                        {dayjs(el.dt_txt).format('ddd')}
                      </Typography>
                      <img
                        src={`${href + el.weather[0].icon}@2x.png`}
                        width={50}
                        height={50}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {Math.round(el.main.temp_max)}&deg;
                        </Typography>
                        <Typography
                          sx={{ opacity: '0.5' }}
                          variant="subtitle1"
                          color="text.secondary"
                        >
                          {Math.round(el.main.temp_min)}&deg;
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
          </Box>

          {/* additional info */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {detailsHighLights(currentCity).map(({ title, data, icon, id }) => (
              <HighlightCard key={id} title={title} value={data} imgLink={icon} />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
