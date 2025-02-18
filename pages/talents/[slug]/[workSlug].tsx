import { GetServerSideProps } from 'next';
import { getNavigationData, getTalentData, getTalentWorkData } from '@/Services/get_contentful_data';
import { IArtist, INavigation, IWork } from '@/types/contentful';
import TalentNavigation from '@/Components/Nav/TalentNavigation';
import { Entry } from 'contentful';
import styled from 'styled-components';

interface WorkPageDataProps {
  workPageData: IWork
  navMainData: Entry<INavigation>
  talentData: IArtist
}

const WorkPage:React.FC<WorkPageDataProps> = ({ workPageData, navMainData, talentData }) => {
  const description = workPageData.fields.description ?? ''
  const talentSlug = talentData.fields.slug
  const workTitle = workPageData.fields.name
  const imagesUrls = workPageData.fields.medias.map((media: any) => media.fields.file.url) ?? [];
  const typeOfMedia = workPageData.fields.typeOfMedia
  const videoUrl = workPageData.fields.medias[0].fields.file?.url || ''

  return(
    <WorkPageWrapper>
      <TalentNavigation navMainData={navMainData} />
      <ContentWrapper>
        <Texts>
          <WorkTitle>
            {workTitle}
          </WorkTitle>
          <Description>
            {description}
          </Description>
        </Texts>
        {typeOfMedia === 'photo(s)' 
        ? <Images>
          {imagesUrls.map((url, index) => {
            return(
              <Img src={url} key={index}/>
            )
          })}
        </Images>
        : <VideoPlayer key={videoUrl as any} autoPlay loop muted playsInline>
            <source src={videoUrl as any} type="video/webm" />
          </VideoPlayer>
        }
      </ContentWrapper>
      <BottomWrapper>
        <Name>{talentData.fields.name}</Name>
        <Links>
          <CustomLink href={'/talents/'+ talentSlug}>{"< BACK"}</CustomLink>
        </Links>
      </BottomWrapper>
    </WorkPageWrapper>
  )
}

export default WorkPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {slug, workSlug} = context.query
  const locale = context.query.locale || 'fr';
  const navMainData = await getNavigationData(locale as string)
  const workPageData = await getTalentWorkData(workSlug as string)
  const talentData = await getTalentData(slug as string)

  return {
    props: {
      workPageData,
      navMainData,
      talentData
    },
  }
}

const WorkPageWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;
  padding: 5px;
`

const BottomWrapper = styled.div`
  position: sticky;
  bottom: 0;
  background: white;
  padding-bottom: 1rem;
  padding-top: 20px;
  z-index: 10000;
`;

const Links = styled.div`
  font-family: 'Typnic Headline', sans-serif;
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  
  @media (max-width: 650px) {
    padding-top: 15px;
  }
`;

const Name = styled.div`
  font-family: 'Diatype', sans-serif;
  font-size: clamp(3rem, 10vw, 6rem);
  text-transform: uppercase;
  line-height: 0.8;
  margin-left: 0px;
`;

const CustomLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  &:hover {
    opacity: 0.3;
  }
`

const ContentWrapper = styled.div`
  flex-grow: 1;
  font-family: 'Diatype', sans-serif;
  padding: 50px 0 50px 0;
  display: flex;
    flex-wrap: wrap;
    gap: 30px;
`;

const WorkTitle = styled.div`
  font-size: 3rem;
`

const Description = styled.div`
  text-align: justify;
`

const Texts = styled.div`
  max-width: 500px;
`

const Images = styled.div`
  display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Img = styled.img`
  max-width: 100%;
`

const VideoPlayer = styled.video`
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
  /* height: 800px; */
`