<script setup lang="ts">
// Swipeable image gallery. With one image it's just the image (no controls).
const props = defineProps<{
  images: { src: string, alt: string }[]
  /** Accessible name for the gallery, e.g. "Badumtss.fun screenshots". */
  label: string
}>()

const scroller = ref<HTMLElement | null>(null)
const current = ref(0)
const multiple = computed(() => props.images.length > 1)

// Keep the counter in sync when the visitor swipes or scrolls directly.
function onScroll() {
  const el = scroller.value
  if (!el) return
  current.value = Math.round(el.scrollLeft / el.clientWidth)
}

function goTo(index: number) {
  const el = scroller.value
  if (!el) return
  const target = (index + props.images.length) % props.images.length
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollTo({ left: target * el.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' })
  current.value = target
}
</script>

<template>
  <section
    :aria-label="label"
    :aria-roledescription="multiple ? 'carousel' : undefined"
    class="group relative"
  >
    <div
      ref="scroller"
      class="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      @scroll.passive="onScroll"
    >
      <div
        v-for="(image, i) in images"
        :key="image.src"
        class="w-full shrink-0 snap-start"
        :aria-roledescription="multiple ? 'slide' : undefined"
        :aria-label="multiple ? `${i + 1} of ${images.length}` : undefined"
        :role="multiple ? 'group' : undefined"
      >
        <NuxtImg
          :src="image.src"
          :alt="image.alt"
          sizes="400px sm:640px"
          densities="x1 x2"
          format="webp"
          :loading="i === 0 ? 'eager' : 'lazy'"
          class="aspect-[16/10] w-full object-cover object-left-top"
        />
      </div>
    </div>

    <template v-if="multiple">
      <button
        type="button"
        aria-label="Previous image"
        class="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary-950 bg-white/90 text-primary-950 shadow-[2px_2px_0_0_#118AB2] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-950 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
        @click="goTo(current - 1)"
      >
        <Icon name="ri:arrow-left-s-line" class="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        class="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary-950 bg-white/90 text-primary-950 shadow-[2px_2px_0_0_#118AB2] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-950 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
        @click="goTo(current + 1)"
      >
        <Icon name="ri:arrow-right-s-line" class="h-5 w-5" aria-hidden="true" />
      </button>

      <p
        class="absolute bottom-3 right-3 rounded-full bg-primary-950/75 px-2.5 py-0.5 font-mono text-xs text-white"
        aria-live="polite"
      >
        {{ current + 1 }} / {{ images.length }}
      </p>
    </template>
  </section>
</template>
