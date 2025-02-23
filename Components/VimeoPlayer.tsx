"use client";

import React from "react";
import styled from "styled-components";

interface VimeoPlayerProps {
  videoId: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const VimeoPlayer: React.FC<VimeoPlayerProps> = ({
  videoId,
  autoplay = false,
  loop = false,
  muted = false,
}) => {
  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}`;

  return (
    <FullScreenContainer>
      <Iframe
        src={vimeoUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </FullScreenContainer>
  );
};

export default VimeoPlayer;

const FullScreenContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border: none;
`;

