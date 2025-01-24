"use client"

import styled from 'styled-components';
import { INavigation } from "@/Types";
import { Entry } from 'contentful';

interface NavigationProps {
  navMainData: Entry<INavigation>
  locale: string;
  onLocaleChange: (newLocale: string) => void;
  children: React.ReactNode
  homePageData: any
}

const HomeNavigation:React.FC<NavigationProps> = ({ locale, onLocaleChange, children, homePageData, navMainData }) => {
  const logoUrl = (navMainData?.fields?.logo as any)?.fields?.file?.url;
  const links = (navMainData.fields.navLinks as any)
  const videoUrl = (homePageData?.fields?.backgroundVideo as any).fields?.file?.url || ''

  return (
    <Wrapper>
      {videoUrl && (
        <VideoBackground autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </VideoBackground>
      )}
      <Banner>
        <Spacer />
        <Logo src={logoUrl} alt="logo" />
        {/* <Languages>
          <p>Langue actuelle : {locale}</p>
          <button onClick={() => onLocaleChange('fr')}>🇫🇷</button>
          <button onClick={() => onLocaleChange('en')}>🇺🇸</button>
          <button onClick={() => onLocaleChange('it')}>🇮🇹</button>
        </Languages> */}
      </Banner>
      <NavLinks>
        {links.map((link: any, i: number) => {
          return (
            <NavLink href={link.fields.link} key={link.sys.id}> 
              {link.fields.name}
            </NavLink>
          )
        })}
      </NavLinks>
      <Credits>
        ©2025 KATIOUCHKAFILMS
      </Credits>
      <>{children}</>
    </Wrapper>
  );
}

export default HomeNavigation

const Logo = styled.img`
  width: 300px;

  @media (max-width: 500px) {
    width: 100%;
  }
`

const Wrapper = styled.div`
  font-family: 'Typnic Headline', sans-serif;
  display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    overflow: hidden;

    @media (max-width: 500px) {
      justify-content: start;
    }
`

const Banner = styled.div`
  align-items: center;
  display: flex;
    justify-content: center; 
`

const Languages = styled.div`
  opacity: 0;
  text-align: end;
  flex: 1; 
`

const Credits = styled.div`
  font-family: 'Typnic Headline', sans-serif;
  font-size: 1rem;
  text-align: center;
  margin: 10px;

  @media (max-width: 500px) {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

const Spacer = styled.div`
`

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -40px; 

  @media (max-width: 500px) {
    margin-top: 5px;
  }
`

const NavLink = styled.a`
  color: black;
  font-size: 1.2rem;
  text-decoration: none;
  &:hover {
    color: white;
  }

`

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  object-fit: cover;

  @media (max-width: 768px) {
    object-fit: contain; 
  }
`