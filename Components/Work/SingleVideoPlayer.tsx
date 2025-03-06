import { useRef, useState } from 'react'
import styled from 'styled-components';

interface SingleVideoPlayerProps {
  videoUrl: string
}

const SingleVideoPlayer: React.FC<SingleVideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <VideoWrapper>
      <VideoPlayer ref={videoRef} autoPlay loop muted={isMuted} playsInline>
        <source src={videoUrl} type="video/mp4" />
      </VideoPlayer>
      <MuteButton onClick={toggleMute}>
        <span>{isMuted ? "PLAY SOUNDTRACK" : "MUTE SOUNDTRACK"}</span>
      </MuteButton>
    </VideoWrapper>
  );
};

export default SingleVideoPlayer

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const VideoPlayer = styled.video`
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
  border-radius: 10px;
`

// const MuteButton = styled.button`
//   position: absolute;
//   bottom: 10px;
//   right: 10px;
//   background: rgba(0,0,0,0.7);
//   span {
//     color: white !important; // Le texte reste blanc
//   }
//   border: none;
//   padding: 5px 10px;
//   font-size: 16px;
//   cursor: pointer;
//   border-radius: 5px;

//   &:hover {
//     background: rgba(0,0,0,0.9);
//   }
// `;


const MuteButton = styled.div`
  position: absolute;
  width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  mix-blend-mode: difference !important;
  span {
    color: white !important; 
  }
  border: none;
  padding: 5px 10px;
  font-size: 30px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: white !important;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;







