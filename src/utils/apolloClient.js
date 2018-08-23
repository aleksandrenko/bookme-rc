import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
// import NavigationService from 'BookMe/NavigationService';

// 10.0.2.2 is the local machine for the android simulator, "localhost" is localhost for the ios emulator
// const hostName = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
// const hostName = '10.253.133.247'; // dedicated machine's IP
// const hostName = '10.22.40.148'; // Ivaylo Zhekov's IP
const hostName = 'localhost';
// const hostName = '10.22.41.14'; // Svilen Hadzhiev's IP
const GRAPHQL_ENDPOINT = `ws://${hostName}:3001/graphql`;
const APPLLO_CLIENT_LINK = `http://${hostName}:3001/graphql`;

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

  // Wait for all the navigation pages to be initialized and usable
  isUnauthorized &&
    setTimeout(() => {
      // Navigate to login screen
    }, 0);
});

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(unauthorizedLink).concat(httpLink),
  networkInterface: subscriptionClient,
  defaultOptions
});
