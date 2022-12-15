import { findByText } from '@testing-library/react';
import * as reactRedux from 'react-redux';

import { mockCitiesListResponse } from '../../mock';
import { renderWithProviders } from '../../utils/test-utils';
import { Home } from '../Home';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('<Home/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('cityList should be rendered', async () => {
    const mockUseDispatch = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => mockUseDispatch);
    const { container, findAllByTestId } = renderWithProviders(<Home />, {
      preloadedState: {
        home: {
          cityList: mockCitiesListResponse,
          loading: false,
          error: '',
        },
      },
    });

    const elements = await findAllByTestId('city-item');
    const city = await findByText(container, 'Kyiv');

    expect(elements.length).toEqual(2);
    expect(city).toBeInTheDocument();
    expect(mockUseDispatch).toHaveBeenCalledTimes(0);
  });

  it('fetch city list if empty store', () => {
    const mockUseDispatch = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => mockUseDispatch);
    renderWithProviders(<Home />, {
      preloadedState: {
        home: {
          cityList: [],
          loading: false,
          error: '',
        },
      },
    });

    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
  });
});
