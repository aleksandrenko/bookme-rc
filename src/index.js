import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import client from './utils/apolloClient';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import logger from './utils/logger';
import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

const appRenderProfiler = logger.startTimer();

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundry>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ErrorBoundry>
  </BrowserRouter>,
  document.getElementById('root')
);

appRenderProfiler.done({ message: 'App rendered' });
