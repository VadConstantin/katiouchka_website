"use client";
import styled from "styled-components";
import { IWork } from '@/Types/contentful';
import Carousel from "../ArtistPage/Carousel";
import VideoPlayer from "../ArtistPage/VideoPlayer";

interface WorkProps {
  work: IWork;
  talentSlug?: string;
  talentName?: string
}

const Work: React.FC<WorkProps> = ({ work, talentSlug, talentName }) => {
  const urls = work.fields.medias.map((media: any) => media?.fields?.file?.url) ?? [];
  const workName = work.fields.name || ''
  const video = work.fields.medias
  const photoDisposition = work.fields.photoDisposition ?? 'landscape'

  return (
    <WorkWrapper>
      {work.fields.typeOfMedia === 'photo(s)' && (
        <Carousel
          imageUrls={urls}
          workSlug={work.fields.slug}
          talentSlug={talentSlug || ""}
          photoDisposition={photoDisposition}
        />
      )}
      {work.fields.typeOfMedia === 'video(s)' && (
        <VideoPlayer
          video={video}
          workSlug={work.fields.slug}
          talentSlug={talentSlug || ""}
        />
      )}
      {work.fields.typeOfMedia === 'audio(s)' && (
        <VideoPlayer
          video={video}
          audio
          workSlug={work.fields.slug}
          talentSlug={talentSlug || ""}
        />
      )}
      <WorkTitle>{workName}</WorkTitle>
    </WorkWrapper>
  );
};

export default Work;

const WorkWrapper = styled.div`
  display: flex;
    flex-direction: column;
    gap: 5px;
  padding-bottom: 10px;
  width: 100%;
  align-items: center;
`;

const WorkTitle = styled.div`
  font-family: 'Diatype', sans-serif;
  font-size: 0.8rem;
`


