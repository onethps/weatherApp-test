import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { addNewLocation } from '../store/middleware';
import { setErrorMessage } from '../store/slices';
import { checkDuplicates } from '../utils';

export const SearchSection = () => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const cityList = useAppSelector(state => state.home.cityList);
  const errorMessage = useAppSelector(state => state.home.error);
  const loading = useAppSelector(state => state.home.loading);

  const dispatch = useAppDispatch();

  const handleInput = (newInputValue: string) => {
    setError(false);
    setValue(newInputValue);
  };

  const handleClick = () => {
    if (value.length < 3) {
      dispatch(setErrorMessage(''));
      setError(true);
      return;
    }

    if (checkDuplicates(cityList, value)) {
      dispatch(setErrorMessage('City Already Exist'));
      return;
    }

    dispatch(addNewLocation({ name: value }));
    setValue('');
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorMessage(''));
    setError(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 3,
        width: { xs: '70%', md: '50%' },
      }}
    >
      <TextField
        fullWidth
        error={error}
        value={value}
        onChange={e => handleInput(e.currentTarget.value)}
        id="outlined-search"
        label="Add location..."
        type="search"
        size="small"
        variant="standard"
      />

      <Button variant="contained" onClick={handleClick} disabled={loading}>
        <SearchIcon />
      </Button>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          Please use at least 3 characters
        </Alert>
      </Snackbar>

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
