// Generic Wagtail API v3 response shapes. Model-specific field types live in ./cms.ts.

export interface WagtailPageMeta {
  type: string
  detail_url: string
  html_url: string | null
  slug: string
  first_published_at: string | null
  show_in_menus?: boolean
  seo_title?: string
  search_description?: string
  parent?: {
    id: number
    title: string
    meta: { type: string, detail_url: string, html_url: string | null }
  } | null
}

/** A page as returned by the API: base fields plus the model's own `api_fields`. */
export type WagtailPage<TFields = object> = {
  id: number
  title: string
  meta: WagtailPageMeta
} & TFields

export interface WagtailListResponse<T> {
  meta: { total_count: number }
  items: T[]
}

/** Output of Wagtail's `ImageRenditionField` on the backend. */
export interface WagtailImageRendition {
  url: string
  full_url?: string
  width: number
  height: number
  alt: string
}
