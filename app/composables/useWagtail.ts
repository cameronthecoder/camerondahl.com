// Generic Wagtail API v3 queries. Pages should not call these directly: wrap them in a domain
// composable (e.g. useBlogPosts) that owns the endpoint and view mapping.
// All requests go through the /api/cms proxy (server/api/cms/[...path].get.ts).
// Spec: https://cms.camerondahl.com/api/v3/openapi.json
//
// Each function takes an optional `map` that turns a raw API item into the shape the page
// renders. Mapping happens once, when the data is fetched, and the mapped result is what
// gets sent from the server to the browser.

type Query = Record<string, string | number | boolean | undefined>
type Mapper<T, R> = (item: T) => R
const identity = <T>(item: T) => item

/** The API rejects `limit` above 20. */
const MAX_PAGE_SIZE = 20

/**
 * List items from a paginated endpoint, e.g. `writings` for `/api/v3/writings/`.
 * With `query.limit`, fetches that many; without it, follows `offset` until it has all
 * `count` items. `endpoint` must be allowlisted in the /api/cms proxy.
 */
export function useWagtailList<T, R = T>(
  endpoint: string,
  query: Query = {},
  map: Mapper<T, R> = identity as Mapper<T, R>,
  key?: string,
) {
  const url = `/api/cms/${endpoint}/`

  return useAsyncData(
    key ?? `wagtail:${endpoint}:${JSON.stringify(query)}`,
    async () => {
      if (query.limit !== undefined) {
        const limit = Math.min(Number(query.limit), MAX_PAGE_SIZE)
        return (await $fetch<WagtailListResponse<T>>(url, { query: { ...query, limit } })).items
      }

      const items: T[] = []
      for (let offset = 0; ; offset += MAX_PAGE_SIZE) {
        const res = await $fetch<WagtailListResponse<T>>(url, { query: { ...query, limit: MAX_PAGE_SIZE, offset } })
        items.push(...res.items)
        if (!res.items.length || items.length >= res.count) return items
      }
    },
    {
      transform: items => items.map(map),
      default: () => [] as R[],
    },
  )
}

/**
 * One item from a detail endpoint, e.g. `writings/my-post` for `/api/v3/writings/my-post/`,
 * or `about` for `/api/v3/about/`. `data` is null if it returns 404; other errors land in `error`.
 */
export function useWagtailItem<T, R = T>(
  path: string,
  query: Query = {},
  map: Mapper<T, R> = identity as Mapper<T, R>,
) {
  return useAsyncData(
    `wagtail:item:${path}:${JSON.stringify(query)}`,
    async () => {
      try {
        return await $fetch<T>(`/api/cms/${path}/`, { query })
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

/** One page by id, with all its fields. */
export function useWagtailPage<F, R = WagtailPage<F>>(
  id: number,
  map: Mapper<WagtailPage<F>, R> = identity as Mapper<WagtailPage<F>, R>,
) {
  return useAsyncData(
    `wagtail:page:${id}`,
    () => $fetch<WagtailPage<F>>(`/api/cms/pages/${id}/`),
    { transform: map },
  )
}

/** One page by its site path, e.g. `/` (all fields). */
export function useWagtailPageByPath<F, R = WagtailPage<F>>(
  path: string,
  map: Mapper<WagtailPage<F>, R> = identity as Mapper<WagtailPage<F>, R>,
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
  map: Mapper<WagtailPage<F>, R> = identity as Mapper<WagtailPage<F>, R>,
) {
  return useAsyncData(
    `wagtail:preview:${contentType}:${token}`,
    () => $fetch<WagtailPage<F>>('/api/preview', { query: { content_type: contentType, token } }),
    { transform: map },
  )
}
