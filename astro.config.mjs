// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: set this to the real production domain before deploying to Vercel.
// It is used to build absolute URLs for hreflang / canonical / OG tags.
const SITE = 'https://ostavica.rs';

export default defineConfig({
  site: SITE,
  // Every locale lives under its own folder: ru → /ru/, en → /en/,
  // Serbian (code "sr") is served at /rs/. "/" redirects to /ru/.
  i18n: {
    defaultLocale: 'rs',
    locales: ['ru', 'en', { path: 'rs', codes: ['sr'] }],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  redirects: {
    // "/" is a language-detecting entry point (src/pages/index.astro), not a
    // static redirect. Only the old Serbian path is redirected here.
    '/sr/': '/rs/',
  },
  integrations: [
    sitemap({
      // keys = URL folders, values = hreflang tags (folder /rs/ → language sr)
      i18n: {
        defaultLocale: 'rs',
        locales: { ru: 'ru', en: 'en', rs: 'sr' },
      },
    }),
  ],
  image: {
    // Keep the pipeline lean; sharp generates WebP + srcset for <Image>/<Picture>.
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
