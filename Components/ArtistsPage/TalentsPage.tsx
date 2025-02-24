"use client"

import TalentsNavigation from "../Nav/TalentsNavigation"
import { IArtist, INavigation } from "../../Types/contentful";
import { Entry } from 'contentful';
import styled from 'styled-components';
import BackgroundVideo from "../BackgroundVideo";
import { useState, useMemo } from "react";

interface TalentsPageProps {
  navMainData: Entry<INavigation>;
  talentsPageData: Array<Entry<IArtist>>;
}

const TalentsPage:React.FC<TalentsPageProps> = ({ talentsPageData, navMainData }) => {

  const sortedTalents = talentsPageData.sort((a, b) => (a.fields.orderOfAppearance as any ?? 0) - (b.fields.orderOfAppearance as any ?? 0))
  const [hoveredTalent, setHoveredTalent] = useState<Entry<IArtist> | null>(sortedTalents[0]);

  const handleMouseEnter = (talent: Entry<IArtist>) => {
    if (hoveredTalent !== talent.fields.name as any) {
      setHoveredTalent(talent); 
    }
  };

  const memoizedVideo = useMemo(() => hoveredTalent?.fields.backgroundVideo, [hoveredTalent]);

  return (
    <Wrapper>
      <TalentsNavigation navMainData={navMainData} credits />
      <BackgroundVideo video={memoizedVideo} margin={0} />
      <TalentsWrapper>
        {sortedTalents.map((talent) => (
          <Talent 
            key={talent.sys.id} 
            href={`/talents/${talent.fields.slug}`} 
            onMouseEnter={() => handleMouseEnter(talent)}
          >
            <Name>{talent.fields.name as any}</Name>
            <Type>{talent.fields.type as any}</Type>
          </Talent>
        ))}
      </TalentsWrapper>
    </Wrapper>
  );
};

export default TalentsPage

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0.5rem;
  position: relative;
`;

const Talent = styled.a`
  /* letter-spacing: -2px; */
  font-family: 'Diatype', sans-serif;
  opacity: 0.2;
  text-decoration: none;
  color: black;
  display: block;
  line-height: 0.8;
  overflow: hidden;

  &:hover {
    opacity: 1;
    mix-blend-mode: difference;
    filter: invert(1) grayscale(100%) contrast(10%);
  }

  @media (max-width: 700px) {
    line-height: 1.2;
    opacity: 0.8;
  }
`

const TalentsWrapper = styled.div`
  display: flex;
    flex-direction: column;
    
  /* @media (max-width: 700px) {
    gap: 15px;
  } */
`

const Type = styled.div`
  font-size: clamp(0.5rem, 3vw, 3rem); 
  display: inline;
  margin-left: 0.1rem;
  position: relative;
  top: clamp(-38px, -2vw, -1px);

  @media (max-width: 700px) {
    letter-spacing: 0px;
    font-size: clamp(0.8rem, 3vw, 3rem); 
  }
`;


const Name = styled.div`
  display: inline;
  white-space: wrap;
  font-size: clamp(1rem, 6vw, 6rem);
  text-transform: uppercase;

  @media (max-width: 700px) {
    font-size: clamp(2rem, 6vw, 6rem);
  }
`;
