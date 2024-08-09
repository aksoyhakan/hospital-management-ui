import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/theme.ts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
