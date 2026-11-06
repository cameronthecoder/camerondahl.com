<script setup lang="ts">
const { data: posts, error } = await useBlogPosts()

useHead({
  title: 'Writings',
  meta: [{ name: 'description', content: 'Writings by Cam.' }],
})
</script>

<template>
  <main class="relative mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-16 sm:px-10 sm:py-24">
    <!-- Header is hidden visually when empty (the empty state speaks for itself), kept for screen readers. -->
    <header :class="{ 'sr-only': !error && !posts.length }">
      <h1 class="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Writings</h1>
      <p v-if="posts.length" class="mt-3 text-primary-800">
        {{ posts.length }} {{ posts.length === 1 ? 'post' : 'posts' }}
      </p>
    </header>

    <p v-if="error" class="mt-10 text-lg text-primary-800">
      Writings couldn't load right now. Please try again in a bit.
    </p>

    <div v-else-if="!posts.length" class="flex flex-1 flex-col items-center justify-center py-16 text-center">
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-accent-100">
        <Icon name="ri:quill-pen-line" class="h-7 w-7 text-accent-700" aria-hidden="true" />
      </div>
      <p class="mt-4 font-serif text-2xl font-semibold">No writings yet</p>
      <p class="mt-1 text-primary-800">Check back soon.</p>
    </div>

    <ul v-else class="mt-10 space-y-6">
      <li v-for="post in posts" :key="post.id">
        <!-- The whole card is clickable via the title link's ::after overlay. -->
        <article
          class="group relative overflow-hidden rounded-2xl border-2 border-primary-950 bg-white/80 transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#FF933E] focus-within:shadow-[6px_6px_0_0_#FF933E]"
        >
          <NuxtImg
            v-if="post.imageUrl"
            :src="post.imageUrl"
            :alt="post.imageAlt"
            sizes="400px sm:640px"
            class="aspect-[16/9] w-full border-b-2 border-primary-950 object-cover"
          />

          <div class="p-6">
            <p class="flex flex-wrap items-center gap-x-2 text-sm text-slate-500">
              <span v-if="post.category" class="font-semibold uppercase tracking-wider text-accent-700">
                {{ post.category.name }}
              </span>
              <span v-if="post.category" aria-hidden="true">·</span>
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ post.readingTime }} min read</span>
            </p>

            <h2 class="mt-2 font-serif text-2xl font-semibold leading-snug">
              <NuxtLink
                :to="`/writings/${post.slug}`"
                class="after:absolute after:inset-0 after:content-[''] focus:outline-none group-hover:text-primary-700"
              >
                {{ post.title }}
              </NuxtLink>
            </h2>

            <p v-if="post.intro" class="mt-2 leading-relaxed text-primary-900">{{ post.intro }}</p>

            <p v-if="post.tags.length" class="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-primary-700">
              <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
            </p>
          </div>
        </article>
      </li>
    </ul>
  </main>
</template>
