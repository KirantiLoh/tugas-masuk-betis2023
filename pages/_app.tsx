import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { OverlayProvider } from '../context/OverlayContext';
import Head from 'next/head';
import { AxiosProvider } from '../context/AxiosContext';
import { AuthProvider } from '../context/AuthContext';
import { SideNavProvider } from 'context/SideNavContext';
import { UpdateFormProvider } from 'context/UpdateFormContext';
import { RefetchProvider } from 'context/RefetchContext';
import { ToastProvider } from 'context/ToastContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RefetchProvider>
      <AuthProvider>
        <AxiosProvider>
          <OverlayProvider>
            <ToastProvider>
              <SideNavProvider>
                <UpdateFormProvider>
                    <Head>
                      <title>Roti BETIS</title>
                      <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Component {...pageProps} />
                </UpdateFormProvider>
              </SideNavProvider>
            </ToastProvider>
          </OverlayProvider>
        </AxiosProvider>
      </AuthProvider>
    </RefetchProvider>
  )
}

export default MyApp
