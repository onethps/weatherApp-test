import { act, findByTestId, findByText, getByText } from '@testing-library/react';
import React from 'react';
import * as reactRedux from 'react-redux';
import storage from 'redux-persist/lib/storage';

import { mockDetailsData } from '../../mock/mockResponse';
import { setupStore } from '../../store';
import { getDetailsForecastData } from '../../store/middleware';
import { renderWithProviders } from '../../utils/test-utils';
import { Details } from '../Details';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('<Details />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('show data with success fetching', async () => {
    jest.spyOn(reactRedux, 'useSelector').mockReturnValueOnce(mockDetailsData);
    const { findByText } = renderWithProviders(<Details />);

    const findRoute = await findByText('Kyiv');
    expect(findRoute).toBeInTheDocument();
  });

  it('showing loader on loading data', async () => {
    jest
      .spyOn(reactRedux, 'useSelector')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(mockDetailsData);
    const { container } = renderWithProviders(<Details />);
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue({});
    const findRoute = await findByTestId(container, 'loader-element');
    expect(findRoute).toBeInTheDocument();
  });
});
