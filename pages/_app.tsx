import "../styles/fonts.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Gestion des transitions entre les pages
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon3.png" type="image/png" />
        <title>Katiouchka Films</title>
      </Head>
      {isLoading && <PageLoader />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

// ✅ Animation de fondu pour l'écran de chargement
const fadeInOut = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;

// ✅ Ecran noir lors du chargement
const PageLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 9999;
  animation: ${fadeInOut} 0.5s ease-in-out forwards;
  pointer-events: none;
`;


