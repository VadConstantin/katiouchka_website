"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface CarouselProps {
  imageUrls: string[];
  workSlug: string;
  talentSlug: string;
  photoDisposition: string;
}

const Carousel: React.FC<CarouselProps> = ({ imageUrls, workSlug, talentSlug, photoDisposition }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localOffsetY, setLocalOffsetY] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
  
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
  
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = (viewportHeight - rect.top) / viewportHeight;
        setLocalOffsetY(progress * 120);
      }
    };
  
    handleScroll();
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  const handleMouseEnter = () => {
    if (!intervalRef.current) {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <CarouselContainer ref={containerRef} photoDisposition={photoDisposition}>
      <ImageWrapper>
        {imageUrls.map((url, i) => (
          <CustomLink
            key={i}
            href={`/talents/${talentSlug}/${workSlug}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Slider
              src={url}
              alt={`Image ${i + 1}`}
              isActive={i === currentIndex}
              offsetY={localOffsetY}
            />
          </CustomLink>
        ))}
      </ImageWrapper>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div<{ photoDisposition: string }>`
  position: relative;
  width: ${({ photoDisposition }) =>
    photoDisposition === "portrait" ? "clamp(180px, 40vw, 500px)" : "clamp(280px, 100%, 1000px)"};
  height: ${({ photoDisposition }) =>
    photoDisposition === "portrait" ? "clamp(320px, 42vw, 1000px)" : "clamp(180px, 42vw, 500px)"};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Slider = styled.img<{ isActive: boolean; offsetY: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 160%;
  height: 160%;
  object-position: bottom;
  object-fit: cover;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};

  transform: translateY(${({ offsetY }) => `${offsetY}px`});
  transition: transform 0.1s ease-out;

  @media (max-width: 550px) {
    width: 160%;
    height: 160%;
    transform: translateY(${({ offsetY }) => `${offsetY * 0.5}px`});
    transition: transform 0.1s ease-out;
  }
`;

const CustomLink = styled.a`
  text-decoration: none;
`;







