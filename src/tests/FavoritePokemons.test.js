import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Deve aparecer a mensagem No favorite pokemon found, se não tiver favoritos', () => {
    render(<FavoritePokemons />);
    const noFavorite = screen.getByText(/no favorite pokemon found/i);

    expect(noFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const checkbox = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(checkbox);

    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
