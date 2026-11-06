// Generic Wagtail API v3 response shapes. Model-specific field types live in ./cms.ts.

interface SimplePage {
  id: number
  title: string
  meta: { type: string, detail_url: string | null, html_url: string | null }
}

export interface WagtailPageMeta {
  type: string
  slug: string
  detail_url?: string | null
  html_url?: string | null
  locale?: string | null
  first_published_at?: string | null
  show_in_menus?: boolean | null
  seo_title?: string | null
  search_description?: string | null
  alias_of?: SimplePage | null
  parent?: SimplePage | null
}

/** A page as returned by the API: base fields plus the model's own `api_fields`. */
export type WagtailPage<TFields = object> = {
  id: number
  title: string
  meta: WagtailPageMeta
} & TFields

/** Paginated list: `limit` (max 20) and `offset` page through `count` items. */
export interface WagtailListResponse<T> {
  items: T[]
  count: number
}

/** Output of Wagtail's `ImageRenditionField` on the backend. */
export interface WagtailImageRendition {
  url: string
  full_url?: string
  width: number
  height: number
  alt: string
}
