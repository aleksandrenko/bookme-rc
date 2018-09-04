import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import client from './utils/apolloClient';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import logger from './utils/logger';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

const appRenderProfiler = logger.startTimer();

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root')
);

appRenderProfiler.done({ message: 'App rendered' });
