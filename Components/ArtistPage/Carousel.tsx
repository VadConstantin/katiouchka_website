"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface CarouselProps {
  imageUrls: string[];
  workSlug: string;
  talentSlug: string;
  scrollOffset: number;
}

const Carousel: React.FC<CarouselProps> = ({ imageUrls, workSlug, talentSlug, scrollOffset }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  console.log('scroll carousel --->', scrollOffset)

  const startCarousel = () => {
    if (!intervalRef.current) {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      }, 500);
    }
  };

  const stopCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <CarouselContainer>
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
            offsetY={scrollOffset}
          />
        </CustomLink>
      ))}
    </CarouselContainer>
  );
};

export default Carousel;

const Slider = styled.img<{ isActive: boolean; offsetY: number }>`
  position: absolute;
  left: 0;
  width: 120%;
  height: 120%;
  object-fit: cover;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: translateY(${({ offsetY }) => `${-offsetY * 0.2}px`});
  transition: opacity 0.2s ease-in-out, transform 0.1s ease-out; 
`;

const CarouselContainer = styled.div`
  position: relative;
  width: clamp(280px, 80vw, 800px);
  height: clamp(147px, 42vw, 420px);
  overflow: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 800px) {
    width: 98vw;
    height: calc(98vw * 0.525);
  }
`;

const CustomLink = styled.a`
  text-decoration: none;
`;
