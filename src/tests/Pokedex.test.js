import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página tem um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);
    // O botão deve conter o texto Próximo pokémon;
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();

    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    userEvent.click(button);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();

    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const pokemonTypes = screen.getAllByTestId('pokemon-type-button'); // testId dos botões
    const types = 7;
    expect(pokemonTypes).toHaveLength(types);

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const psychic = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(psychic);

    const type = screen.getByTestId('pokemon-type'); // testId do pokemon renderizado
    expect(type).toHaveTextContent(/psychic/i);
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    expect(psychic).toHaveTextContent(/psychic/i);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // O botão All precisa estar sempre visível.
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeDefined();
    expect(allButton).toHaveTextContent(/all/i);

    // Ao carregar a página, o filtro selecionado deverá ser All;
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);

    const button = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(button);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
  });
});
