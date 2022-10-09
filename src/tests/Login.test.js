import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa o componente Login',()=>{
  beforeEach(() => render(<App />))

  it('Verifica se exite os inputs com os test-ids requeridos.', () => {
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
  
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    expect(btnPlay).toBeInTheDocument()
  })

  it('Verifica se é possível digitar o nome da pessoa e email',()=>{
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputEmail,'testEmail123');
    userEvent.type(inputName, 'testName123');

    expect(inputName).toHaveValue('testName123'),
    expect(inputEmail).toHaveValue('testEmail123')
  })

  it('Verifica se a validação do botão "Play" funciona conforme o esperado',()=>{
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputEmail,'');
    userEvent.type(inputName, '');

    expect(btnPlay).toHaveProperty('disabled',true);

    userEvent.type(inputEmail,'teste@teste.com');
    userEvent.type(inputName, '');

    expect(btnPlay).toHaveProperty('disabled',true);

    userEvent.type(inputEmail,'teste@teste.com');
    userEvent.type(inputName, 'Nome teste');

    expect(btnPlay).toHaveProperty('disabled',false);
  })
})
