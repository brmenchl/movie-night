'use client';
import '@styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@core/apollo';
import { type AppProps } from 'next/app';
import { useEffect } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // @ts-expect-error - no types
    import('preline');
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
