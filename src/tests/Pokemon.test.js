import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByText(/pikachu/i);
    const type = screen.getAllByText(/electric/i);
    const averageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const img = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokemon).toBeInTheDocument();
    expect(type).toHaveLength(2); // dois pq existe o botão com o mesmo texto
    expect(averageWeight).toBeDefined();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  it('Testa se o card do Pokémon contém um link de navegação para mais detalhes.', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeDefined();
    userEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const favoriteCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(favoriteCheckbox).toBeDefined();
    userEvent.click(favoriteCheckbox);

    const favoriteIcon = screen.getByRole(
      'img', { name: /pikachu is marked as favorite/i },
    );
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toContain('/star-icon.svg');
    expect(favoriteIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
