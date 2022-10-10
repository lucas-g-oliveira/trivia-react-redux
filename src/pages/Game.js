import React, { Component } from 'react';
import Header from '../componets/Header';
import Questions from '../componets/Questions';

export default class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Questions />
      </>
    );
  }
}
