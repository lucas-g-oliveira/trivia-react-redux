import React, { Component } from 'react';
import fetchTokenLogin from '../API/fetchApi';

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
        >
          Play
        </button>
      </form>
    );
  }
}
