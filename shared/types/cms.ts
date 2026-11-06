// Field types for each Wagtail model, matching its `api_fields` on the backend.
// Page base fields (id, title, meta) come from WagtailPage<T> in ./wagtail.ts.

/** Output of the backend's ImageFieldSerializer: the original file, not a resized rendition. */
export interface CmsImage {
  id: number
  title: string
  url: string | null
}

// --- HomePage (site root) ---------------------------------------------------

export interface HomePageFields {
  location: string
  education: string
  pronouns: string
  open_to_work: boolean
  tagline: string
}

// --- about.AboutPage ----------------------------------------------------------

export interface AboutPageFields {
  /** Plain text (TextField); paragraphs separated by blank lines. */
  biography: string
}

// --- blog snippets ------------------------------------------------------------

export interface CmsAuthor {
  id: number
  name: string
  bio: string
  avatar: CmsImage | null
  email: string
  website: string
  github: string
}

export interface CmsCategory {
  id: number
  name: string
  slug: string
  description: string
}

// --- projects snippets (served by a custom /projects/ API endpoint) ------------

export interface CmsTechnology {
  name: string
  slug: string
  /** Devicon class or emoji, per the CMS help text. */
  icon: string
}

/** Assumes Project api_fields with ImageFieldSerializer for images and nested technologies. */
export interface ProjectFields {
  id: number
  title: string
  slug: string
  /** Plain text (TextField). */
  description: string
  featured_image: CmsImage | null
  gallery: CmsImage[]
  project_url: string
  github_url: string
  technologies: CmsTechnology[]
  /** ISO date, e.g. "2022-09-01". */
  date: string
  featured: boolean
  order: number
}

// --- blog.BlogPage body (StreamField) -----------------------------------------
// Each block arrives as { type, value, id }.

interface StreamBlock<T extends string, V> {
  type: T
  value: V
  id: string
}

export type BlogBodyBlock =
  | StreamBlock<'heading', string>
  /** `text` is rich text HTML in Wagtail's raw format (internal links not expanded). */
  | StreamBlock<'paragraph', { size: 'sm' | 'base' | 'lg' | 'xl', text: string }>
  /** Image id only; the API does not include a URL for ImageChooserBlock. */
  | StreamBlock<'image', number>
  | StreamBlock<'pull_quote', { author: string, source: string }>
  /** `code` is HTML (rendered with v-html), not plain text. */
  | StreamBlock<'code', { language: string, code: string }>
  | StreamBlock<'quote', string>
  /** VideoBlock's definition wasn't in the schema; shape unknown until checked. */
  | StreamBlock<'video', unknown>
  /** Document id only. */
  | StreamBlock<'file', number>

// --- blog.BlogPage ------------------------------------------------------------

export interface BlogPageFields {
  /** ISO date, e.g. "2026-11-05". */
  date: string
  intro: string
  tags: string[]
  category: CmsCategory | null
  image: CmsImage | null
  reading_time: number
  author: CmsAuthor | null
  body: BlogBodyBlock[]
}
