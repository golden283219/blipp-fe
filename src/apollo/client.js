import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'node-fetch';
import { localstorageKeys } from '../types/localstorageTypes';
import { getLocalStorageValue } from '../utils/localstorageHelper';

const uri = process.env.GATSBY_GRAPHQL_ENDPOINT;

const cache = new InMemoryCache();

const mainLink = createHttpLink({
  uri,
  credentials: 'same-origin',
  fetch,
});

const authLink = setContext(async (_, { headers }) => {
  const { token } = getLocalStorageValue(
    localstorageKeys.token,
    ''
  );
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const link = authLink.concat(mainLink);

const apolloClient = new ApolloClient({
  cache,
  link,
});

export default apolloClient;
