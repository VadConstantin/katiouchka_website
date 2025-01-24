"use client"

import styled from 'styled-components';
import { INavigation } from "../../Types/contentful";
import { Entry } from 'contentful';
import HomeNavigation from '../Nav/HomeNavigation'
import BackgroundVideo from '../BackgroundVideo';

interface NavigationProps {
  navMainData: Entry<INavigation>
  locale: string;
  onLocaleChange: (newLocale: string) => void;
  homePageData: any
}

const HomePage:React.FC<NavigationProps> = ({ locale, onLocaleChange, homePageData, navMainData }) => {
  return (
    <Wrapper>
      <BackgroundVideo homePageData={homePageData}/>
      <HomeNavigation navMainData={navMainData} onLocaleChange={onLocaleChange} locale={locale}/>
    </Wrapper>
  );
}

export default HomePage

const Wrapper = styled.div`
  font-family: 'Typnic Headline', sans-serif;
  display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    overflow: hidden;

    @media (max-width: 450px) {
      justify-content: start;
    }
`