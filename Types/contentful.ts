import { Entry, Asset, EntryFields, EntrySkeletonType } from 'contentful';


export interface WorkFields {
  name: string
  locale: string
  medias: Array<Asset>
  typeOfMedia: "video(s)" | "photo(s)" | "audio(s)"
  slug: string
  description?: string
  photoDisposition?: "portrait" | "landscape"
  vimeoVideoId?: string
}

export interface IWork extends EntrySkeletonType<WorkFields> {}



export interface ArtistFields {
  name: string
  slug: string
  type: string
  backgroundVideo: Asset
  biography: Text
  biographyEn: Text
  biographyIt: Text
  works: Array<IWork>
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
  introVideo: Asset
  videoIntroLength: string
}

export interface IHomePage extends EntrySkeletonType<HomePageFields> {}



export interface WorkPagefields {
  selection?: "automatic" | "manual"
  works: Array<IWork>
}

export interface IWorkPage extends EntrySkeletonType<WorkPagefields> {}


export interface FamilyPageFields {
  texteFr: string
  texteEn: string
  texteIt: string
  pageColor: string
}

export interface IFamilyPage extends EntrySkeletonType<FamilyPageFields> {}
