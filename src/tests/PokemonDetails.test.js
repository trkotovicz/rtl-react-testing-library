import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const h2 = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const summaryParagraph = screen.getByText(/this intelligent pokémon roasts/i);

    expect(h2).toBeDefined();
    expect(details).not.toBeInTheDocument();
    expect(summary).toBeDefined();
    expect(summaryParagraph).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const h2 = screen.getByRole('heading', { name: /locations of pikachu/i, level: 2 });
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    const imgLocation = screen.getAllByRole('img', { name: /pikachu location/i });

    expect(h2).toBeInTheDocument();
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    expect(imgLocation).toHaveLength(2);
    expect(imgLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocation[0].alt).toBe('Pikachu location');
    expect(imgLocation[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgLocation[1].alt).toBe('Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favoriteIcon = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(favoriteIcon).not.toBeInTheDocument();

    const labelText = screen.getByLabelText(/pokémon favoritado\?/i);
    expect(labelText).toBeDefined();
  });
});
