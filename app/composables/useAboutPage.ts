/**
 * The About page. Fetched by model type rather than URL: there's only ever one
 * (max_count = 1), so this keeps working if its slug changes. `data` is null if it doesn't exist.
 */
export function useAboutPage() {
  return useWagtailFirstPage<AboutPageFields, AboutContent>('about.AboutPage', {}, page => ({
    title: page.title,
    // Biography is plain text; blank lines separate paragraphs.
    paragraphs: page.biography
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(Boolean),
  }))
}

export interface AboutContent {
  title: string
  paragraphs: string[]
}
