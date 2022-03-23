import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('The "PokemonDetails" component', () => {
  it('should show the Pokémon detail information on screen.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });

    userEvent.click(detailsLink);

    const pikachuDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });

    const pokemonParagraph = screen.getByText(/This intelligent Pokémon/i);

    expect(pikachuDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonParagraph).toBeInTheDocument();
  });

  it('should have a section with the pokemon location showed on maps.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });

    userEvent.click(detailsLink);

    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });

    const locations = screen.queryAllByAltText(/Pikachu location/i);

    expect(gameLocations).toBeInTheDocument();
    expect(locations).toHaveLength(2);
    expect(locations[0].src).toBe(
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locations[1].src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
  it('should allow the user to favorite a pokemon.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });

    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    const label = screen.getByText(/Pokémon favoritado/i);
    expect(label).toBeInTheDocument();
  });
});
