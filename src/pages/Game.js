import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../componets/Header';
import Questions from '../componets/Questions';

export default class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <Questions history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf().isRequired,
};
