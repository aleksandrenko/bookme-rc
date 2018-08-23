import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { Switch, Route, withRouter } from 'react-router-dom';

import Rooms from './pages/Rooms/Rooms';
import NotFound from './pages/404/404';
import Login from './pages/Login/Login';
class App extends Component {
  render() {
    return (
      <div className="app">
        <div>
          pathname: <b>{this.props.history.location.pathname}</b>
        </div>
        <Login />
        <Switch>
          <Route exact path="/" component={Rooms} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const RoutedApp = withRouter(App);
export default hot(module)(RoutedApp);
