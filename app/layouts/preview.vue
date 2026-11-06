<script setup lang="ts">
// Layout for Wagtail draft previews (pages under app/pages/preview/): no site navigation,
// and a banner so a draft is never mistaken for the live site.
</script>

<template>
  <div class="contents">
    <div
      role="status"
      class="sticky top-0 z-50 flex w-full items-center justify-center gap-2 border-b-2 border-primary-950 bg-primary-950 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-primary-50"
    >
      <span class="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      Draft preview
      <span class="hidden font-normal normal-case tracking-normal text-primary-200 sm:inline">
        &middot; not published yet
      </span>
    </div>

    <slot />

    <AppFooter />
  </div>
</template>
