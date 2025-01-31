import { Entry, Asset, EntryFields, EntrySkeletonType } from 'contentful';


export interface WorkFields {
  name: string
  locale: string
  medias: Array<Asset>
}

export interface Iwork extends EntrySkeletonType<WorkFields> {}



export interface ArtistFields {
  name: string
  slug: string
  type: string
  backgroundVideo: Asset
  biography: Text
  biographyEn: Text
  biographyIt: Text
  works: Array<Iwork>
  orderOfAppearance: number
}

export interface IArtist extends EntrySkeletonType<ArtistFields> {}



export interface NavigationFields {
  name: string
  locale: string
  logo?: any
  navLinks: Array<INavLink>
}

export interface INavigation extends EntrySkeletonType<NavigationFields> {}



export interface NavLinkFields {
  locale: string
  name: string
  link: string
}

export interface INavLink extends EntrySkeletonType<NavLinkFields> {}



export interface HomePageFields {
  backgroundVideo: Asset
}

export interface IHomePage extends EntrySkeletonType<HomePageFields> {}



export interface WorkPagefields {
  selection: "automatic" | "manual"
  works: Array<Iwork>
}

export interface IWorkPage extends EntrySkeletonType<WorkPagefields> {}
