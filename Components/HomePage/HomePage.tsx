"use client"

import styled from 'styled-components';
import { Entry } from 'contentful';
import { IHomePage } from '@/Types';

interface HomePageProps {
  homePageData: Entry<IHomePage>
}

const HomePage:React.FC<HomePageProps> = ({ homePageData }) => {
  const videoUrl = (homePageData?.fields?.backgroundVideo as any).fields?.file?.url || ''

  if (!homePageData) {
    return <div>Chargement...</div>;
  }

  return(
    <Wrapper>
      {videoUrl && (
        <VideoBackground autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </VideoBackground>
      )}
    </Wrapper>
  )
}

export default HomePage;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  object-fit: cover;
`

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
`;