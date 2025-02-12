"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface CarouselProps {
  imageUrls: string[];
  workSlug: string;
  talentSlug: string;
}

const Carousel: React.FC<CarouselProps> = ({ imageUrls, workSlug, talentSlug }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      console.log('on scroll !!!!!!')
      if (!containerRef.current) return;

      console.log("SCROLL DETECTÉ ✅", containerRef.current.scrollTop);

      const scrollTop = containerRef.current.scrollTop; // 🔥 Détecte le scroll
      const maxScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const scrollFactor = scrollTop / maxScroll;

      // ✅ Effet de parallaxe proportionnel au scroll
      const newOffsetY = scrollFactor * -50;
      setOffsetY(newOffsetY);
    };

    const container = containerRef.current;
    if (container) {
      console.log('container !!!!')
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // 🎥 Démarrer le carrousel au hover
  const startCarousel = () => {
    if (!intervalRef.current) {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      }, 500);
    }
  };

  // 🛑 Arrêter le carrousel au départ du hover
  const stopCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <CarouselContainer ref={containerRef}>
      {imageUrls.map((url, i) => (
        <CustomLink
          key={i}
          href={`/talents/${talentSlug}/${workSlug}`}
          onMouseEnter={startCarousel}
          onMouseLeave={stopCarousel}
        >
          <Slider
            src={url}
            alt={`Image ${i + 1}`}
            isActive={i === currentIndex}
            offsetY={offsetY}
          />
        </CustomLink>
      ))}
    </CarouselContainer>
  );
};

export default Carousel;

// ➤ Effet parallaxe 🚀
const Slider = styled.img<{ isActive: boolean; offsetY: number }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: translateY(${({ offsetY }) => `${offsetY}px`}); // ✅ Effet de parallaxe
  transition: opacity 0.2s ease-in-out, transform 0.3s ease-out;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: clamp(280px, 80vw, 800px);
  height: clamp(147px, 42vw, 420px);
  overflow-y: auto; /* 🔥 Permet de scroller à l'intérieur */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  border: 2px solid red; /* DEBUG : Affiche bien le container */

  @media (max-width: 800px) {
    width: 98vw;
    height: calc(98vw * 0.525);
  }
`;

const CustomLink = styled.a`
  text-decoration: none;
`;
