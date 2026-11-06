<script setup lang="ts">
const email = 'cam@camerondahl.com'

const { data: about, error } = await useAboutPage()

if (!about.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useHead({
  title: 'About',
  meta: [
    {
      name: 'description',
      content: 'About Cam, a student at the University of Minnesota Duluth moving from software engineering into network engineering.',
    },
  ],
})
</script>

<template>
  <main class="relative mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:px-10 sm:py-24">
    <h1 class="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">About me</h1>

    <div v-if="about" class="mt-8 space-y-5 text-lg leading-relaxed text-primary-900">
      <p v-for="(paragraph, i) in about.paragraphs" :key="i">{{ paragraph }}</p>
    </div>
    <p v-else class="mt-8 text-lg text-primary-800">
      This section couldn't load right now. Please try again in a bit.
    </p>

    <p class="mt-12 text-lg text-primary-900">
      The best way to reach me is by email at
      <a
        :href="`mailto:${email}`"
        class="font-medium text-primary-950 underline decoration-accent decoration-2 underline-offset-4 hover:decoration-primary"
      >{{ email }}</a>.
    </p>
  </main>
</template>
