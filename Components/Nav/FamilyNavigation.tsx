"use client"

import styled from 'styled-components';
import { INavigation } from "../../Types/contentful";
import { Entry } from 'contentful';
import { useRouter } from "next/router";

interface NavigationProps {
  navMainData: Entry<INavigation>
  credits?: boolean
  isLogoNegative?: boolean
}

const FamilyNavigation:React.FC<NavigationProps> = ({ navMainData, credits, isLogoNegative }) => {
  const logoUrl = (navMainData?.fields?.logo as any)?.fields?.file?.url;
  const links = (navMainData.fields.navLinks as any)

  const router = useRouter()
  const currentPath = router.asPath;

  return(
    <>
      <NavWrapper>
        <a href="/">
          { isLogoNegative ? <LogoNegative src={logoUrl} alt="logo" /> : <Logo src={logoUrl} alt="logo" /> }
        </a>
        <NavLinks>
          {links.map((link: any, i: number) => {
            const isActive = currentPath === link.fields.link;
            return (
              <NavLink href={link.fields.link} key={link.sys.id} isActive={isActive}> 
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
    </>
  )
}

export default FamilyNavigation;


const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: auto;

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
  opacity: 1;
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

const NavLink = styled.a<{ isActive: boolean }>`
  color: black;
  font-size: 1.2rem;
  text-decoration: none;
  position: relative;
  display: inline-block;
  padding-bottom: 2px;

  &::after {
    content: "";
    position: absolute;
    left: 2px;
    right: 2px;
    bottom: 0;
    height: 4px;
    background-color: black;
    transition: width 0.2s ease-in-out;
    width: ${({ isActive }) => (isActive ? "calc(100% - 4px)" : "0%")};
  }

  &:hover::after {
    width: calc(100% - 4px);
  }
`;

const NavWrapper = styled.div`
  padding-bottom: 30px;
  text-align: center;
  top: 5px;
  @media (max-width: 550px) {
    margin: 0 5px;
  } 

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