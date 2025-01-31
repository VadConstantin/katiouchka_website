"use client"

import styled from 'styled-components';
import { INavigation } from "../../Types/contentful";
import { Entry } from 'contentful';


interface NavigationProps {
  navMainData: Entry<INavigation>
  credits?: boolean
}

const TalentsNavigation:React.FC<NavigationProps> = ({ navMainData, credits }) => {
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

export default TalentsNavigation;


const NavLinks = styled.div`

  display: flex;
    justify-content: space-between;
  width: 300px;

  @media (max-width: 550px) {
    width: 100%;
    justify-content: space-between;
  } 
`

const Logo = styled.img`
  width: 300px;

  @media (max-width: 550px) {
    width: 100%;
  }
`

const NavLink = styled.a`
  color: black;
  font-size: 1.2rem;
  text-decoration: none;
  &:hover {
    opacity: 0.3;
  }
`

const NavWrapper = styled.div`
  padding-bottom: 80px;
`

const Credits = styled.div`
  font-family: 'Typnic Headline', sans-serif;
  font-size: 1rem;
  margin: 10px; 
  position: absolute;
  bottom: 0;
  left: 0;
`