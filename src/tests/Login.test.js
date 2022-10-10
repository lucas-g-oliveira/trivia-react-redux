import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

describe('Testa o componente Login',()=>{
  it('Verifica se exite os inputs com os test-ids requeridos.', () => {
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
  
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    expect(btnPlay).toBeInTheDocument()
  })

  it('Verifica se é possível digitar o nome da pessoa e email',() => {
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputEmail,'testEmail123');
    userEvent.type(inputName, 'testName123');

    expect(inputName).toHaveValue('testName123'),
    expect(inputEmail).toHaveValue('testEmail123')
  })

  it('Verifica se a validação do botão "Play" funciona conforme o esperado',() => {
    renderWithRouterAndRedux(<App/>)
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

  it('Verifica se o botão "Pay" redireciona para pagina "/game"', async () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputEmail,'teste@teste.com');
    userEvent.type(inputName, 'Joãozinho');
    userEvent.click(btnPlay)

    await waitFor(() => expect(history.location.pathname).toEqual('/game'))
  })

  it('Verifica se o botão "configurações" redireciona para pagina "/settings"', async () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    const btnSettings = screen.getByTestId('btn-settings');
    
    userEvent.click(btnSettings)

    expect(history.location.pathname).toEqual('/settings')
  })

})
