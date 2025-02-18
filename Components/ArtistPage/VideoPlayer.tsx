"use client";

import React, { useState } from "react";
import styled from "styled-components";

interface VideoPlayerProps {
  video: any;
  workSlug: string;
  talentSlug: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, workSlug, talentSlug }) => {
  const videoUrl = video[0]?.fields?.file?.url ?? "";

  return (
    <VideoContainer>
      <CustomLink key={videoUrl} href={`/talents/${talentSlug}/${workSlug}`}>
        <VideoPlay key={videoUrl} autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/webm" />
        </VideoPlay>
      </CustomLink>
    </VideoContainer>
  );
};

export default VideoPlayer;

const VideoPlay = styled.video`
  width: 150%;
  height: 150%;
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


const CustomLink = styled.a`
  text-decoration: none;
  position: relative;
  display: block;
`;
