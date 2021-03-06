import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import features from './features';

// 10.0.2.2 is the local machine for the android simulator, "localhost" is localhost for the ios emulator
// const hostName = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
const hostName = features.active('use-local-graphql')
  ? 'localhost'
  : '10.253.133.247'; // dedicated machine's IP

const GRAPHQL_ENDPOINT = `ws://${hostName}:3001/graphql`;
const APPLLO_CLIENT_LINK = `http://${hostName}:3001/graphql`;

let externalErrorHandler = () => {};

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  }
};

const subscriptionClient = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true
});

const httpLink = new HttpLink({ uri: APPLLO_CLIENT_LINK });

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const unauthorizedLink = onError(({ graphQLErrors }) => {
  const isUnauthorized =
    graphQLErrors &&
    graphQLErrors.length &&
    graphQLErrors.find(error => error.message.search('401') >= 0);

  isUnauthorized &&
    externalErrorHandler({
      type: 'ERROR',
      code: 401,
      message: 'unathorized'
    });
});

const appApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(unauthorizedLink).concat(httpLink),
  networkInterface: subscriptionClient,
  defaultOptions
});

appApolloClient.setExternalErrorHandler = fn => {
  externalErrorHandler = fn;
};

export default appApolloClient;
