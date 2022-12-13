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

import pressureIcon from '../assets/gauge.png';
import humidityIcon from '../assets/humidity.png';
import visibilityIcon from '../assets/low-visibility.png';
import sunriseIcon from '../assets/sunrise.png';
import sunsetIcon from '../assets/sunset.png';
import windSpeedIcon from '../assets/wind.png';
import { HighlightCard } from '../componets/HighlightCard/HighlightCard';
import { getDetailsForecastData } from '../store/middleware/cityDetails';
import { useAppDispatch, useAppSelector } from '../store/store';

export const Details = () => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(state => state.details.cityDetails);

  const { city } = useParams();

  useEffect(() => {
    if (city) {
      dispatch(getDetailsForecastData({ name: city }));
    }
  }, []);

  const href = 'http://openweathermap.org/img/wn/';

  if (!currentCity?.city) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress data-testid="loader-element" />
      </div>
    );
  }

  const detailsHighLights = [
    {
      id: 1,
      title: 'Wind Speed',
      data: currentCity.list[0].wind.speed + ' m/s',
      icon: windSpeedIcon,
    },
    {
      id: 2,
      title: 'Pressure',
      data: Math.floor(currentCity.list[0].main.pressure / 1.333) + ' mm',
      icon: pressureIcon,
    },
    {
      id: 3,
      title: 'Humidity',
      data: currentCity.list[0].main.humidity + ' %',
      icon: humidityIcon,
    },
    {
      id: 4,
      title: 'Visibility',
      data: (currentCity.list[0].visibility / 1000).toFixed(2) + ' km',
      icon: visibilityIcon,
    },
  ];

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
            </Typography>
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
            {detailsHighLights.map(({ title, data, icon, id }) => (
              <HighlightCard key={id} title={title} value={data} imgLink={icon} />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
