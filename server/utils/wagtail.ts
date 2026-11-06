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
