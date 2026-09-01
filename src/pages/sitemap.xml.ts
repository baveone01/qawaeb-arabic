import { getCollection } from 'astro:content';
import { SITE, HUBS, getHubByKey } from '../config';

export const GET = async () => {
  const cats = ['legal', 'insurance', 'ai'] as const;
  const all = (await Promise.all(cats.map((c) => getCollection(c)))).flat();

  const urls: { loc: string; lastmod: string }[] = [
    { loc: SITE.url + '/', lastmod: new Date().toISOString() },
    ...HUBS.map((h) => ({ loc: `${SITE.url}/${h.slug}/`, lastmod: new Date().toISOString() })),
    { loc: `${SITE.url}/حول/`, lastmod: new Date().toISOString() },
    { loc: `${SITE.url}/اتصل-بنا/`, lastmod: new Date().toISOString() },
    { loc: `${SITE.url}/سياسة-الخصوصية/`, lastmod: new Date().toISOString() },
    { loc: `${SITE.url}/إخلاء-المسؤولية/`, lastmod: new Date().toISOString() },
    ...all.map((p) => {
      const hub = getHubByKey(p.data.category)!;
      return { loc: `${SITE.url}/${hub.slug}/${p.slug}/`, lastmod: (p.data.updated ?? p.data.date).toISOString() };
    }),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod.slice(0, 10)}</lastmod>\n  </url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};