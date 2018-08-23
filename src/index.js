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

const appRenderProfiler = logger.startTimer();

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

appRenderProfiler.done({ message: 'App rendered' });
