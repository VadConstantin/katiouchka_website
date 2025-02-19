import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";
import { Entry } from 'contentful';
import { getWorkPageData, getNavigationData, getAllWorks } from '@/Services/get_contentful_data';
import { IWorkPage, IWork } from "@/Types/contentful";
import WorkNavigation from '@/Components/Nav/WorkNavigation';
import { cp } from 'fs/promises';

interface IndexProps {
  locale: string;
  navMainData: any;
  workPageData: Entry<IWorkPage>;
  allWorks: Entry<IWork>[]
}

const Index:React.FC<IndexProps> = ({ locale, navMainData, workPageData, allWorks }) => {
  const typeOfSelection = workPageData.fields.selection

  console.log('all works !!!', allWorks)

  return(
    <Wrapper>
      <WorkNavigation navMainData={navMainData}/>
      <ContentWrapper>
        this is a test
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
  height: 100vh;
  padding: 0.5rem;
  position: relative;
`

const ContentWrapper = styled.div`
  flex-grow: 1;
` 