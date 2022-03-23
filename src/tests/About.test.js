import { render, screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';

describe('2. Teste o componente <About.js />.', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const infos = screen.getByText(/encyclopedia containing all Pokémons/i);

    expect(infos).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons/i);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const img = screen.getByRole('img', { name: /pokédex/i });

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
