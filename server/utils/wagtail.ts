import type { NitroFetchOptions } from 'nitropack'

/**
 * Fetch from the Wagtail API v2. Server-only: this is the one place that knows the CMS URL.
 * `path` is relative to the API root, e.g. `/pages/` or `/pages/3/`.
 */
export function wagtailFetch<T>(path: string, options: NitroFetchOptions<string> = {}) {
  const { wagtail } = useRuntimeConfig()
  if (!wagtail.apiBase) {
    throw createError({ statusCode: 500, statusMessage: 'CMS is not configured (NUXT_WAGTAIL_API_BASE)' })
  }

  return $fetch<T>(path, {
    ...options,
    baseURL: wagtail.apiBase,
    headers: { Accept: 'application/json' },
    timeout: 10_000,
  })
}

/** Turn a failed `wagtailFetch` into an H3 error that keeps the CMS status but hides its details. */
export function toCmsError(error: unknown) {
  if (isError(error)) return error // our own errors (e.g. CMS not configured) pass through as-is
  const status = (error as { response?: { status?: number } }).response?.status
  return createError({
    statusCode: status ?? 502,
    statusMessage: status ? 'CMS request failed' : 'CMS unavailable',
  })
}

/**
 * Fetch a draft from the CMS preview endpoint, `/api/v3/preview/` on the same host as
 * NUXT_WAGTAIL_API_BASE. Never cache the result: drafts change on every save.
 */
export function wagtailPreviewFetch<T>(query: Record<string, string>) {
  const { wagtail } = useRuntimeConfig()
  if (!wagtail.apiBase) {
    throw createError({ statusCode: 500, statusMessage: 'CMS is not configured (NUXT_WAGTAIL_API_BASE)' })
  }
  // Absolute URL, so wagtailFetch's v2 baseURL doesn't apply.
  return wagtailFetch<T>(new URL('/api/v3/preview/', wagtail.apiBase).toString(), { query })
}
