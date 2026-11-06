// Generic Wagtail queries. Pages should not call these directly: wrap them in a domain
// composable (e.g. useBlogPosts) that owns the model name, fields and view mapping.
// All requests go through the /api/cms proxy (server/api/cms/[...path].get.ts).
//
// Each function takes an optional `map` that turns a raw API page into the shape the page
// renders. Mapping happens once, when the data is fetched, and the mapped result is what
// gets sent from the server to the browser.

export interface WagtailPagesOptions {
  /** Fields to return. Defaults to all (`*`). */
  fields?: string[] | '*'
  /** e.g. `-date`, `title`. */
  order?: string
  limit?: number
  offset?: number
  /** Only direct children of this page id. */
  childOf?: number
  search?: string
  /** Extra Wagtail query params, e.g. `{ slug: 'my-post' }`. */
  filters?: Record<string, string | number | boolean>
  /**
   * Cache key for this query. Defaults to one built from the query, so set it when two
   * composables run the same query with different `map`s.
   */
  key?: string
}

type PageMapper<F, R> = (page: WagtailPage<F>) => R
const identity = <T>(page: T) => page

function toQuery(type: string, options: WagtailPagesOptions) {
  const { fields = '*' } = options
  return {
    type,
    fields: fields === '*' ? '*' : fields.join(','),
    order: options.order,
    limit: options.limit,
    offset: options.offset,
    child_of: options.childOf,
    search: options.search,
    ...options.filters,
  }
}

/** List pages of one model type, e.g. `useWagtailPages<BlogPageFields>('blog.BlogPage')`. */
export function useWagtailPages<F, R = WagtailPage<F>>(
  type: string,
  options: WagtailPagesOptions = {},
  map: PageMapper<F, R> = identity as PageMapper<F, R>,
) {
  const query = toQuery(type, options)
  return useAsyncData(
    options.key ?? `wagtail:pages:${JSON.stringify(query)}`,
    () => $fetch<WagtailListResponse<WagtailPage<F>>>('/api/cms/pages/', { query }),
    {
      transform: res => res.items.map(map),
      default: () => [] as R[],
    },
  )
}

/** First page of a type matching the options (e.g. a singleton, or a `slug` filter). `null` if none. */
export function useWagtailFirstPage<F, R = WagtailPage<F>>(
  type: string,
  options: WagtailPagesOptions = {},
  map: PageMapper<F, R> = identity as PageMapper<F, R>,
) {
  const query = toQuery(type, { ...options, limit: 1 })
  return useAsyncData(
    options.key ?? `wagtail:first:${JSON.stringify(query)}`,
    () => $fetch<WagtailListResponse<WagtailPage<F>>>('/api/cms/pages/', { query }),
    {
      transform: res => (res.items[0] ? map(res.items[0]) : null),
      default: () => null,
    },
  )
}

/**
 * List items from a non-page endpoint, e.g. a custom snippet viewset at `/api/v2/projects/`.
 * `endpoint` must be allowlisted in the /api/cms proxy.
 */
export function useWagtailList<T, R = T>(
  endpoint: string,
  query: Record<string, string | number | boolean | undefined> = {},
  map: (item: T) => R = identity as (item: T) => R,
  key?: string,
) {
  return useAsyncData(
    key ?? `wagtail:${endpoint}:${JSON.stringify(query)}`,
    () => $fetch<WagtailListResponse<T>>(`/api/cms/${endpoint}/`, { query }),
    {
      transform: res => res.items.map(map),
      default: () => [] as R[],
    },
  )
}

/**
 * One item from a non-page endpoint, e.g. `writings/my-post` for `/api/v2/writings/my-post/`.
 * `data` is null if it returns 404; other errors land in `error`.
 */
export function useWagtailItem<T, R = T>(
  path: string,
  map: (item: T) => R = identity as (item: T) => R,
) {
  return useAsyncData(
    `wagtail:item:${path}`,
    async () => {
      try {
        return await $fetch<T>(`/api/cms/${path}/`)
      } catch (error) {
        if ((error as { statusCode?: number }).statusCode === 404) return null
        throw error
      }
    },
    {
      transform: item => (item ? map(item) : null),
      default: () => null,
    },
  )
}

/** One page by id (all fields). */
export function useWagtailPage<F, R = WagtailPage<F>>(
  id: number,
  map: PageMapper<F, R> = identity as PageMapper<F, R>,
) {
  return useAsyncData(
    `wagtail:page:${id}`,
    () => $fetch<WagtailPage<F>>(`/api/cms/pages/${id}/`),
    { transform: map },
  )
}

/** One page by its site path, e.g. `/` or `/about/` (all fields). */
export function useWagtailPageByPath<F, R = WagtailPage<F>>(
  path: string,
  map: PageMapper<F, R> = identity as PageMapper<F, R>,
) {
  return useAsyncData(
    `wagtail:page-path:${path}`,
    () => $fetch<WagtailPage<F>>('/api/cms/pages/find/', { query: { html_path: path } }),
    { transform: map },
  )
}

/**
 * A draft page from wagtail-headless-preview, via the uncached /api/preview route
 * (which calls the CMS at /api/v3/preview/).
 * `contentType` is Wagtail's `app_label.model`, e.g. `blog.blogpage`.
 */
export function useWagtailPreview<F, R = WagtailPage<F>>(
  contentType: string,
  token: string,
  map: PageMapper<F, R> = identity as PageMapper<F, R>,
) {
  return useAsyncData(
    `wagtail:preview:${contentType}:${token}`,
    () => $fetch<WagtailPage<F>>('/api/preview', { query: { content_type: contentType, token } }),
    { transform: map },
  )
}
