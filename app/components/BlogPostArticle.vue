<script setup lang="ts">
// The rendered body of a blog post. Shared by /writings/[slug] and /preview so a draft
// preview looks exactly like the published post.
defineProps<{ post: BlogPost }>()

const paragraphSize: Record<string, string> = {
  sm: 'text-base',
  base: 'text-lg',
  lg: 'text-xl',
  xl: 'text-2xl',
}

// Matches the CodeBlock language choices in the CMS.
const languageLabel: Record<string, string> = {
  py: 'Python',
  js: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  java: 'Java',
  csharp: 'C#',
  cpp: 'C++',
  ruby: 'Ruby',
  go: 'Go',
  php: 'PHP',
  swift: 'Swift',
  kotlin: 'Kotlin',
}
</script>

<template>
  <article>
    <header>
      <p v-if="post.category" class="text-sm font-semibold uppercase tracking-wider text-accent-700">
        {{ post.category.name }}
      </p>
      <h1 class="mt-2 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
        {{ post.title }}
      </h1>
      <p v-if="post.intro" class="mt-5 text-xl leading-relaxed text-primary-800">{{ post.intro }}</p>

      <div class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-primary-100 py-4 text-sm text-slate-600">
        <span v-if="post.author" class="flex items-center gap-2 font-medium text-primary-950">
          <NuxtImg
            v-if="post.author.avatarUrl"
            :src="post.author.avatarUrl"
            alt=""
            sizes="32px"
            densities="x1 x2"
            class="h-8 w-8 rounded-full border-2 border-primary-950 object-cover"
          />
          {{ post.author.name }}
        </span>
        <span v-if="post.author" aria-hidden="true">·</span>
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ post.readingTime }} min read</span>
      </div>
    </header>

    <figure v-if="post.imageUrl" class="mt-10">
      <NuxtImg
        :src="post.imageUrl"
        :alt="post.imageAlt"
        sizes="400px sm:640px"
        densities="x1 x2"
        class="aspect-[16/9] w-full rounded-[2rem] border-2 border-primary-950 object-cover shadow-[8px_8px_0_0_#118AB2]"
      />
    </figure>

    <div class="mt-12 space-y-6 leading-relaxed text-primary-900">
      <template v-for="block in post.body" :key="block.id">
        <h2
          v-if="block.type === 'heading'"
          class="flex items-center gap-3 pt-6 font-serif text-2xl font-semibold text-primary-950 before:h-6 before:w-1 before:shrink-0 before:rounded-full before:bg-accent before:content-['']"
        >
          {{ block.value }}
        </h2>

        <!-- Rich text from the CMS (trusted source: only Cam can edit it). -->
        <!-- eslint-disable vue/no-v-html -->
        <div
          v-else-if="block.type === 'paragraph'"
          :class="paragraphSize[block.value.size] ?? 'text-lg'"
          class="space-y-4 [&_a]:font-medium [&_a]:text-primary-950 [&_a]:underline [&_a]:decoration-accent [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:decoration-primary [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc"
          v-html="block.value.text"
        />
        <!-- eslint-enable vue/no-v-html -->

        <blockquote
          v-else-if="block.type === 'quote'"
          class="rounded-r-xl border-l-4 border-accent bg-accent-50 px-5 py-4 text-lg italic text-primary-900"
        >
          {{ block.value }}
        </blockquote>

        <figure v-else-if="block.type === 'pull_quote'" class="relative py-6 pl-10">
          <span aria-hidden="true" class="absolute left-0 top-2 font-serif text-6xl leading-none text-accent">&ldquo;</span>
          <blockquote class="font-serif text-2xl italic leading-snug text-primary-950 sm:text-3xl">
            {{ block.value.source }}
          </blockquote>
          <figcaption v-if="block.value.author" class="mt-3 text-sm font-medium text-slate-500">
            {{ block.value.author }}
          </figcaption>
        </figure>

        <figure
          v-else-if="block.type === 'code'"
          class="overflow-hidden rounded-xl border-2 border-primary-950 shadow-[4px_4px_0_0_#118AB2]"
        >
          <figcaption class="border-b border-primary-800 bg-primary-900 px-4 py-1.5 font-mono text-xs text-primary-200">
            {{ languageLabel[block.value.language] ?? block.value.language }}
          </figcaption>
          <pre class="overflow-x-auto bg-primary-950 p-4 text-sm leading-relaxed text-primary-50"><code :data-language="block.value.language">{{ block.value.code }}</code></pre>
        </figure>

        <!-- image, video and file blocks need extra data from the API before they can render. -->
      </template>
    </div>

    <footer v-if="post.tags.length" class="mt-16 border-t border-primary-100 pt-6">
      <p class="flex flex-wrap gap-x-3 gap-y-1 text-sm text-primary-700">
        <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
      </p>
    </footer>
  </article>
</template>
