import { getCollection } from 'astro:content';
import { getHubByKey } from '../config';

export const GET = async () => {
  const cats = ['legal', 'insurance', 'ai'] as const;
  const all = (await Promise.all(cats.map((c) => getCollection(c)))).flat();

  const records = all.map((post) => {
    const hub = getHubByKey(post.data.category);
    return {
      t: post.data.title,
      k: post.data.seo.keywords.join(' ') + ' ' + post.data.tags.join(' '),
      u: `/${hub?.slug ?? ''}/${post.slug}/`,
      c: hub?.navPt ?? '',
    };
  }).sort((a, b) => a.t.localeCompare(b.t, 'ar'));

  return new Response(JSON.stringify(records), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};