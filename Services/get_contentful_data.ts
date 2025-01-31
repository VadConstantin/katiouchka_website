import { createClient } from 'contentful';
import { Entry } from 'contentful';
import { IHomePage, INavigation, IArtist } from '../types/contentful';
import 'dotenv/config';



const contentful = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
})


export const getHomePageData = async ():Promise<Entry<IHomePage>> => {
  const entries = await contentful.getEntries<IHomePage>({
    content_type: 'homePage'
  } as any)

  return entries.items[0]
}

export const getNavigationData = async (locale:string):Promise<Entry<INavigation>> => {

  const entries = await contentful.getEntries<INavigation>({
    content_type: 'navigation',
    'fields.locale': locale,
    limit: 1
  } as any)

  return entries.items[0]
}

export const getTalentsData = async ():Promise<Array<Entry<IArtist>>> => {
  const entries = await contentful.getEntries<IArtist>({
    content_type: 'artist'
  } as any)

  return entries.items
}

