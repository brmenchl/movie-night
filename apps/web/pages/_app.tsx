import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { AppProps } from 'next/app';
import 'normalize.css/normalize.css';
import { Provider } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';

import { store } from '@core/redux/store';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ApolloProvider>
);

export default App;
