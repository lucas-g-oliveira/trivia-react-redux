import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/* import logo from './trivia.png'; */
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import { Settings } from './pages/Settings';

export default class App extends Component {
  render() {
    return (
      <main className="App">
        {/*  <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header> */}
        <Router>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/settings" component={ Settings } />
            <Route exact path="/game" component={ Game } />
          </Switch>
        </Router>
      </main>
    );
  }
}
