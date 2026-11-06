/** Home page profile fields. The HomePage is the site root, so it's fetched by path. */
export function useHomePage() {
  return useWagtailPageByPath<HomePageFields, HomeProfile>('/', page => ({
    pronouns: page.pronouns,
    location: page.location,
    education: page.education,
    tagline: page.tagline,
    openToWork: page.open_to_work,
  }))
}

export interface HomeProfile {
  pronouns: string
  location: string
  education: string
  tagline: string
  openToWork: boolean
}
