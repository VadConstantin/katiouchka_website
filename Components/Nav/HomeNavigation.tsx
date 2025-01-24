"use client"

import styled from 'styled-components';
import { INavigation } from "../../Types/contentful";
import { Entry } from 'contentful';


interface NavigationProps {
  navMainData: Entry<INavigation>
  locale: string;
  onLocaleChange: (newLocale: string) => void;
}

const HomeNavigation:React.FC<NavigationProps> = ({ navMainData, onLocaleChange, locale }) => {
  const logoUrl = (navMainData?.fields?.logo as any)?.fields?.file?.url;
  const links = (navMainData.fields.navLinks as any)

  return(
    <>
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
    </>
  )
}

export default HomeNavigation;


const Banner = styled.div`
  align-items: center;
  display: flex;
    justify-content: center; 
`

const Languages = styled.div`
  opacity: 1;
  text-align: end;
  flex: 1; 
`

const Spacer = styled.div`
`

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -40px; 

  @media (max-width: 450px) {
    margin-top: 5px;
  }
`

const Logo = styled.img`
  width: 300px;

  @media (max-width: 450px) {
    width: 100%;
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

const Credits = styled.div`
  font-family: 'Typnic Headline', sans-serif;
  font-size: 1rem;
  text-align: center;
  margin: 10px;

  @media (max-width: 450px) {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`