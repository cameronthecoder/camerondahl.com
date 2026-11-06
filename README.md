# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Fetching CMS content (Wagtail)

Content comes from a Wagtail headless CMS (REST API v2). Every query follows the same path:

```
page (.vue) -> domain composable -> generic composable -> /api/cms proxy -> Wagtail
               useProjects()        useWagtailPages()      server route      /api/v2/
```

| Layer | Location | Knows about |
| --- | --- | --- |
| Page | `app/pages/*.vue` | Rendering only. Calls one domain composable. |
| Domain composable | `app/composables/use<Thing>.ts` | Wagtail model name, fields, mapping to view data |
| Generic composables | `app/composables/useWagtail.ts` | `useWagtailPages`, `useWagtailPage`, `useWagtailPageByPath` |
| Proxy | `server/api/cms/[...path].get.ts` | The real CMS URL, caching (60s, stale-while-revalidate) |
| Types | `shared/types/wagtail.ts`, `shared/types/cms.ts` | API shapes / per-model fields |

Helpers in `app/utils/cms.ts`: `cmsMediaUrl()` (absolute image URLs) and `formatDateRange()`.

### Setup

Copy `.env.example` to `.env` and set `NUXT_WAGTAIL_API_BASE` (server-only) and
`NUXT_PUBLIC_CMS_MEDIA_BASE`.

### Adding a new content type

1. On the Wagtail model, list the fields the site needs in `api_fields`.
2. Add a `<Model>Fields` interface to `shared/types/cms.ts`.
3. Create `app/composables/use<Thing>.ts`:

   ```ts
   export function useEvents() {
     return useWagtailPages<EventPageFields, EventItem>(
       'events.EventPage',
       { order: '-start_date', key: 'events' },
       page => ({ title: page.title, when: page.start_date, imageUrl: cmsMediaUrl(page.image?.url) }),
     )
   }
   ```

   The last argument maps raw API data to what the page needs (dates, image URLs), so pages
   never touch raw API shapes. Use `useWagtailFirstPage` for singletons or slug lookups and
   `useWagtailPageByPath` for a page at a known URL.

   Existing examples: `useHomePage`, `useAboutPage`, `useBlogPosts` / `useBlogPost`.
4. In the page: `const { data, error } = await useEvents()`.

Pages never call `$fetch`/`useFetch` against the CMS directly.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
