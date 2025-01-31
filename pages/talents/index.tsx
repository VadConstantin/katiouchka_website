import { GetServerSideProps } from 'next';
import { getNavigationData, getTalentsData } from '@/Services/get_contentful_data';
import { IArtist, INavigation } from "../../Types/contentful";
import { Entry } from 'contentful';
import TalentsPage from '@/Components/ArtistsPage/TalentsPage';

interface IndexTalentsProps {
  navMainData: Entry<INavigation>;
  talentsPageData: Array<Entry<IArtist>>;
}

const Index:React.FC<IndexTalentsProps> = ({ navMainData, talentsPageData }) => {
  return(
    <div>
      <TalentsPage talentsPageData={talentsPageData} navMainData={navMainData}/>
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.query.locale || 'fr';

  const navMainData = await getNavigationData(locale as string);
  const talentsPageData = await getTalentsData();

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
      talentsPageData
    },
  };
};