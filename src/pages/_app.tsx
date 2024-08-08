import Header from "@/components/Header";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
