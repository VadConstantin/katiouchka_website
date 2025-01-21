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
  const links = (navMainData.fields.navLinks as any)

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
      <NavLinks>
        {links.map((link: any, i: number) => {
          return (
            <NavLink href={link.fields.link} key={link.sys.id}> 
              {link.fields.name}
            </NavLink>
          )
        })}
      </NavLinks>
      <>{children}</>
    </Wrapper>
  );
}

export default Navigation

const Logo = styled.img`
  width: 300px;
`

const Wrapper = styled.div`
  font-family: 'Typnic Headline', sans-serif;
  display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
`

const Banner = styled.div`
  align-items: center;
  display: flex;
    justify-content: space-between; 
`

const Languages = styled.div`
  opacity: 0;
  text-align: end;
  flex: 1; 
`

const Spacer = styled.div`
  flex: 1; 
`

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -40px; 
`

const NavLink = styled.a`
  color: black;
  font-size: 1rem;
  text-decoration: none;

`