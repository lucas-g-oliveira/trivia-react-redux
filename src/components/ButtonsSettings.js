import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class ButtonsSettings extends Component {
  handleClick = () => {
    console.log(this.props);
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClick }
        >
          Configurações
        </button>
      </div>
    );
  }
}

ButtonsSettings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(ButtonsSettings);
