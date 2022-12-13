import { findByTestId } from '@testing-library/react';
import React from 'react';
import * as reactRedux from 'react-redux';

import { mockDetailsData } from '../../mock/mockResponse';
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
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue(mockDetailsData);
    const { findByText } = renderWithProviders(<Details />);

    const findRoute = await findByText('Kyiv');
    expect(findRoute).toBeInTheDocument();
  });

  it('showing loader on loading data', async () => {
    const { container } = renderWithProviders(<Details />);
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue({});
    const findRoute = await findByTestId(container, 'loader-element');
    expect(findRoute).toBeInTheDocument();
  });
});
