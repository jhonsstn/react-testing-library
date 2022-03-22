import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('The "FavoritePokemons" component', () => {
  it(`should have the "No favorite pokemon found" message if no
  favorite pokémons exists.`, () => {
    renderWithRouter(<App />, { route: '/favorites' });

    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  it('should have the correct favorite pokémons', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox');

    userEvent.click(checkbox);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favorite);

    expect(screen.getAllByRole('link', { name: /more details/i })).toHaveLength(
      1,
    );
  });
});
