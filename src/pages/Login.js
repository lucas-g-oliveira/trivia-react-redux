import React, { Component } from 'react';
<<<<<<< HEAD
import PropTypes from 'prop-types';
=======
import fetchTokenLogin from '../API/fetchApi';
>>>>>>> main-group-15-requisito-02

export default class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabledBttn: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => { this.validation(); });
  };

  handelClick = (e) => {
    e.preventDefault();
    fetchTokenLogin();
  };

  validation = () => {
    const { name, email } = this.state;
    const MIN_LENGTH = 0;
    const emailRegex = /\S+@\S+\.\S+/;
    if (name.length > MIN_LENGTH && emailRegex.test(email)) {
      return this.setState({
        isDisabledBttn: false,
      });
    }
    return this.setState({
      isDisabledBttn: true,
    });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisabledBttn } = this.state;
    return (
      <form>
        <label htmlFor="input_name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            id="input_name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input_email">
          E-mail:
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="input_name"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isDisabledBttn }
          onClick={ this.handelClick }
<<<<<<< HEAD
          onClick={ this.handleClick }
=======
          onClick={ this.handelClick }
>>>>>>> main-group-15-requisito-02
        >
          Play
        </button>
        <div>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClickSettings }
          >
            Configurações
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
