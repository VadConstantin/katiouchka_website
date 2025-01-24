"use client"


import styles from './IntroScreen.module.scss'


import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const IntroScreen: React.FC = () => {
  // const [showIntro, setShowIntro] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowIntro(false);
  //   }, 3000); // Durée de l'intro en ms

  //   return () => clearTimeout(timeout); // Nettoyage du timeout
  // }, []);

  // if (!showIntro) return null;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.katiouchka}>
        KATIOUCHKA
      </h1>
      <div className={styles.outerscratch}>
        <div className={styles.innerscratch}>
          <div className={`${styles.background} ${styles.grain}`}></div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;




