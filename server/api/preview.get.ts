// Draft preview: GET /api/preview?content_type=blog.blogpage&token=...
//   ->  <NUXT_WAGTAIL_API_BASE>/preview/?content_type=...&token=...
// Used by the preview pages under app/pages/preview/.
//
// Separate from the cached /api/cms proxy on purpose: draft content changes on every save
// (and the token can stay the same while it does), so this is never cached.

const CONTENT_TYPE = /^[a-z_]\w*\.[a-z_]\w*$/

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const contentType = String(query.content_type ?? '').toLowerCase()
  const token = String(query.token ?? '')

  if (!CONTENT_TYPE.test(contentType) || !token || token.length > 512) {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid content_type/token' })
  }

  setResponseHeader(event, 'Cache-Control', 'no-store')

  try {
    return await wagtailFetch<unknown>('/preview/', {
      query: { content_type: contentType, token, rich_text_format: 'html' },
    })
  } catch (error) {
    throw toCmsError(error)
  }
})
