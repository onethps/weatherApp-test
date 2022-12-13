import { act, fireEvent, render, within } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import React from 'react';

import { SearchAutoComplete } from '../SearchAutoComplete/SearchAutoComplete';

jest.mock('react-redux');
jest.mock('axios');

const mAxios = axios as jest.MockedFunction<typeof axios>;

describe('<SearchAutoComplete/>', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('can select city in option and and proceed', async () => {
    const { findByText, getByTestId } = render(
      <SearchAutoComplete coord={{ lng: 1, lat: 1 }} setCoord={jest.fn()} />,
    );
    const mockResponse = {
      data: { data: [{ city: 'Kyiv' }, { city: 'Lviv' }, { city: 'Amsterdam' }] },
      status: 200,
      statusText: 'ok',
    } as AxiosResponse;
    mAxios.mockResolvedValueOnce(mockResponse);

    const autocomplete = getByTestId('search-autocomplete');

    const input = within(autocomplete).getByRole('combobox') as HTMLInputElement;

    await act(() => {
      autocomplete.click();
      autocomplete.focus();
      fireEvent.change(input, { target: { value: /Amster/i } });
    });

    const findOption = await findByText(/amsterdam/i);
    act(() => {
      fireEvent.click(findOption);
    });

    expect(input.value).toEqual('Amsterdam');
  });
});
