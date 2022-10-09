import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
/* import logo from './trivia.png'; */
import './App.css';
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
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </main>
    );
  }
}
