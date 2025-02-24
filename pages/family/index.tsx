import { IFamilyPage, INavigation } from '@/Types/contentful'
import { Entry } from 'contentful'
import styled from 'styled-components'
import { GetServerSideProps } from 'next'
import { getFamilyPageData, getNavigationData } from '@/Services/get_contentful_data'
import FamilyNavigation from '@/Components/Nav/FamilyNavigation'

interface IndexProps {
  navMainData: Entry<INavigation>
  familyPageData: IFamilyPage
}

const Index:React.FC<IndexProps> = ( {navMainData, familyPageData} ) => {
  const frenchText = familyPageData.fields.texteFr
  const englishText = familyPageData.fields.texteEn
  const italianText = familyPageData.fields.texteIt

  return(
    <Wrapper>
      <FamilyNavigation navMainData={navMainData} credits />
      <ContentWrapper>
        <TextsWrapper>
          <Text>
            <BioTitle>FR</BioTitle>
            {frenchText}
          </Text>
          <Text>
            <BioTitle>EN</BioTitle>
            {englishText}
          </Text>
          <Text>
            <BioTitle>IT</BioTitle>
            {italianText}
          </Text>
        </TextsWrapper>
      </ContentWrapper>
      <BottomWrapper>
        <LinksSection>
          <TextAndEmail>
            FOUNDER
            <Email href="mailto:camelia@katiouchkafilms.com">
              camelia@katiouchkafilms.com
            </Email>
          </TextAndEmail>
        </LinksSection>
        <LinksSection>
          <TextAndEmail>
            CO-FOUNDER
            <Email href="mailto:quentin@katiouchkafilms.com">
            quentin@katiouchkafilms.com
            </Email>
          </TextAndEmail>
        </LinksSection>
        <LinksSection>
          <TextAndEmail>
            <Email href="https://www.instagram.com/katiouchkafilms/?hl=fr">
              Instagram
            </Email>
            <Email href="https://www.linkedin.com/company/katiouchka-films">
              LinkedIn
            </Email>
          </TextAndEmail>
        </LinksSection>
      </BottomWrapper>
    </Wrapper>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.query.locale || 'fr';
  const navMainData = await getNavigationData(locale as string)
  const familyPageData = await getFamilyPageData()

  return {
    props: {
      navMainData,
      familyPageData
    }
  }
}

const TextsWrapper = styled.div`
  font-size: clamp(0.8rem, 10vw, 1rem);
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 3rem;
  width: 100%;
`;

const Text = styled.div`
  font-family: 'Diatype', sans-serif;
  line-height: 1;
  max-width: 400px;
  min-width: 350px;
`;

const BioTitle = styled.div`
  font-family: 'Typnic Headline', sans-serif;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: none;
    max-height: initial;
`

const Wrapper = styled.div`
  padding: 5px;
  display: flex;
    flex-direction: column;
  min-height: 100vh;
`

const BottomWrapper = styled.div`
  display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: space-between;
  width: 100%;
  padding: 50px 0 10px 0;
`

const LinksSection = styled.div`
  width: 400px;
  display: flex;
    flex-direction: column;
    gap: 30px;
`

const Email = styled.a`
  font-family: 'Diatype', sans-serif;
  text-decoration: none;
  color: black;
  line-height: 0.9;
  &:hover {
    opacity: 0.3;
  }
`

const TextAndEmail = styled.div`
  display: flex;
    flex-direction: column;
`