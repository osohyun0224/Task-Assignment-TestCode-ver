import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import Seoul from '../src/pages/Seoul'
import '@testing-library/jest-dom';

jest.mock('axios');

describe('Seoul 컴포넌트 테스트', () => {
  it('날씨 데이터를 불러와서 표시한다', async () => {
    const mockData = {
      data: {
        dt: 1618317040,
        name: 'Seoul',
        main: {
          temp: 10.24,
          feels_like: 7.84,
        },
        weather: [{ description: 'clear sky' }],
      },
    };
    axios.get.mockResolvedValue(mockData);

    const { getByText } = render(<Seoul />);

    await waitFor(() => {
      expect(getByText('Seoul')).toBeInTheDocument();
      expect(getByText('10.2℃')).toBeInTheDocument();
      expect(getByText('Feels like 7.8℃')).toBeInTheDocument();
      expect(getByText('clear sky')).toBeInTheDocument();
    });
  });

});
