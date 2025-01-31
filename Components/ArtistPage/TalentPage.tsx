"use client"

import TalentsNavigation from '@/Components/Nav/TalentsNavigation';
import { IArtist, INavigation } from '@/types/contentful';
import { Entry } from 'contentful';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface TalentPageProps {
  navMainData: Entry<INavigation>
  talentData: Entry<IArtist>
}

const TalentPage: React.FC<TalentPageProps> = ({ navMainData, talentData }) => {
  const works = Array.isArray(talentData.fields.works) ? talentData.fields.works : [];
  const talentLinks = ["PROJECTS", "BIOGRAPHY"];
  const bioFR = talentData.fields.biography;
  const bioEN = talentData.fields.biographyEn;
  const bioIT = talentData.fields.biographyIt;

  const [tabToDisplay, setTabToDisplay] = useState("PROJECTS");

  const handleClick = (link: string) => {
    setTabToDisplay(link);
  };

  return (
    <TalentWrapper>
      <TalentsNavigation navMainData={navMainData} />
      
      <ContentWrapper> 
        <TabContent key={tabToDisplay}>
          {tabToDisplay === 'PROJECTS' && works.length > 0 && (
            <Works>
              {works.map((work) => (
                <div key={work.sys.id}>{work.fields.name}</div>
              ))}
            </Works>
          )}
          {tabToDisplay === 'BIOGRAPHY' && 
            <Bios>
              <Bio>
                <BioTitle>FR</BioTitle>
                {bioFR as any}
              </Bio>
              <Bio>
                <BioTitle>EN</BioTitle>
                {bioEN as any}
              </Bio>
              <Bio>
              <BioTitle>IT</BioTitle>
                {bioIT as any}
              </Bio>
            </Bios>
          }
        </TabContent>
      </ContentWrapper>

      <BottomWrapper>
        <Name>{talentData?.fields?.name as any}</Name>
        <Links>
          {talentLinks.map((link) => (
            <TalentLink key={link} onClick={() => handleClick(link)}>
              {link}
            </TalentLink>
          ))}
        </Links>
      </BottomWrapper>
    </TalentWrapper>
  );
};

export default TalentPage;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TalentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0.5rem;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TabContent = styled.div`
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Works = styled.div`
  display: flex;
`;

const BottomWrapper = styled.div`
  margin-top: auto;
  background: white;
  padding-bottom: 1rem;
  padding-top: 50px;
  z-index: 10;
`;

const Name = styled.div`
  font-family: 'Diatype', sans-serif;
  font-size: clamp(3rem, 10vw, 6rem);
  text-transform: uppercase;
  line-height: 0.8;
  margin-left: 0px;
`;

const TalentLink = styled.button`
  font-family: inherit;
  background: none;
  border: none;
  color: black;
  font-size: 1.2rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 0.3;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
`;

const Bios = styled.div`
  font-size: clamp(0.8rem, 10vw, 1rem);
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 3rem;
`;

const Bio = styled.div`
  font-family: 'Diatype', sans-serif;
  line-height: 1;
  max-width: 500px;
  min-width: 350px;
`;

const BioTitle = styled.div`
  font-family: 'Typnic Headline', sans-serif;
`;
