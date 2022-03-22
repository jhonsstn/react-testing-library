import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('The "App" component', () => {
  it('should have the "Home", "About" and "Favorite Pokémons" navigation links', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Favorite Pokémons' }),
    ).toBeInTheDocument();
  });
  it(`should redirect to the starting page on the path "/" if the "Home"
  link is clicked`, () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });

    userEvent.click(home);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Pokédex' }),
    ).toBeInTheDocument();
  });
  it(`should redirect to the about page on the path "/about" if the
  "About" link is clicked`, () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });

    userEvent.click(about);

    expect(
      screen.getByRole('heading', { level: 2, name: 'About Pokédex' }),
    ).toBeInTheDocument();
  });
  it(`should redirect to the favorite pokémons page on the path "/favorites"
  if the "Favorite Pokémons" link is clicked`, () => {
    renderWithRouter(<App />);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favorite);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Favorite pokémons' }),
    ).toBeInTheDocument();
  });
  it(`should redirect to the not found page if a path that do not
  exist is entered`, () => {
    renderWithRouter(<App />, { route: '/dont-exist' });

    console.log(window.location.pathname);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      }),
    ).toBeInTheDocument();
  });
});
