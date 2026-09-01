import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, getHubByKey } from '../config';

const cats = ['legal', 'insurance', 'ai'] as const;
const all = (await Promise.all(cats.map((c) => getCollection(c)))).flat()
  .sort((a, b) => +b.data.date - +a.data.date);

export const GET = () =>
  rss({
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    site: SITE.url,
    items: all.slice(0, 30).map((p) => {
      const hub = getHubByKey(p.data.category)!;
      return {
        title: p.data.title,
        description: p.data.description,
        pubDate: p.data.date,
        link: `/${hub.slug}/${p.slug}/`,
      };
    }),
    customData: `<language>ar</language>`,
  });