import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material/';
import dayjs from 'dayjs';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import humidityIcon from '../../assets/humidity.png';
import windSpeedIcon from '../../assets/wind.png';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { updateWeatherInfo } from '../../store/middleware/cities';
import { removeCityCard } from '../../store/slices/cities';

interface PropsCard {
  name: string;
  date: number;
  temp: number;
  imgSlug: string;
  windSpeed: number;
  humidity: number;
}

export const WeatherCard = memo(function ({
  name,
  temp,
  imgSlug,
  date,
  windSpeed,
  humidity,
}: PropsCard) {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const deleteWeatherCardHandle = () => {
    dispatch(removeCityCard({ name }));
  };

  const updateWeatherInfoHandle = () => {
    dispatch(updateWeatherInfo({ name }));
  };

  return (
    <Card sx={{ width: 250 }}>
      <CardContent>
        {/* header */}
        <Stack direction={'row'} justifyContent="space-between">
          <Typography
            noWrap
            sx={{ maxWidth: '150px' }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>

          <CardActions sx={{ margin: 0, padding: 0 }}>
            <IconButton data-testid="update-button" onClick={updateWeatherInfoHandle}>
              <ReplayIcon />
            </IconButton>
            <IconButton data-testid="remove-button" onClick={deleteWeatherCardHandle}>
              <CloseIcon />
            </IconButton>
          </CardActions>
        </Stack>

        {/* main */}

        <Box data-testid="navigate-details" onClick={() => nav(`details/${name}`)}>
          <Typography variant="body2" color="text.secondary">
            Last update {dayjs(date).format('HH:mm:ss')}
          </Typography>
          <Stack direction="row" sx={{ p: 1 }} alignItems="center">
            <Typography variant="h2">{Math.ceil(temp)}&deg;</Typography>

            <img
              alt={'iconWeather'}
              width={100}
              height={100}
              src={`http://openweathermap.org/img/wn/${imgSlug}@2x.png`}
            />
          </Stack>
          <Stack
            direction={'row'}
            spacing={5}
            justifyItems={'center'}
            justifyContent="center"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <img src={windSpeedIcon} alt={'wind-speed-icon'} width={25} height={25} />
              <Typography fontSize={10} color="text.secondary">
                Wind {windSpeed} m/s
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <img src={humidityIcon} alt={'humidity-icon'} width={25} height={25} />
              <Typography fontSize={10} color="text.secondary">
                Humidity {humidity} %
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
});

WeatherCard.displayName = 'WeatherCard';
