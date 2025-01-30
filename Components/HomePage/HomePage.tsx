"use client"

import { css } from "styled-components";
import styled, { keyframes } from 'styled-components';
import { INavigation } from "../../Types/contentful";
import { Entry } from 'contentful';
import HomeNavigation from '../Nav/HomeNavigation';
import BackgroundVideo from '../BackgroundVideo';

interface NavigationProps {
  navMainData: Entry<INavigation>;
  locale: string;
  onLocaleChange: (newLocale: string) => void;
  homePageData: any;
  hasSeenIntro: boolean; // Ajout du flag
}

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const HomePage: React.FC<NavigationProps> = ({ locale, onLocaleChange, homePageData, navMainData, hasSeenIntro }) => {
  return (
    <Wrapper hasSeenIntro={hasSeenIntro}>
      <BackgroundVideo homePageData={homePageData} />
      <HomeNavigation navMainData={navMainData} onLocaleChange={onLocaleChange} locale={locale} />
    </Wrapper>
  );
}

export default HomePage;

const Wrapper = styled.div<{ hasSeenIntro: boolean }>`
  padding: 5px;
  font-family: 'Typnic Headline', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow: hidden;

  opacity: ${(props) => (props.hasSeenIntro ? 0 : 1)};
  animation: ${(props) => (props.hasSeenIntro ? css`${fadeIn} 1s ease-in-out forwards` : "none")};

  @media (max-width: 450px) {
    justify-content: start;
  }
`;