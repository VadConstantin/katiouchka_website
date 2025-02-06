"use client"

import styled from 'styled-components';
import { INavigation } from "../../Types/contentful";
import { Entry } from 'contentful';

interface NavigationProps {
  navMainData: Entry<INavigation>
  credits?: boolean
  isLogoNegative?: boolean
}

const TalentsNavigation:React.FC<NavigationProps> = ({ navMainData, credits, isLogoNegative }) => {
  const logoUrl = (navMainData?.fields?.logo as any)?.fields?.file?.url;
  const links = (navMainData.fields.navLinks as any)

  return(
    <NavWrapper>
      <a href="/">
        { isLogoNegative ? <LogoNegative src={logoUrl} alt="logo" /> : <Logo src={logoUrl} alt="logo" /> }
      </a>
      <NavLinks>
        {links.map((link: any, i: number) => {
          return (
            <NavLink href={link.fields.link} key={link.sys.id}> 
              {link.fields.name}
            </NavLink>
          )
        })}
      </NavLinks>
      {credits && 
        <Credits>
          ©2025 KATIOUCHKAFILMS
        </Credits>}
    </NavWrapper>
  )
}

export default TalentsNavigation;


const NavLinks = styled.div`

  display: flex;
    justify-content: space-between;
  position: absolute;
  bottom: 5px;
  left: 0%;
  right: 0;
  padding: 0 10px 0 10px;

  @media (max-width: 550px) {
    width: 100%;
    justify-content: space-between;
  } 
`

const LogoNegative = styled.img`
  width: 300px;
  mix-blend-mode: difference;
  filter: invert(1) grayscale(100%) contrast(10%);
  &:hover {
    mix-blend-mode: normal; 
    filter: none; 
  }

  @media (max-width: 550px) {
    width: 100%;
    opacity: 1;
    color: black;
  }
`

const Logo = styled.img`
  width: 300px;
  &:hover {
    mix-blend-mode: normal; 
    filter: none; 
  }

  @media (max-width: 550px) {
    width: 100%;
    opacity: 1;
    color: black;
  }
`



const NavLink = styled.a`
  color: black;
  font-size: 1.2rem;
  text-decoration: none;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`

const NavWrapper = styled.div`
  padding-bottom: 80px;
  text-align: center;

`

const Credits = styled.div`
  font-family: 'Typnic Headline', sans-serif;
  font-size: 1rem;
  margin: 10px; 
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
`