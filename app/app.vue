<script setup lang="ts">
useHead({
  titleTemplate: title => (title ? `${title} | Cam Dahl` : 'Cam Dahl'),
  htmlAttrs: { lang: 'en' },
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col bg-gradient-to-br from-[#FFFAF3] via-accent-50 to-accent-200 text-primary-950">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
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
