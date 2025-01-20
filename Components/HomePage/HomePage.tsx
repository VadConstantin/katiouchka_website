import styled from 'styled-components';
import { Entry, EntrySkeletonType} from 'contentful';

import { IHomePage } from '@/Types';

"use client"

interface HomePageProps {
  homePageData: Entry<IHomePage>
}

const HomePage:React.FC<HomePageProps> = ({ homePageData }) => {

  if (!homePageData) {
    return <div>Chargement...</div>;
  }

  return(
    <div></div>
  )
}

export default HomePage;