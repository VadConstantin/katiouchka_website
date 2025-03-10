import { GetServerSideProps } from 'next';
import { getNavigationData, getTalentData, getTalentWorkData } from '@/Services/get_contentful_data';
import { IArtist, INavigation, IWork } from '@/Types/contentful';
import TalentNavigation from '@/Components/Nav/TalentNavigation';
import { Entry } from 'contentful';
import styled from 'styled-components';
import SingleVideoPlayer from '@/Components/Work/SingleVideoPlayer';

interface WorkPageDataProps {
  workPageData: IWork
  navMainData: Entry<INavigation>
  talentData: IArtist
}

const WorkPage:React.FC<WorkPageDataProps> = ({ workPageData, navMainData, talentData }) => {
  const description = workPageData.fields.description ?? ''
  const talentSlug = talentData.fields.slug || null
  const workTitle = workPageData.fields.name || null
  const imagesUrls = workPageData.fields.medias.map((media: any) => media.fields.file.url) ?? [];
  const typeOfMedia = workPageData.fields.typeOfMedia || null
  const videos = workPageData.fields.medias || []
  const vimeoID = workPageData.fields.vimeoVideoId || null
  const talentName = talentData.fields.name

  return(
    <WorkPageWrapper>
      <TalentNavigation navMainData={navMainData} />
      <ContentWrapper>
        <Texts>
          <WorkTitle>
            {workTitle}
          </WorkTitle>
          <TalentName>
            //{talentName}
          </TalentName>
          <Description>
            {description}
          </Description>
        </Texts>
        {typeOfMedia === 'photo(s)' &&
          <Images>
            {imagesUrls.map((url, index) => {
              return(
                <Img src={url} key={index}/>
              )
            })}
          </Images>
        }
        {typeOfMedia === 'video(s)' && vimeoID && (
          <IframeContainer>
            <iframe
              src={`https://player.vimeo.com/video/${vimeoID}?autoplay=1&loop=1&muted=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </IframeContainer>
        )}
        {typeOfMedia === 'video(s)' && !vimeoID && 
          <VideosContainer> 
            {videos.map((video, index) => {
              return(
                <VideoPlayer key={video.fields.file?.url as any} autoPlay loop muted playsInline>
                  <source src={video.fields.file?.url as any} type="video/mp4" />
                </VideoPlayer>
              )
            })}
          </VideosContainer>
        }
        {typeOfMedia === 'audio(s)' && 
          <VideosContainer>
            {videos.map((video, index) => (
              <SingleVideoPlayer key={index} videoUrl={video.fields.file?.url as any} />
            ))}
          </VideosContainer>
        }
      </ContentWrapper>
      <BottomWrapper>
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

  if (!workPageData || !workPageData.fields) {
    console.error("workPageData is invalid:", workPageData);
    return {
      notFound: true,
    };
  }

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
  background: white;
  padding-bottom: 1rem;
  padding-top: 20px;
  z-index: 10000;
  width: 100px;
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

const TalentName = styled.div`
  font-family: 'Diatype', sans-serif;
  text-transform: uppercase;
  line-height: 0.8;
  margin-left: 0px;
  font-size: clamp(1.5rem, 4vw, 3rem);
  padding-bottom: 10px;
`;

const CustomLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  opacity: 0.3;
  &:hover {
    opacity: 1;
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
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.8;
`

const Description = styled.div`
  font-size: clamp(0.5rem, 1vw, 1rem);
  text-align: justify;
  max-width: 600px;
`

const Texts = styled.div`
`

const Images = styled.div`
  display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Img = styled.img`
  flex: 0 1 calc(50% - 5px);
  max-width: calc(50% - 5px);
  box-sizing: border-box;
  opacity: 1;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover; 
  border-radius: 10px;

  @media (max-width: 600px) {
    flex: 0 1 100%;
    max-width: 100%;
  }
`;


const VideoPlayer = styled.video`
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
  border-radius: 10px;
`


const IframeContainer = styled.div`
  width: 100%;
  height: auto; 
  position: relative;
  padding-top: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const VideosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 10px;
  width: 100%;
  justify-content: center;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;
