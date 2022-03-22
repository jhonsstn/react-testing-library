import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const IMG_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('The "App" component', () => {
  it('should have the "Page requested not found" message.', () => {
    renderWithRouter(<App />, { route: '/dont-exist' });

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      }),
    ).toBeInTheDocument();
  });
  it('should have a GIF. ', () => {
    renderWithRouter(<App />, { route: '/dont-exist' });

    expect(screen.queryAllByRole('img')[1].src).toBe(IMG_URL);
  });
});
