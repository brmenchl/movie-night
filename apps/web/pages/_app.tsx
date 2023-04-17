import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from '@apollo/client';
import type { AppProps } from 'next/app';
import 'normalize.css/normalize.css';
import { Provider } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';

import { store } from '@core/redux/store';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
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
