import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const haveDuplicates = (array) => array.length !== new Set(array).size;

const next = 'next-pokemon';

describe('The "Pokedex" component', () => {
  it('should have the "Encountered pokémons" title on the screen', () => {
    renderWithRouter(<App />);

    expect(
      screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i }),
    ).toBeInTheDocument();
  });

  it(`should show the next Pokémon on the list when the
  "Próximo pokémon" button is clicked.`, () => {
    const userClicks = 7;
    renderWithRouter(<App />);

    const nextButton = screen.getByTestId(next);

    userEvent.click(nextButton);

    const firstClickPokemon = screen.getByText(/Charmander/i);

    userEvent.click(nextButton);

    const secondClickPokemon = screen.getByText(/Caterpie/i);

    for (let index = 0; index < userClicks; index += 1) {
      userEvent.click(nextButton);
    }

    const ninthClickPokemon = screen.getByText(/Pikachu/i);

    expect(nextButton).toBeInTheDocument();
    expect(firstClickPokemon).toBeInTheDocument();
    expect(secondClickPokemon).toBeInTheDocument();
    expect(ninthClickPokemon).toBeInTheDocument();
  });

  it('should have only one Pokémon at a time.', () => {
    renderWithRouter(<App />);

    const pokemons = screen.queryAllByRole('link', { name: /more details/i });

    expect(pokemons).toHaveLength(1);
  });

  it('should have buttons to filter by type.', () => {
    renderWithRouter(<App />);

    const buttons = screen.queryAllByTestId('pokemon-type-button');

    userEvent.click(buttons[1]);

    const fire = screen.queryAllByText(/Fire/i)[0];
    const fireType = fire.textContent;
    const fireOne = screen.getByText(/Charmander/i);

    const nextButton = screen.getByTestId('next-pokemon');

    userEvent.click(nextButton);

    const fireTwo = screen.getByText(/Rapidash/i);

    const all = screen.getByRole('button', { name: 'All' });

    userEvent.click(buttons[2]);
    expect(all).toBeInTheDocument();
    userEvent.click(buttons[5]);
    expect(all).toBeInTheDocument();

    expect(haveDuplicates(buttons)).toBeFalsy();
    expect(fire).toBeInTheDocument();
    expect(fireOne).toBeInTheDocument();
    expect(fireTwo).toBeInTheDocument();
    expect(buttons[1].textContent).toBe(fireType);
  });

  it('should have a button "All" to reset filter.', () => {
    const userClicks = 8;
    renderWithRouter(<App />);

    const nextButton = screen.getByTestId(next);

    for (let index = 0; index < userClicks; index += 1) {
      userEvent.click(nextButton);
    }
    let ninthPokemon = screen.getByText(/Dragonair/i);

    const all = screen.getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();

    userEvent.click(all);

    for (let index = 0; index < userClicks; index += 1) {
      userEvent.click(nextButton);
    }

    ninthPokemon = screen.getByText(/Dragonair/i);
    expect(ninthPokemon).toBeInTheDocument();
  });
});
