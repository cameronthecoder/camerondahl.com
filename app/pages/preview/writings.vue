<script setup lang="ts">
// Draft preview for writings (blog.BlogPage), opened by the Wagtail admin as
// /preview/writings?content_type=blog.blogpage&token=<token>.
// Other sections get their own page next to this one (e.g. preview/projects.vue).

definePageMeta({ layout: 'preview' })

const route = useRoute()
const token = String(route.query.token ?? '')

if (!token) {
  throw createError({ statusCode: 400, statusMessage: 'Missing preview token', fatal: true })
}

const { data: post, error } = await useBlogPostPreview(token)

useHead({
  title: () => `Preview: ${post.value?.title ?? 'Draft'}`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<template>
  <main class="relative mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:px-10 sm:py-24">
    <p v-if="error" class="text-lg text-primary-800">
      This preview couldn't load. The token may have expired, so try opening the preview again from the CMS.
    </p>

    <BlogPostArticle v-else-if="post" :post="post" />
  </main>
</template>
