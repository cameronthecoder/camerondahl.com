// Proxy: GET /api/cms/<path>?<query>  ->  <NUXT_WAGTAIL_API_BASE>/<path>/?<query>
// Keeps the CMS URL server-side, avoids CORS, and caches responses.

// `writings` (blog posts, incl. /writings/<slug>/) and `projects` (snippets, not yet live)
// are custom endpoints on the CMS.
const ALLOWED_ROOTS = new Set(['pages', 'images', 'documents', 'writings', 'projects'])
const SAFE_SEGMENT = /^[\w-]+$/

export default defineCachedEventHandler(
  async (event): Promise<unknown> => {
    const segments = (getRouterParam(event, 'path') ?? '').split('/').filter(Boolean)

    if (!segments.length || !ALLOWED_ROOTS.has(segments[0]!) || !segments.every(s => SAFE_SEGMENT.test(s))) {
      throw createError({ statusCode: 404, statusMessage: 'Not found' })
    }

    try {
      // Wagtail expects trailing slashes. `pages/find/` redirects to the page's detail URL;
      // fetch follows it here, so callers get the page JSON directly.
      return await wagtailFetch<unknown>(`/${segments.join('/')}/`, { query: getQuery(event) })
    } catch (error) {
      throw toCmsError(error)
    }
  },
  {
    name: 'cms',
    maxAge: 60,
    swr: true,
    getKey: event => event.path,
  },
)
