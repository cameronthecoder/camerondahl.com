// Field types for each Wagtail model, matching the v3 API schemas
// (https://cms.camerondahl.com/api/v3/openapi.json, components.schemas).
// Page base fields (id, title, meta) come from WagtailPage<T> in ./wagtail.ts.

/** `ImageData` in the spec: the original file, not a resized rendition. */
export interface CmsImage {
  id: number
  title: string
  url: string | null
}

// --- HomePage (site root) ---------------------------------------------------

export interface HomePageFields {
  location: string | null
  education: string | null
  pronouns: string | null
  open_to_work: boolean
  tagline: string | null
}

// --- about.AboutPage ----------------------------------------------------------

export interface AboutPageFields {
  /** Plain text (TextField); paragraphs separated by blank lines. */
  biography: string | null
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

// --- projects snippets (no v3 endpoint yet; see app/composables/useProjects.ts) ---

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
  id: string | null
}

export type BlogBodyBlock =
  | StreamBlock<'heading', string | null>
  /** `text` is rich text HTML; we request `rich_text_format=html`, so internal links are expanded. */
  | StreamBlock<'paragraph', { size: 'sm' | 'base' | 'lg' | 'xl' | null, text: string | null }>
  /** Image id only; the API does not include a URL for ImageChooserBlock. */
  | StreamBlock<'image', number | null>
  | StreamBlock<'pull_quote', { author: string | null, source: string | null }>
  /**
   * `code` is plain source text (with \r\n line endings), not HTML: always render it as text.
   * `highlighted` is the same code as Pygments HTML (`<div class="highlight"><pre>…`, inline
   * styles), safe to render with v-html. The spec leaves this block's value untyped; this
   * shape is from live data.
   */
  | StreamBlock<'code', { language: string, code: string, highlighted?: string | null }>
  | StreamBlock<'quote', string | null>
  | StreamBlock<'video', { video_url: string | null, caption: string | null, autoplay: boolean | null }>
  /** Document id only. */
  | StreamBlock<'file', number | null>

// --- blog.BlogPage ------------------------------------------------------------

export interface BlogPageFields {
  /** ISO date, e.g. "2026-11-05". */
  date: string
  intro: string
  tags?: string[]
  category?: CmsCategory | null
  image?: CmsImage | null
  /** Untyped in the spec; a number of minutes in practice. */
  reading_time?: number | string | null
  author?: CmsAuthor | null
  body?: BlogBodyBlock[]
}
