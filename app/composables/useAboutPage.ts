/** The About page, from the CMS's `/api/v3/about/` endpoint. `data` is null if it doesn't exist. */
export function useAboutPage() {
  return useWagtailItem<WagtailPage<AboutPageFields>, AboutContent>('about', {}, page => ({
    title: page.title,
    // Biography is plain text; blank lines separate paragraphs.
    paragraphs: (page.biography ?? '')
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(Boolean),
  }))
}

export interface AboutContent {
  title: string
  paragraphs: string[]
}
