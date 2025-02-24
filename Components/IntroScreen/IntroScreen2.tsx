"use client"

import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

interface IntroScreenProps {
  onFinish: () => void;
  introVideo: any;
  length: string;
}

const IntroScreen2: React.FC<IntroScreenProps> = ({ onFinish, introVideo, length }) => {
  const videoUrl = introVideo.fields.file.url;
  const lengthNumber = Number(length);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish();
    }, lengthNumber);

    return () => clearTimeout(timeout);
  }, []);

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
    <IntroContainer>
      <VideoContainer>
        <VideoPlayer
          ref={videoRef}
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </VideoPlayer>
      </VideoContainer>
    </IntroContainer>
  );
};

export default IntroScreen2;

const zoomIn = keyframes`
  0% {
    transform: translateX(-50%) scale(1);
  }
  100% {
    transform: translateX(-50%) scale(100);
  }
`;

const fadeToBlack = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const IntroContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: black;
  z-index: 9999;
`;

const VideoContainer = styled.div`
  position: relative;
  width: clamp(280px, 100%, 1000px);
  height: clamp(180px, 42vw, 500px);
  overflow: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 450px) {
    top: -50px;
  }
  
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
`;

