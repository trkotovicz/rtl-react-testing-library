import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { name: /not found/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/qualquercoisa');

    const img = screen.getByRole('img', { name: /pikachu crying/i });

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
