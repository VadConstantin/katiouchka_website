"use client"
import styled from "styled-components";
import { IWork } from '@/types/contentful';
import Carousel from "../ArtistPage/Carousel";

interface WorkProps {
  work: IWork
}

const Work:React.FC<WorkProps> = ({ work }) => {

  const urls = work.fields.medias.map((media: any) => {
    return media.fields.file.url
  }) ?? []


  return(
    <Wrapper>
      {work.fields.typeOfMedia === 'photo(s)' && 
        <Carousel urls={urls}/>
      }

      { work.fields.name }
      { work.fields.typeOfMedia}
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