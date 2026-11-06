<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)

const { data: post, error } = await useBlogPost(slug)

if (!post.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useHead({
  title: () => post.value?.title ?? 'Writings',
  meta: [{ name: 'description', content: () => post.value?.intro ?? '' }],
})
</script>

<template>
  <main class="relative mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:px-10 sm:py-24">
    <NuxtLink
      to="/writings"
      class="group inline-flex items-center gap-1.5 rounded text-sm font-medium text-primary-800 hover:text-primary-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-950"
    >
      <Icon name="ri:arrow-left-line" class="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
      All writings
    </NuxtLink>

    <p v-if="error" class="mt-10 text-lg text-primary-800">
      This post couldn't load right now. Please try again in a bit.
    </p>

    <BlogPostArticle v-else-if="post" :post="post" class="mt-10" />
  </main>
</template>
