import userEvent from '@testing-library/user-event';
import * as reactRedux from 'react-redux';

import { renderWithProviders } from '../../utils/test-utils';
import { WeatherCard } from '../WeatherCard/WeatherCard';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('<WeatherCard/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('button should call dispatch remove city action', async () => {
    const mockUseDispatch = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => mockUseDispatch);
    const props = {
      name: 'Kyiv',
      temp: 50,
      imgSlug: '/kyiv-details',
      date: 12345648,
      windSpeed: 5,
      humidity: 90,
    };
    const { getByTestId } = renderWithProviders(<WeatherCard {...props} />);
    const findButton = getByTestId('remove-button');

    userEvent.click(findButton);
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
  });

  it('button should call dispatch update city action', async () => {
    const mockUseDispatch = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => mockUseDispatch);
    const props = {
      name: 'Kyiv',
      temp: 50,
      imgSlug: '/kyiv-details',
      date: 12345648,
      windSpeed: 5,
      humidity: 90,
    };

    const { getByTestId } = renderWithProviders(<WeatherCard {...props} />);
    const findButton = getByTestId('update-button');

    userEvent.click(findButton);
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
  });

  it('button should call dispatch update city action', async () => {
    const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...(jest.requireActual('react-router-dom') as any),
      useNavigate: () => mockedUsedNavigate,
    }));

    const props = {
      name: 'Kyiv',
      temp: 50,
      imgSlug: '/kyiv-details',
      date: 12345648,
      windSpeed: 5,
      humidity: 90,
    };
    const { getByTestId } = renderWithProviders(<WeatherCard {...props} />);
    const findButton = getByTestId('navigate-details');
    userEvent.click(findButton);
  });
});
