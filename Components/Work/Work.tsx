"use client";
import styled from "styled-components";
import { IWork } from '@/types/contentful';
import Carousel from "../ArtistPage/Carousel";

interface WorkProps {
  work: IWork;
  talentSlug: string;
  scrollOffset: number;
}

const Work: React.FC<WorkProps> = ({ work, talentSlug, scrollOffset }) => {
  const urls = work.fields.medias.map((media: any) => media.fields.file.url) ?? [];

  return (
    <Wrapper>
      {work.fields.typeOfMedia === 'photo(s)' && (
        <Carousel
          imageUrls={urls}
          workSlug={work.fields.slug}
          talentSlug={talentSlug}
          scrollOffset={scrollOffset}
        />
      )}
      {work.fields.name}
    </Wrapper>
  );
};

export default Work;

const Wrapper = styled.div`
  font-family: 'Diatype', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
