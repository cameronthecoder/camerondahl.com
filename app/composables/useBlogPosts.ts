// Blog posts are served by the CMS's `writings` endpoint:
//   list:   /api/v2/writings/
//   detail: /api/v2/writings/<slug>/

// Everything except `body`, so listings stay light.
const SUMMARY_FIELDS = ['date', 'intro', 'tags', 'category', 'image', 'reading_time', 'author']

function toSummary(page: WagtailPage<BlogPageFields>): BlogPostSummary {
  return {
    id: page.id,
    slug: page.meta.slug,
    title: page.title,
    date: page.date,
    intro: page.intro,
    tags: page.tags ?? [],
    category: page.category,
    imageUrl: cmsMediaUrl(page.image?.url),
    imageAlt: page.image?.title ?? '',
    readingTime: page.reading_time,
    author: page.author ? { name: page.author.name, avatarUrl: cmsMediaUrl(page.author.avatar?.url) } : null,
  }
}

/** Blog post summaries, newest first. */
export function useBlogPosts(options: { limit?: number } = {}) {
  return useWagtailList<WagtailPage<BlogPageFields>, BlogPostSummary>(
    'writings',
    { fields: SUMMARY_FIELDS.join(','), order: '-date', limit: options.limit },
    toSummary,
  )
}

function toPost(page: WagtailPage<BlogPageFields>): BlogPost {
  return { ...toSummary(page), body: page.body ?? [] }
}

/** One full blog post by slug. `data` is null if no post has that slug. */
export function useBlogPost(slug: string) {
  return useWagtailItem<WagtailPage<BlogPageFields>, BlogPost>(`writings/${slug}`, toPost)
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
