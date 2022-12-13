import { act } from '@testing-library/react';
import React from 'react';

import { mockCitiesListResponse } from '../../mock';
import { setupStore } from '../../store';
import { addNewLocation, fetchCitiesList } from '../../store/middleware/cities';
import { renderWithProviders } from '../../utils/test-utils';
import { Home } from '../Home';

describe('<Home/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('city should be added', async () => {
    const store = setupStore();

    act(() => {
      store.dispatch(
        fetchCitiesList.fulfilled(mockCitiesListResponse, 'requestId', undefined),
      );
    });

    const { findAllByTestId, getByText } = renderWithProviders(<Home />, {
      store,
    });

    const payload = {
      id: '1',
      name: 'Odessa',
      error: '',
      main: {
        temp: 1,
        feels_like: 2,
        humidity: 1,
        pressure: 1,
        temp_max: 2,
        temp_min: 1,
      },
      weather: [
        {
          id: 22,
          description: '212',
          main: 'cloud',
          icon: '/src-link',
        },
      ],
      visibility: 11,
      dt: 333,
      loading: false,
      wind: {
        speed: 343,
      },
    };

    act(() => {
      store.dispatch(addNewLocation.fulfilled(payload, 'requestId', { name: 'Kyiv' }));
    });

    const findCities = await findAllByTestId('city-item');
    expect(findCities.length).toEqual(3);
    const findAddedCity = getByText('Odessa');
    expect(findAddedCity).toBeInTheDocument();
  });

  it.todo('correct city should be updated');
});
