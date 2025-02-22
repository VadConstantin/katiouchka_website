import { GetServerSideProps } from 'next';
import { getTalentData, getNavigationData } from '@/Services/get_contentful_data';
import { Entry } from 'contentful';
import { IArtist, INavigation } from '@/Types/contentful';
import TalentPage from '@/Components/ArtistPage/TalentPage';

interface TalentPageProps {
  navMainData: Entry<INavigation>
  talentData: Entry<IArtist>
}

const Index:React.FC<TalentPageProps> = ({ navMainData, talentData }) => {
  return (
    <TalentPage navMainData={navMainData} talentData={talentData}/>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug
  const locale = context.query.locale || 'fr';

  const navMainData = await getNavigationData(locale as string);
  const talentData = await getTalentData(slug as string);

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
      talentData ,
    },
  };
};

