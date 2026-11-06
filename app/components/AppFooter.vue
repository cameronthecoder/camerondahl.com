<script setup lang="ts">
// TODO: replace '#' with real profile URLs.
const socials = [
  { label: 'LinkedIn', icon: 'ri:linkedin-box-fill', href: '#' },
  { label: 'GitHub', icon: 'ri:github-fill', href: '#' },
]

const year = new Date().getFullYear()
</script>

<template>
<footer class="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 pb-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
  <ul class="flex items-center justify-center gap-4">
    <li v-for="social in socials" :key="social.label">
      <a
        :href="social.href"
        :aria-label="social.label"
        target="_blank"
        rel="noopener noreferrer"
        class="block rounded text-primary-800 transition hover:-translate-y-0.5 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-950"
      >
        <Icon :name="social.icon" class="h-6 w-6" />
      </a>
    </li>
  </ul>

  <p class="text-xs text-slate-500">
    &copy; {{ year }} Cam Dahl. Made with love and Nuxt.
  </p>
</footer>
</template>
