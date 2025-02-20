"use client"

import styles from './IntroScreen.module.scss'
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface IntroScreenProps {
  onFinish: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish();
    }, 3000); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <IntroContainer>
      <div className={`${styles.outerscratch} ${styles.fullscreen}`}>
        <div className={`${styles.innerscratch} ${styles.fullscreen}`}>
          <div className={`${styles.background} ${styles.grain} ${styles.fullscreen}`}>
            <ZoomLogo src={'/assets/LOGO_SF.png'} alt="logo" />
          </div>
        </div>
      </div>
      <BlackOverlay />
    </IntroContainer>
  );
};

export default IntroScreen;



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
  background: #A60100;
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
