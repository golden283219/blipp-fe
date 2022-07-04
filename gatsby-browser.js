import React from 'react';
import Layout from './src/components/layout';
import { ThemeProvider } from '@material-ui/styles';
import theme from './src/styles/theme';
import './src/styles/styles.css';
import './src/i18n/i18n';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo/client';
import ContextProvider from './src/contexts/ContextProvider';

export const wrapPageElement = ({ element, ...props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <ContextProvider>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </ContextProvider>
  </ApolloProvider>
);
