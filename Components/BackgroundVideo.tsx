"use client"

import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface BackgroundVideoProps {
  video: any;
  margin?: number
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ video, margin }) => {
  const videoUrl = video?.fields?.file?.url || '';

  const [activeVideo, setActiveVideo] = useState(videoUrl); 
  const [nextVideo, setNextVideo] = useState<string | null>(null); 
  const [isTransitioning, setIsTransitioning] = useState(false); 

  useEffect(() => {
    if (videoUrl && videoUrl !== activeVideo) {
      setNextVideo(videoUrl);
      setIsTransitioning(true);
    }
  }, [videoUrl]);

  const handleTransitionEnd = () => {
    setActiveVideo(nextVideo);
    setNextVideo(null);
    setIsTransitioning(false);
  };

  return (
    <VideoContainer >
      <VideoBackground 
        key={activeVideo} 
        autoPlay loop muted playsInline 
        className={!isTransitioning ? "visible" : "hidden"}
        style={margin ? { marginTop: `${margin}px` } : {}}
      >
        <source src={activeVideo} type="video/webm" />
      </VideoBackground>

      {nextVideo && (
        <VideoBackground 
          key={nextVideo} 
          autoPlay loop muted playsInline 
          className="fading-in" 
          onLoadedData={handleTransitionEnd}
        >
          <source src={nextVideo} type="video/webm" />
        </VideoBackground>
      )}
    </VideoContainer>
  );
};

export default BackgroundVideo;

const VideoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 101%;
  z-index: -1;
`;

const VideoBackground = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.8s ease-in-out;
  

  &.visible {
    opacity: 1;
  }

  &.hidden {
    opacity: 0;
  }

  &.fading-in {
    opacity: 0;
    animation: fadeIn 0.8s ease-in-out forwards;
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

