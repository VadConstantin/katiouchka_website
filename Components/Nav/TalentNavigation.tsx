"use client"

import styled from 'styled-components';
import { INavigation } from "../../Types/contentful";
import { Entry } from 'contentful';

interface TalentNavigationProps {
  navMainData: Entry<INavigation>
  credits?: boolean
}

const TalentNavigation:React.FC<TalentNavigationProps> = ({ navMainData, credits }) => {
  const logoUrl = (navMainData?.fields?.logo as any)?.fields?.file?.url;
  const links = (navMainData.fields.navLinks as any)

  return(
    <NavWrapper>
      <a href="/">
        <Logo src={logoUrl} alt="logo" /> 
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

export default TalentNavigation;

const NavLinks = styled.div`

  display: flex;
    justify-content: space-between;
  width: 300px;
  bottom: 5px;
  left: 0%;
  right: 0;
  padding: 0 10px 0 10px;

  @media (max-width: 550px) {
    width: 100%;
    justify-content: space-between;
  } 
`

const Logo = styled.img`
  width: 300px;
  &:hover {
    mix-blend-mode: normal; 
    filter: none; 
    opacity: 50%;
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
  position: relative;
  display: inline-block; 
  padding-bottom: 2px; 

  &:hover {
    /* opacity: 0.7; */
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 4px;
    background-color: black;
    transition: width 0.2s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

const NavWrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  z-index: 10000;
  background-color: white;
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

