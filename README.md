# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Fetching CMS content (Wagtail)

Content comes from a Wagtail headless CMS (REST API v3). Every query follows the same path:

```
page (.vue) -> domain composable -> generic composable -> /api/cms proxy -> Wagtail
               useBlogPosts()       useWagtailList()       server route      /api/v3/
```

| Layer | Location | Knows about |
| --- | --- | --- |
| Page | `app/pages/*.vue` | Rendering only. Calls one domain composable. |
| Domain composable | `app/composables/use<Thing>.ts` | Wagtail model name, fields, mapping to view data |
| Generic composables | `app/composables/useWagtail.ts` | `useWagtailList`, `useWagtailItem`, `useWagtailPage`, `useWagtailPageByPath`, `useWagtailPreview` |
| Proxy | `server/api/cms/[...path].get.ts` | The real CMS URL, caching (60s, stale-while-revalidate) |
| Types | `shared/types/wagtail.ts`, `shared/types/cms.ts` | API shapes / per-model fields |

The API spec is at `https://cms.camerondahl.com/api/v3/openapi.json`. Things to know about v3:

- List endpoints return `{ items, count }` and reject `limit` above 20. `useWagtailList` pages
  through them automatically unless you pass a `limit`.
- `/pages/` lists only `id`, `title` and `meta`. For a page's fields use its detail endpoint,
  `/pages/find/?html_path=...`, or a custom endpoint (`/writings/`, `/about/`).
- Pass `rich_text_format: 'html'` to get rich text with internal links expanded.
- Draft previews go through `server/api/preview.get.ts` (uncached), not the proxy.

Helpers in `app/utils/cms.ts`: `cmsMediaUrl()` (absolute image URLs) and `formatDateRange()`.

### Setup

Copy `.env.example` to `.env` and set `NUXT_WAGTAIL_API_BASE` (server-only) and
`NUXT_PUBLIC_CMS_MEDIA_BASE`.

### Adding a new content type

1. Expose it on the CMS (a custom v3 endpoint, like `/writings/`), and check its schema in the spec.
2. Add a `<Model>Fields` interface to `shared/types/cms.ts`, and the endpoint's first path
   segment to `ALLOWED_ROOTS` in `server/api/cms/[...path].get.ts`.
3. Create `app/composables/use<Thing>.ts`:

   ```ts
   export function useEvents() {
     return useWagtailList<WagtailPage<EventPageFields>, EventItem>(
       'events',
       { rich_text_format: 'html' },
       page => ({ title: page.title, when: page.start_date, imageUrl: cmsMediaUrl(page.image?.url) }),
     )
   }
   ```

   The map argument turns raw API data into what the page needs (dates, image URLs), so pages
   never touch raw API shapes. Use `useWagtailItem` for one item (e.g. `events/<slug>`) and
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
