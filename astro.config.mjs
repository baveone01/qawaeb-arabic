import { defineConfig } from 'astro/config';
import rss from '@astrojs/rss';

// https://astro.build/config
export default defineConfig({
  site: 'https://qawaeb.snapvil.com',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});