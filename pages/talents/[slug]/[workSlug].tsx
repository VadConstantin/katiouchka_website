import { GetServerSideProps } from 'next';
import { getNavigationData, getTalentData, getWorkPageData } from '@/Services/get_contentful_data';
import { IArtist, INavigation, IWork } from '@/types/contentful';

interface WorkPageDataProps {
  workPageData: IWork
  navMainData: INavigation
  talentData: IArtist
}
const WorkPage:React.FC<WorkPageDataProps> = ({ workPageData, navMainData, talentData }) => {

  console.log("work data ====>", workPageData)
  return(
    <div>
      {talentData.fields.name}

    </div>
  )
}

export default WorkPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {slug, workSlug} = context.query
  const locale = context.query.locale || 'fr';
  const navMainData = await getNavigationData(locale as string)
  const workPageData = await getWorkPageData(workSlug as string)
  const talentData = await getTalentData(slug as string)

  return {
    props: {
      workPageData,
      navMainData,
      talentData
    },
  }
}