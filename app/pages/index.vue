<script setup lang="ts">
const email = 'cam@camerondahl.com'

// Photos the visitor can switch between. Add the file to /public, then list it here.
// `caption` is overlaid on the card; optional `details` are smaller lines under it.
const photos = [
  { id: 'me', label: 'Me', caption: 'Me', src: '/me.jpeg', alt: 'Cam smiling next to a tabby-and-white cat.', position: 'center 30%' },
  {
    id: 'cat',
    label: 'Drama',
    caption: 'My cat, Drama',
    details: ['~1.5 years · very vocal', 'Gotcha day · July 12'],
    src: '/cat.jpeg',
    alt: 'Drama, Cam\'s calico cat, reaching a paw toward the camera. She\'s about 1.5 years old, her gotcha day is July 12, and she\'s very vocal.',
    position: 'center 30%',
  },
]

// Index of the photo on top of the stack. Clicking the stack brings the next one forward.
const front = ref(0)
const next = computed(() => photos[(front.value + 1) % photos.length]!)

function cyclePhoto() {
  front.value = (front.value + 1) % photos.length
}

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Clipboard unavailable (e.g. insecure context); the mailto button still works.
  }
}

useHead({
  meta: [
    {
      name: 'description',
      content: 'I\'m Cam, a student at the University of Minnesota Duluth moving from software engineering into network engineering.',
    },
  ],
})
</script>

<template>
  <main class="relative mx-auto grid w-full max-w-6xl flex-1 content-center items-center gap-8 px-6 py-8 sm:px-10 md:grid-cols-[1.4fr_1fr] md:gap-12">
    <!-- Words -->
    <div class="order-2 text-center md:order-1 md:text-left">
      <div class="flex flex-wrap items-end justify-center gap-x-4 gap-y-2 md:justify-start">
        <h1 class="font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          Hi, I'm
          <span class="italic">Cam.</span>
        </h1>
      </div>
      <p class="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-primary-800 sm:text-base md:justify-start">
        <span>he/they</span>
        <span aria-hidden="true" class="text-slate-300">·</span>
        <span class="inline-flex items-center gap-1">
          <Icon name="ri:map-pin-2-fill" class="h-4 w-4 text-slate-400" aria-hidden="true" />
          Duluth, MN
        </span>
      </p>

      <p class="mx-auto mt-6 max-w-md text-lg leading-relaxed md:mx-0 text-primary-900 sm:text-xl">
        I'm a student at the University of Minnesota Duluth, switching from software engineering to
        <span class="relative inline-block whitespace-nowrap font-semibold text-primary-950">
          network engineering
          <svg aria-hidden="true" class="absolute -bottom-2 left-0 h-2.5 w-full text-primary" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
            <path d="M1 6 Q 9 1, 17 6 T 33 6 T 49 6 T 65 6 T 81 6 T 99 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </svg>
        </span>.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
        <a
          :href="`mailto:${email}`"
          class="rounded-xl border-2 border-primary-950 bg-primary-700 px-6 py-3 font-semibold text-white shadow-[4px_4px_0_0_#FF933E] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#FF933E] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-950"
        >
          Say hello
        </a>

        <button
          type="button"
          class="rounded-xl border-2 border-primary-950 bg-white px-6 py-3 font-semibold text-primary-950 shadow-[4px_4px_0_0_#118AB2] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#118AB2] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-950"
          @click="copyEmail"
        >
          {{ copied ? 'Copied!' : 'Copy email' }}
        </button>
        <span class="sr-only" aria-live="polite">{{ copied ? 'Email address copied to clipboard' : '' }}</span>
      </div>

      <p class="mt-4 text-sm text-primary-800">{{ email }}</p>
    </div>

    <!-- Photo -->
    <div class="order-1 flex justify-center md:order-2 md:justify-end">
      <!-- A stack of photo cards: the top one is shown, the next peeks out behind it. -->
      <button
        type="button"
        :aria-label="`${photos[front]!.alt} Show photo: ${next.label}`"
        class="group relative w-52 translate-x-[7%] rounded-[2rem] md:translate-x-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary-950 sm:w-56 md:w-72"
        @click="cyclePhoto"
      >
        <!-- Sizer: gives the stack its height. -->
        <span aria-hidden="true" class="block aspect-[4/5] w-full" />

        <span
          v-for="(p, i) in photos"
          :key="p.id"
          class="absolute inset-0 overflow-hidden rounded-[2rem] border-2 border-primary-950 bg-accent-100 transition-all duration-500 ease-out motion-reduce:transition-none"
          :class="i === front
            ? 'z-10 rotate-3 shadow-[10px_10px_0_0_#118AB2] group-hover:rotate-1'
            : 'z-0 -translate-x-[14%] translate-y-[3%] -rotate-6 shadow-[6px_6px_0_0_#FF933E] group-hover:-translate-x-[20%] group-hover:-rotate-[9deg]'"
        >
          <NuxtImg
            :src="p.src"
            :alt="i === front ? p.alt : ''"
            sizes="208px sm:224px md:288px"
            densities="x1 x2"
            :preload="i === 0"
            class="h-full w-full object-cover"
            :style="{ objectPosition: p.position }"
          />
          <!-- Caption overlay. Hidden from screen readers: the button's label already includes the photo's description. -->
          <span
            aria-hidden="true"
            class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-950/80 via-primary-950/40 to-transparent px-4 pb-3.5 text-left text-white sm:px-5 sm:pb-4"
            :class="p.details ? 'pt-16' : 'pt-8'"
          >
            <span class="block font-serif text-base italic leading-tight sm:text-lg">{{ p.caption }}</span>
            <span
              v-for="(detail, d) in p.details"
              :key="detail"
              class="block text-[0.6875rem] leading-normal text-white/80 sm:text-xs"
              :class="d === 0 ? 'mt-1.5' : 'mt-0.5'"
            >
              {{ detail }}
            </span>
          </span>
        </span>
      </button>
    </div>
  </main>
</template>
