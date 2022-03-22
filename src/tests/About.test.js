import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const IMG_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
const PARAGRAPHS = [
  'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons',
  'One can filter Pokémons by type, and see more details for each one of them',
];

describe('The "About" component', () => {
  it('should have the Pokédex information', () => {
    renderWithRouter(<App />, { route: '/about' });

    expect(
      screen.getByRole('heading', { level: 2, name: 'About Pokédex' }),
    ).toBeInTheDocument();
  });

  it('should have a two paragraphs talking about Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });

    expect(screen.getByText(PARAGRAPHS[0])).toBeInTheDocument();
    expect(screen.getByText(PARAGRAPHS[1])).toBeInTheDocument();
  });

  it('should have the img', () => {
    renderWithRouter(<App />, { route: '/about' });

    const teste = screen.getByRole('img');

    expect(teste.src).toBe(IMG_URL);
  });
});
