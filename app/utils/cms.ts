/** Make a CMS media URL absolute. Relative URLs (/media/...) get NUXT_PUBLIC_CMS_MEDIA_BASE. */
export function cmsMediaUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined
  if (/^https?:\/\//.test(url)) return url

  const base = useRuntimeConfig().public.cmsMediaBase
  return base ? new URL(url, base).toString() : url
}

/**
 * ISO date ('2026-11-05') -> 'Nov 5, 2026'. Formatted in UTC so server and browser
 * always agree (no hydration mismatch, no off-by-one-day from time zones).
 */
export function formatDate(date: string | null | undefined): string {
  if (!date) return ''
  return new Date(`${date.slice(0, 10)}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * Year range from ISO dates: ('2022-09-01') -> '2022 - present', ('2022-01-01', '2023-05-01') -> '2022 - 2023'.
 * Reads the year from the string directly so time zones can't shift it.
 */
export function formatDateRange(start?: string | null, end?: string | null): string | undefined {
  if (!start) return undefined
  const from = start.slice(0, 4)
  if (!end) return `${from} - present`
  const to = end.slice(0, 4)
  return from === to ? from : `${from} - ${to}`
}
