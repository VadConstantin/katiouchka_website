import { GetServerSideProps } from 'next';
import styled from "styled-components";
import { Entry } from 'contentful';
import { getWorkPageData, getNavigationData, getAllWorks, getTalentsData } from '@/Services/get_contentful_data';
import { IWorkPage, IWork, IArtist, ArtistFields } from "@/Types/contentful";
import WorkNavigation from '@/Components/Nav/WorkNavigation';
import Work from '@/Components/Work/Work';

interface IndexProps {
  locale?: string;
  navMainData: any;
  workPageData: Entry<IWorkPage>;
  allWorks: Entry<IWork>[]
  allTalents: Entry<IArtist>[]
}

const Index:React.FC<IndexProps> = ({ navMainData, workPageData, allWorks, allTalents }) => {
  const typeOfSelection = workPageData.fields.selection ?? "automatic"

  const manualWorks: any = workPageData.fields.works
  const manualWorksNames = manualWorks.map((work:any) => work?.fields?.name).filter(Boolean);

  const allWorksWithTalentInfo = allTalents.flatMap((talent) => {
    const artistFields = talent.fields as unknown as ArtistFields;
  
    return artistFields.works.map((work) => ({
      work,
      talentSlug: artistFields.slug,
      talentName: artistFields.name,
    }));
  });

  const manualFinalSelection = allWorksWithTalentInfo
    .filter((element) => manualWorksNames.includes(element.work.fields?.name))
    .sort((a, b) => 
      manualWorksNames.indexOf(a.work.fields.name) - manualWorksNames.indexOf(b.work.fields?.name)
  )
  
  return(
    <Wrapper>
      <WorkNavigation navMainData={navMainData}/>
      <ContentWrapper>
        <TabContent>
        {typeOfSelection === 'automatic' ?
          <Works>
            {allWorksWithTalentInfo.slice(-16).map((item, index) => (
              <Work
                key={index}
                work={item.work}
                talentSlug={item.talentSlug}
  
              />
            ))}
          </Works>
        : <Works>
            {manualFinalSelection.map((item, index) => (
              <Work
                key={index}
                work={item.work}
                talentSlug={item.talentSlug}

              />
            ))}
          </Works>}
        </TabContent>
      </ContentWrapper>
    </Wrapper>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.query.locale || 'fr';

  const navMainData = await getNavigationData(locale as string)
  const workPageData = await getWorkPageData()
  const allWorks = await getAllWorks()
  const allTalents = await getTalentsData()

  if (!navMainData) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  return {
    props: {
      locale,
      navMainData,
      workPageData,
      allWorks,
      allTalents
    },
  };
}

const Wrapper = styled.div`
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  padding: 5px;
  position: relative;
`

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding-bottom: 50px;
` 

const Works = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  width: 100%;
  justify-content: center;
  padding-top: 50px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const TabContent = styled.div`
  width: 100%;
`;
