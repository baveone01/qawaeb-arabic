import { defineConfig } from 'astro/config';
import rss from '@astrojs/rss';

// https://astro.build/config
export default defineConfig({
  site: 'https://qawaeb-arabic.pages.dev',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});