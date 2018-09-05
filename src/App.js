import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import { Switch, Route, withRouter } from 'react-router-dom';

import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room';
import NotFound from './pages/404/404';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import QRCodeReaderComponent from './components/QRCodeReader/QRCodeReader';

class App extends Component {
  render() {
    const { location, history } = this.props;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Rooms} />
          <Route exact path="/room/:key" component={Room} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/logout"
            render={() => {
              history.replace('/login');
              return null;
            }}
          />
          <Route component={NotFound} />
        </Switch>
        {location.pathname !== '/login' &&
          !location.pathname.startsWith('/room/') && <QRCodeReaderComponent />}
      </div>
    );
  }
}

const RoutedApp = withRouter(App);

export default hot(module)(RoutedApp);
