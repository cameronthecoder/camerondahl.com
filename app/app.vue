<script setup lang="ts">
// TODO: replace '#' with real profile URLs.
const socials = [
  { label: 'LinkedIn', icon: 'ri:linkedin-box-fill', href: '#' },
  { label: 'GitHub', icon: 'ri:github-fill', href: '#' },
]

const year = new Date().getFullYear()

useHead({
  titleTemplate: title => (title ? `${title} | Cam Dahl` : 'Cam Dahl'),
  htmlAttrs: { lang: 'en' },
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col bg-gradient-to-br from-[#FFFAF3] via-accent-50 to-accent-200 text-primary-950">
    <!-- Top bar -->
    <header class="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-10">
      <NuxtLink
        to="/"
        class="rounded font-serif text-xl font-semibold italic focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-950"
      >
        cam.
      </NuxtLink>
      <AppNavigation />
    </header>

    <NuxtPage />

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
  </div>
</template>

<style>
/* Page transition (enabled in nuxt.config.ts: app.pageTransition). */
.page-enter-active,
.page-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(0.5rem);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-0.25rem);
}
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
