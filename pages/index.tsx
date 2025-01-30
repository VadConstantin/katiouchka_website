import { GetServerSideProps } from 'next';
import HomePage from '@/Components/HomePage/HomePage';
import { getHomePageData, getNavigationData } from '@/Services/get_contentful_data';
import { IHomePage } from "../Types/contentful";
import { Entry } from 'contentful';
import IntroScreen from '@/Components/IntroScreen/IntroScreen';
import { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";

interface HomeProps {
  locale: string;
  navMainData: any;
  homePageData: Entry<IHomePage>;
}

const Home = ({ locale, navMainData, homePageData }: HomeProps) => {
  const [showIntro, setShowIntro] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const hasSeenIntroBefore = sessionStorage.getItem('hasSeenIntro');

    if (!hasSeenIntroBefore) {
      setShowIntro(true);
      setHasSeenIntro(true);
    }
    setIsLoading(false); 
  }, []);

  const handleFinishIntro = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  if (isLoading) {
    return <BlackScreen />;
  }

  return (
    <div>
      {showIntro ? (
        <IntroScreen onFinish={handleFinishIntro} />
      ) : (
        <>
          {hasSeenIntro && <BlackOverlay />}
          <HomePage 
            navMainData={navMainData} 
            locale={locale} 
            onLocaleChange={() => {}} 
            homePageData={homePageData} 
            hasSeenIntro={hasSeenIntro}
          />
        </>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.query.locale || 'fr';

  const navMainData = await getNavigationData(locale as string);
  const homePageData = await getHomePageData();

  if (!navMainData) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  return {
    props: {
      locale,
      navMainData,
      homePageData,
    },
  };
};

const BlackScreen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 99999;
`;

const fadeToTransparent = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const BlackOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 9999;
  animation: ${fadeToTransparent} 2s ease-in-out forwards;
  pointer-events: none; 
  animation-fill-mode: forwards;
`;
