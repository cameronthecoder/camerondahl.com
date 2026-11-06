<script setup lang="ts">
const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Writings', to: '/writings' },
]

const open = ref(false)
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger
      aria-label="Open menu"
      class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-primary-950 bg-white shadow-[3px_3px_0_0_#118AB2] transition-all hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-950"
    >
      <span class="block h-0.5 w-5 rounded-full bg-primary-950" />
      <span class="block h-0.5 w-5 rounded-full bg-primary-950" />
      <span class="block h-0.5 w-5 rounded-full bg-primary-950" />
    </DialogTrigger>

    <DialogPortal>
      <DialogContent
        class="nav-panel fixed inset-0 z-50 flex flex-col overflow-hidden bg-gradient-to-br from-[#FFFAF3] via-accent-50 to-accent-200 text-primary-950 focus:outline-none"
        :aria-describedby="undefined"
      >
        <VisuallyHidden>
          <DialogTitle>Site navigation</DialogTitle>
        </VisuallyHidden>

        <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-10">
          <span class="font-serif text-xl font-semibold italic">cam.</span>
          <DialogClose
            aria-label="Close menu"
            class="relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-primary-950 bg-white shadow-[3px_3px_0_0_#FF933E] transition-all hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-950"
          >
            <span class="absolute h-0.5 w-5 rotate-45 rounded-full bg-primary-950" />
            <span class="absolute h-0.5 w-5 -rotate-45 rounded-full bg-primary-950" />
          </DialogClose>
        </div>

        <nav aria-label="Main" class="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 sm:px-10">
          <ul class="space-y-7 sm:space-y-4">
            <li v-for="(link, i) in links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="group flex items-baseline gap-4 rounded-lg py-1 sm:py-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-950"
                @click="open = false"
              >
                <span class="font-mono text-base text-primary-700 sm:text-sm">0{{ i + 1 }}</span>
                <span class="relative font-serif text-[3.5rem] font-semibold leading-none tracking-tight sm:text-7xl">
                  <span aria-hidden="true" class="absolute inset-x-[-0.1em] bottom-[0.08em] top-[0.5em] origin-left -rotate-1 scale-x-0 rounded-sm bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
                  <span class="relative group-hover:italic">{{ link.label }}</span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
.nav-panel[data-state='open'] {
  animation: nav-in 220ms ease-out;
}
.nav-panel[data-state='closed'] {
  animation: nav-out 160ms ease-in;
}
@keyframes nav-in {
  from { opacity: 0; transform: translateY(-0.75rem); }
  to { opacity: 1; transform: none; }
}
@keyframes nav-out {
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: translateY(-0.75rem); }
}
@media (prefers-reduced-motion: reduce) {
  .nav-panel[data-state] {
    animation: none;
  }
}
</style>
