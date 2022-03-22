import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const IMG_URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

describe('The "Pokemon" component', () => {
  it('should have the Pokédex information', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', { alt: /Pikachu sprite/i });

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
    expect(pokemonImg.src).toBe(IMG_URL);
  });

  it('should have a "More details" link', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });

    expect(detailsLink.href).toBe('http://localhost/pokemons/25');
  });

  it('should redirect to pokemon details when the "More details" link is clicked', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });

    userEvent.click(detailsLink);

    const pikachuDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });

    expect(pikachuDetails).toBeInTheDocument();
  });

  it('should change the url browser to "/pokemon/<id>".', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });

    userEvent.click(detailsLink);

    expect(window.location.pathname).toBe('/pokemons/25');
  });

  it('should have a start icon if the pokemon is a favorite.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });

    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox');

    userEvent.click(checkbox);

    const star = screen.queryAllByRole('img');

    expect(star[1].src).toBe('http://localhost/star-icon.svg');
    expect(star[1].alt).toBe('Pikachu is marked as favorite');
  });
});
