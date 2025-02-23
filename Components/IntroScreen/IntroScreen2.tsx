"use client"

import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

interface IntroScreenProps {
  onFinish: () => void;
  introVideo: any;
  length: string; // Durée avant l'exécution de onFinish()
}

const IntroScreen2: React.FC<IntroScreenProps> = ({ onFinish, introVideo, length }) => {
  const videoUrl = introVideo.fields.file.url;
  const lengthNumber = Number(length);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ✅ Force autoplay sur iOS
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

    // ✅ Lecture déclenchée par interaction utilisateur sur iOS
    const handleInteraction = () => {
      tryPlay();
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("click", handleInteraction);

    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  // ✅ Timeout pour exécuter onFinish() après la durée spécifiée
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish();
    }, lengthNumber);

    return () => clearTimeout(timeout);
  }, [lengthNumber, onFinish]);

  return (
    <IntroContainer>
      <VideoContainer>
        <VideoPlayer
          ref={videoRef}
          key={videoUrl}
          autoPlay
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

// ✅ Animations CSS
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

// ✅ Styles principaux
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
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
`;
