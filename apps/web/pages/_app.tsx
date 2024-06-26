'use client';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/core/apollo';
import { type AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
