import '@/styles/globals.scss';
import '@/config/dayjs';

import { ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Loading from '@/components/Loading';
import theme from '@/config/theme';
import ModalWrapper from '@/modals/index';
import queryClient from '@/services/react-query';
import store, { persistor } from '@/store/index';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Reactive Resume</title>
        <meta
          name="description"
          content="Reactive Resume is a free and open source resume builder that's built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3."
        />

        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <Loading />

              <Component {...pageProps} />

              <ModalWrapper />
              <ReactQueryDevtools />
              <Toaster
                position="bottom-center"
                toastOptions={{
                  duration: 4000,
                  className: 'toast',
                }}
              />
            </QueryClientProvider>
          </PersistGate>
        </ReduxProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
