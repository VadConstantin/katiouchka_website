import '../styles/fonts.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head'; // ✅ Import de Head

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Katiouchka Films</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

