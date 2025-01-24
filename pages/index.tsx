
import { GetServerSideProps } from 'next';
import HomePage from '@/Components/HomePage/HomePage';
import { getHomePageData, getNavigationData } from '@/Services/get_contentful_data';
import { IHomePage } from "../Types/contentful";
import { Entry, EntrySkeletonType} from 'contentful';
import IntroScreen from '@/Components/IntroScreen/IntroScreen';

interface HomeProps {
  locale: string;
  navMainData: any;
  homePageData: Entry<IHomePage>;
}

const Home = ({ locale, navMainData, homePageData }: HomeProps) => {

  const handleLocaleChange = (newLocale: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('locale', newLocale);
    window.location.href = currentUrl.toString();
  };

  return (
    <div>
      <IntroScreen />
      {/* <HomePage navMainData={navMainData} 
                locale={locale} 
                onLocaleChange={handleLocaleChange}  
                homePageData={homePageData} 
      /> */}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.query.locale || 'fr';

  const navMainData = await getNavigationData(locale as string);
  const homePageData = await getHomePageData();

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
      homePageData,
    },
  };
};


