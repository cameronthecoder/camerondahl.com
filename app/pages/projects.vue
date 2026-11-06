<script setup lang="ts">
// Hardcoded until the CMS has a projects endpoint (see useProjects).
interface Project {
  name: string
  description: string
  stack: string[]
  date?: string
  note?: string
  url?: string
  images?: { src: string, alt: string }[]
}

const projects: Project[] = [
  {
    name: 'Desmos Connect',
    description: 'A custom pod that brings the Desmos graphing calculator into Adobe Connect.',
    stack: ['Vue.js'],
    date: '2022 - present',
    note: 'Used by the education company Pearson.',
    url: 'https://cameronthecoder.github.io/desmos-connect/',
    images: [
      { src: '/desmosconnect.png', alt: 'Desmos Connect inside Adobe Connect, graphing y = 3x + 2' },
    ],
  },
  {
    name: 'Badumtss.fun',
    description: 'A song guessing game with different game modes.',
    stack: ['Nuxt.js'],
    url: 'https://badumtss.fun',
    images: [
      { src: '/badumtss1.png', alt: 'Badumtss.fun home screen with buttons to host a game or join with a code, next to a list of public games' },
      { src: '/badumtss2.png', alt: 'Creating a game in Badumtss.fun: picking albums, number of rounds, round time and game mode' },
      { src: '/badumtss3.png', alt: 'A Badumtss.fun game lobby showing the invite code, game settings, players and lobby chat' },
    ],
  },
]

/** 'https://badumtss.fun/' -> 'badumtss.fun' for display. */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

useHead({
  title: 'Projects',
  meta: [
    {
      name: 'description',
      content: 'Projects by Cam, including Desmos Connect and Badumtss.fun.',
    },
  ],
})
</script>

<template>
  <main class="relative mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:px-10 sm:py-24">
    <h1 class="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>

    <ul class="mt-10 space-y-6">
      <li
        v-for="project in projects"
        :key="project.name"
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white/70"
      >
        <article>
          <ImageGallery
            v-if="project.images?.length"
            :images="project.images"
            :label="`${project.name} screenshots`"
            class="border-b border-slate-200"
          />

          <div class="p-6">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 class="font-serif text-2xl font-semibold">{{ project.name }}</h2>
              <p v-if="project.date" class="text-sm text-slate-500">{{ project.date }}</p>
            </div>

            <p class="mt-3 text-primary-900">{{ project.description }}</p>
            <p v-if="project.note" class="mt-1 text-primary-900">{{ project.note }}</p>

            <div class="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
              <p class="text-slate-600">
                <span class="font-medium text-primary-800">Built with</span>
                {{ project.stack.join(', ') }}
              </p>

              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-1 rounded font-medium text-primary-800 underline decoration-accent decoration-2 underline-offset-4 hover:text-primary-950 hover:decoration-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-950"
              >
                {{ displayUrl(project.url) }}
                <Icon
                  name="ri:arrow-right-up-line"
                  class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
                <span class="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </main>
</template>
