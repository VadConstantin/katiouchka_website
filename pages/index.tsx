
// "use client"; 

// import { useEffect, useState } from 'react';
// import HomePage from '@/Components/HomePage/HomePage';
// import Navigation from '@/Components/Nav/Navigation';
// import { getHomePageData, getNavigationData } from '@/Services/get_contentful_data';

// export default function Home() {
//   const [locale, setLocale] = useState<string>('fr'); // Langue par défaut
//   const [homePageData, setHomePageData] = useState<any>(null);
//   const [navMainData, setNavMainData] = useState<any>(null);

//   useEffect(() => {
//     const storedLocale = localStorage.getItem('locale') || 'fr';
//     setLocale(storedLocale);

//     const fetchData = async () => {
//       const navData = await getNavigationData(storedLocale);
//       const homeData = await getHomePageData();

//       setNavMainData(navData);
//       setHomePageData(homeData);
//     };

//     fetchData();
//   }, []);


//   const handleLocaleChange = (newLocale: string) => {
//     localStorage.setItem('locale', newLocale);
//     setLocale(newLocale); 
//     window.location.reload();
//   };

//   return (
//     <div>
//       <Navigation navMainData={navMainData} locale={locale} onLocaleChange={handleLocaleChange}>
//         <HomePage homePageData={homePageData}/>
//       </Navigation >
//     </div>
//   );
// }

import { GetServerSideProps } from 'next';
import HomePage from '@/Components/HomePage/HomePage';
import Navigation from '@/Components/Nav/Navigation';
import { getHomePageData, getNavigationData } from '@/Services/get_contentful_data';

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

interface HomeProps {
  locale: string;
  navMainData: any;
  homePageData: any;
}

const Home = ({ locale, navMainData, homePageData }: HomeProps) => {
  const handleLocaleChange = (newLocale: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('locale', newLocale);
    window.location.href = currentUrl.toString(); // Recharge la page avec la nouvelle langue
  };

  return (
    <div>
      <Navigation navMainData={navMainData} locale={locale} onLocaleChange={handleLocaleChange}>
        <HomePage homePageData={homePageData} />
      </Navigation>
    </div>
  );
};

export default Home;


