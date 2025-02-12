"use client"
import styled from "styled-components";
import { IWork } from '@/types/contentful';
import Carousel from "../ArtistPage/Carousel";

interface WorkProps {
  work: IWork
  talentSlug: string
}

const Work:React.FC<WorkProps> = ({ work, talentSlug }) => {

  const urls = work.fields.medias.map((media: any) => {
    return media.fields.file.url
  }) ?? []


  return(
    <Wrapper>
      {work.fields.typeOfMedia === 'photo(s)' && 
        <Carousel imageUrls={urls} workSlug={work.fields.slug} talentSlug={talentSlug}/>
      }
      { work.fields.name }
    </Wrapper>
  )
}

export default Work

const Wrapper = styled.div`
  font-family: 'Diatype', sans-serif;
  display: flex;
    flex-direction: column;
    gap: 2px;
`