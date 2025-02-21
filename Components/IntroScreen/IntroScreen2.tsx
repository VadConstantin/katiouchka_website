"use client"

import styles from './IntroScreen.module.scss'
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Asset } from 'contentful';

interface IntroScreenProps {
  onFinish: () => void;
  introVideo: any;
  length: string
}

const IntroScreen2: React.FC<IntroScreenProps> = ({ onFinish, introVideo, length }) => {
  const videoUrl = introVideo.fields.file.url
  const lengthNumber = Number(length)

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish();
    }, lengthNumber); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <IntroContainer>
      <VideoContainer>
        <VideoPlayer key={videoUrl} autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/webm" />
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


const ZoomLogo = styled.img`
  width: 98%; /* Réduit un peu la largeur pour laisser de l'espace */
  height: auto;
  position: absolute;
  bottom: 20px; /* Ajoute du padding en bas */
  left: 50%; /* Centre horizontalement */
  transform: translateX(-50%); /* Assure le centrage parfait */
  transform-origin: center;
  animation: ${zoomIn} 2s cubic-bezier(1, 0, 1, 0) 1s forwards;
`;

const BlackOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
  animation: ${fadeToBlack} 2s ease-in 2.5s forwards;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
`;

const VideoContainer = styled.div`
  position: relative;
  width: clamp(280px, 100%, 1000px);
  height: clamp(180px, 42vw, 500px);
  overflow: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`;
