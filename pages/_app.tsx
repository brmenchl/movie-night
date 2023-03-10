import { store } from '@redux/store';
import type { AppProps } from 'next/app';
import 'normalize.css/normalize.css';
import { Provider } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default App;
