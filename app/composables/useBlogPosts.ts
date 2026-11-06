// Blog posts are served by the CMS's `writings` endpoint:
//   list:   /api/v3/writings/         (newest first, full content; no field selection)
//   detail: /api/v3/writings/<slug>/
// Drafts come from /api/v3/preview/ (see useBlogPostPreview).

// Rich text as front-end-ready HTML (internal links and embeds expanded).
const RICH_TEXT = { rich_text_format: 'html' } as const

function toSummary(page: WagtailPage<BlogPageFields>): BlogPostSummary {
  return {
    id: page.id,
    slug: page.meta.slug,
    title: page.title,
    date: page.date,
    intro: page.intro ?? '',
    tags: page.tags ?? [],
    category: page.category ?? null,
    imageUrl: cmsMediaUrl(page.image?.url),
    imageAlt: page.image?.title ?? '',
    readingTime: Number(page.reading_time) || 1,
    author: page.author ? { name: page.author.name, avatarUrl: cmsMediaUrl(page.author.avatar?.url) } : null,
  }
}

/**
 * Blog post summaries, newest first. The API always returns full posts; the body is
 * dropped here on the server, so it never reaches the browser.
 */
export function useBlogPosts(options: { limit?: number } = {}) {
  return useWagtailList<WagtailPage<BlogPageFields>, BlogPostSummary>(
    'writings',
    { ...RICH_TEXT, limit: options.limit },
    toSummary,
  )
}

function toPost(page: WagtailPage<BlogPageFields>): BlogPost {
  return { ...toSummary(page), body: page.body ?? [] }
}

/** One full blog post by slug. `data` is null if no post has that slug. */
export function useBlogPost(slug: string) {
  return useWagtailItem<WagtailPage<BlogPageFields>, BlogPost>(`writings/${slug}`, RICH_TEXT, toPost)
}

/** A draft blog post from a Wagtail preview token (see app/pages/preview/writings.vue). */
export function useBlogPostPreview(token: string) {
  return useWagtailPreview<BlogPageFields, BlogPost>('blog.blogpage', token, toPost)
}

export interface BlogPostSummary {
  id: number
  slug: string
  title: string
  date: string
  intro: string
  tags: string[]
  category: CmsCategory | null
  imageUrl: string | undefined
  imageAlt: string
  readingTime: number
  author: { name: string, avatarUrl: string | undefined } | null
}

export interface BlogPost extends BlogPostSummary {
  body: BlogBodyBlock[]
}
