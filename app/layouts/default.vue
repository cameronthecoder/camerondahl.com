<template>
  <div class="contents">
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

    <slot />

    <AppFooter />
  </div>
</template>
