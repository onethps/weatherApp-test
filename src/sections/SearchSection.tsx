import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { addNewLocation } from '../store/middleware/cities';
import { setErrorMessage } from '../store/slices/cities';
import { useAppDispatch, useAppSelector } from '../store/store';
import { checkDuplicates } from '../utils/utils';

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
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorMessage(''));
    setError(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 3 }}>
      <TextField
        error={error}
        value={value}
        onChange={e => handleInput(e.currentTarget.value)}
        id="outlined-search"
        label="Search location"
        type="search"
      />
      <LoadingButton
        sx={{ my: '2px' }}
        color="primary"
        onClick={handleClick}
        loading={loading}
        loadingPosition="start"
        startIcon={<SearchIcon />}
        variant="contained"
      >
        <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>Find</Typography>
      </LoadingButton>

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
