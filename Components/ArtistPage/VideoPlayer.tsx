"use client";

import React from "react";
import styled from "styled-components";

interface VideoPlayerProps {
  video: any;
  workSlug: string;
  talentSlug: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, workSlug, talentSlug }) => {
  const videoUrl = video[0]?.fields?.file?.url ?? "";
  const disableLink = talentSlug === ""

  return (
    <VideoContainer>
      <CustomLink key={videoUrl} href={`/talents/${talentSlug}/${workSlug}`} disabled={disableLink}>
        <VideoPlay key={videoUrl} autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/mp4" />
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
  height: clamp(220px, 42vw, 500px);
  overflow: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`;


const CustomLink = styled.a<{disabled: boolean}>`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  text-decoration: none;
  position: relative;
  display: block;
`;
