"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface VideoPlayerProps {
  video: any;
  workSlug: string;
  talentSlug: string;
  audio?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, workSlug, talentSlug, audio }) => {
  const videoUrl = video[0]?.fields?.file?.url ?? "";
  const disableLink = talentSlug === "";
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

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
      {audio &&       
        <MuteButton onClick={toggleMute}>
          <span>{isMuted ? "PLAY SOUNDTRACK" : "MUTE SOUNDTRACK"}</span>
        </MuteButton>}
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
  /* max-width: 1000px; */
  aspect-ratio: 16 / 9; 
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

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
  border-radius: 10px;
`;


const MuteButton = styled.div`
  font-family: 'Diatype', sans-serif;
  position: absolute;
  width: 500px;
  bottom: 4px;
  right: 5px;
  text-align: end;
  mix-blend-mode: difference !important;
  span {
    color: white !important; 
  }
  border: none;
  padding: 5px 10px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: white !important;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;