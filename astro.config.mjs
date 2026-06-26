// @ts-check
import { defineConfig } from 'astro/config';

// TODO: set this to the real production domain before deploying to Vercel.
// It is used to build absolute URLs for hreflang / canonical / OG tags.
const SITE = 'https://ostavica.rs';

export default defineConfig({
  site: SITE,
  // Built-in i18n: ru is default and served at "/", en at "/en/", sr at "/sr/".
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'sr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  image: {
    // Keep the pipeline lean; sharp generates WebP + srcset for <Image>/<Picture>.
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
