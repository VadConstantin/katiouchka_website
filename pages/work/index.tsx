import { GetServerSideProps } from 'next';
import styled from "styled-components";
import { Entry } from 'contentful';
import { getWorkPageData, getNavigationData, getAllWorks } from '@/Services/get_contentful_data';
import { IWorkPage, IWork } from "@/Types/contentful";
import WorkNavigation from '@/Components/Nav/WorkNavigation';
import Work from '@/Components/Work/Work';

interface IndexProps {
  locale?: string;
  navMainData: any;
  workPageData: Entry<IWorkPage>;
  allWorks: Entry<IWork>[]
}

const Index:React.FC<IndexProps> = ({ navMainData, workPageData, allWorks }) => {
  const typeOfSelection = workPageData.fields.selection ?? "automatic"
  const last10works = allWorks.slice(-10)
  const manualWorks: any = workPageData.fields.works

  return(
    <Wrapper>
      <WorkNavigation navMainData={navMainData}/>
      <ContentWrapper>
        <TabContent>
        {typeOfSelection === 'automatic' ?
          <Works>
            {last10works.map((work, index) => {
              return( 
                <Work work={work as any} key={index}/> 
              )
            })}
          </Works>
        : <Works>
            {manualWorks.map((work: any, index: number) => {
              return( 
                <Work work={work as any} key={index}/> 
              )
            })}
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
      allWorks
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
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 10px;
  width: 100%;
  justify-content: center;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const TabContent = styled.div`
  width: 100%;
`;
