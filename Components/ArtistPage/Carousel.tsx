"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface CarouselProps {
  urls: string[]
}

const Carousel:React.FC<CarouselProps> = ({ urls }) => {

  const [ currentIndex, setCurrentIndex ] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % urls.length) 
    }, 500)

    return () => clearInterval(interval);

  }, [urls])

  return(
    <CarouselContainer>
      {urls.map((url, i) => {
        return (
          <Slider
          key={i}
          src={url}
          alt={`Image ${i + 1}`}
          isActive={i === currentIndex}
        />
        )
      })

      }
    </CarouselContainer>
  )
  
}

export default Carousel

const Slider = styled.img<{isActive: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
`

const CarouselContainer = styled.div`
  position: relative;
  width: clamp(280px, 80vw, 800px);
  height: clamp(147px, 42vw, 420px);
  overflow: hidden;

  @media (max-width: 800px) {
    width: 98vw;
    height: calc(98vw * 0.525);
  }
`;
