import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import client from './utils/apolloClient';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import logger from './utils/logger';

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

const appStartProfiler = logger.startTimer();

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

appStartProfiler.done({ message: 'App rendered' });
