import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { type AppProps } from 'next/app';
import 'normalize.css/normalize.css';
import 'rsuite/dist/rsuite.min.css';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
