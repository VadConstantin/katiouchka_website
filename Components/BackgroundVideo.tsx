"use client"

import styled from 'styled-components';

interface BackgroundVideoProps {
  homePageData: any
}

const BackgroundVideo:React.FC<BackgroundVideoProps> = ({ homePageData }) => {
  const videoUrl = (homePageData?.fields?.backgroundVideo as any).fields?.file?.url || ''

  return(
    <>
      {videoUrl && (
        <VideoBackground autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </VideoBackground>
      )}
    </>
  )
}

export default BackgroundVideo;

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