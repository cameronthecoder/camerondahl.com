// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    // Fade + slight rise between pages. Styles live in app/app.vue.
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    wagtail: {
      // Server-only. Wagtail API v2 root, e.g. https://cms.example.com/api/v2
      // Set with NUXT_WAGTAIL_API_BASE.
      apiBase: '',
    },
    public: {
      // Prefix for relative CMS media URLs (/media/...). Set with NUXT_PUBLIC_CMS_MEDIA_BASE.
      cmsMediaBase: '',
    },
  },

  image: {
    // CMS media host, so <NuxtImg> can optimize CMS images.
    domains: ['cms.camerondahl.com'],
  },

  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      'DM Sans': [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Fraunces: { wght: [400, 600, 700], ital: [400, 600] }
    }
  },



  icon: {
    // Bundle used icons into the client so they work on statically generated pages.
    clientBundle: {
      scan: true,
      icons: ['ri:linkedin-box-fill', 'ri:github-fill', 'ri:map-pin-2-fill', 'ri:quill-pen-line', 'ri:arrow-left-line', 'ri:arrow-right-up-line', 'ri:arrow-left-s-line', 'ri:arrow-right-s-line'],
    },
  },

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    'reka-ui/nuxt'
  ]
})