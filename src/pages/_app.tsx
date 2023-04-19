import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ReactQueryProvider } from '@/providers/react-query-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ReactQueryProvider>
  );
}
