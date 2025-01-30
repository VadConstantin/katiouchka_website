"use client"

import styles from './IntroScreen.module.scss'
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IntroScreenProps {
  onFinish: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish();
    }, 3000)

    return () => clearTimeout(timeout)
  }, [onFinish]);

  return (
    <div className={styles.outerscratch}>
      <div className={styles.innerscratch}>
        <div className={`${styles.background} ${styles.grain}`}>
          <Logo src={'/assets/LOGO_SF.png'} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;

const Logo = styled.img`
  width: 300px;
`;
