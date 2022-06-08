import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from '@apollo/client';
import { useApollo } from "../apollo-client";
import { StateProvider } from "../state";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { Themes } from '../styles/Themes';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ThemeProvider theme={Themes.brightmode}>
      <GlobalStyle />
      <StateProvider>
        <ApolloProvider client={apolloClient}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Component {...pageProps} />
          </SessionProvider>
        </ApolloProvider>
      </StateProvider>
    </ThemeProvider>
  );
}
