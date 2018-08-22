import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import client from './apolloClient';
import RoomsComponent from './RoomsComponent';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <RoomsComponent />
      </ApolloProvider>
    );
  }
}

export default hot(module)(App);
