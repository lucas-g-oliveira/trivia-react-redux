import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenLogin } from '../API/fetchApi';
import { actionLogin } from '../Redux/actions';

class Login extends Component {
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

  handelClick = async (e) => {
    e.preventDefault();
    const { history, saveLogin } = this.props;
    const { name, email } = this.state;

    const token = await fetchTokenLogin();
    localStorage.setItem(email, token.token);

    saveLogin({ name, email });

    history.push('/game');
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
  saveLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (object) => dispatch(actionLogin(object)),
});

export default connect(null, mapDispatchToProps)(Login);
