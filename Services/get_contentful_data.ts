import { createClient } from 'contentful';
import { Entry } from 'contentful';
import { IHomePage, INavigation, IArtist, IWork, IWorkPage } from '../types/contentful';
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

export const getTalentData = async (slug: string):Promise<Entry<IArtist>> => {
  const entries = await contentful.getEntries<IArtist>({
    content_type: 'artist',
    'fields.slug': slug,
    limit: 1
  } as any)

  return entries.items[0]
} 

export const getTalentWorkData = async (slug: string):Promise<Entry<IWork>> => {
  const entries = await contentful.getEntries<IWork>({
    content_type: 'work',
    'fields.slug': slug,
    limit: 1
  } as any)

  return entries.items[0]
}

export const getWorkPageData = async (): Promise<Entry<IWorkPage>> => {
  const entries = await contentful.getEntries<IWorkPage>({
    content_type: 'workPage',
    limit: 1
  })
  return entries.items[0]
}

export const getAllWorks = async (): Promise<Array<Entry<IWork>>> => {
  const entries = await contentful.getEntries<IWork>({
    content_type: 'work'
  })

  return entries.items
}

