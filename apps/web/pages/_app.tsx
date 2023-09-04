import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@core/apollo';
import { type AppProps } from 'next/app';
import 'normalize.css/normalize.css';
import 'rsuite/dist/rsuite.min.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={apolloClient}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
