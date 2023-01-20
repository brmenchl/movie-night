import "normalize.css/normalize.css";
import "rsuite/dist/rsuite.min.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@core/redux/store";

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default App;
