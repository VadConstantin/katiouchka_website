"use client"

import styled from 'styled-components';
import { INavigation } from "@/Types";
import { Entry } from 'contentful';


interface NavigationProps {
  navMainData: Entry<INavigation>
  locale: string;
  onLocaleChange: (newLocale: string) => void;
  children: React.ReactNode
}

const Navigation:React.FC<NavigationProps> = ({ locale, onLocaleChange, children, navMainData }) => {
  const logoUrl = (navMainData?.fields?.logo as any)?.fields?.file?.url;

  return (
    <Wrapper>
      <Banner>
        <Spacer />
        <Logo src={logoUrl} alt="logo" />
        <Languages>
          <p>Langue actuelle : {locale}</p>
          <button onClick={() => onLocaleChange('fr')}>🇫🇷</button>
          <button onClick={() => onLocaleChange('en')}>🇺🇸</button>
          <button onClick={() => onLocaleChange('it')}>🇮🇹</button>
        </Languages>
      </Banner>
      <>{children}</>
    </Wrapper>
  );
}

export default Navigation

const Logo = styled.img`
  width: 300px;

`

const Wrapper = styled.div`
  padding: 1rem;
`

const Banner = styled.div`
  display: flex;
    justify-content: space-between; 
  align-items: center;
`

const Languages = styled.div`
  text-align: end;
  flex: 1; 

`

const Spacer = styled.div`
  flex: 1; 
`