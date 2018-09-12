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
import PageTransition from 'react-router-page-transition';

class App extends Component {
  render() {
    const { location, history } = this.props;
    const showQRScannerButton =
      location.pathname !== '/login' &&
      location.pathname.substr(0, 6) !== '/room/';

    return (
      <div className="app">
        <PageTransition
          timeout={500}
          transitionAction={history.action.toLowerCase()}
        >
          <Switch location={location}>
            <Route exact path="/" component={Rooms} />
            <Route exact path="/room/:key" component={Room} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </PageTransition>
        {showQRScannerButton && <QRCodeReaderComponent />}
      </div>
    );
  }
}

const RoutedApp = withRouter(App);

export default hot(module)(RoutedApp);
