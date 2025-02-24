"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface VideoPlayerProps {
  video: any;
  workSlug: string;
  talentSlug: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, workSlug, talentSlug }) => {
  const videoUrl = video[0]?.fields?.file?.url ?? "";
  const disableLink = talentSlug === "";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tryPlay = () => {
      if (videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay bloqué sur iOS", error);
          });
        }
      }
    };

    tryPlay();
  }, []);

  return (
    <VideoContainer>
      <CustomLink key={videoUrl} href={`/talents/${talentSlug}/${workSlug}`} disabled={disableLink}>
        <VideoPlay
          ref={videoRef}
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </VideoPlay>
      </CustomLink>
    </VideoContainer>
  );
};

export default VideoPlayer;


const CustomLink = styled.a<{ disabled: boolean }>`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  text-decoration: none;
  position: relative;
  display: block;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  aspect-ratio: 16 / 9; 
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    max-width: 100%;
  }

  @media (max-width: 400px) {
    max-width: 100%;
  }
`;

const VideoPlay = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.3s ease-in-out;
`;




