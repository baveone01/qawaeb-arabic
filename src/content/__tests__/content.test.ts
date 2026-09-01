import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hubs = ['legal', 'insurance', 'ai'];

function load() {
  const rows: { hub: string; slug: string; data: any }[] = [];
  for (const h of hubs) {
    const dir = path.join(root, h);
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
      const { data } = matter(readFileSync(path.join(dir, f), 'utf8'));
      rows.push({ hub: h, slug: f.replace('.md', ''), data });
    }
  }
  return rows;
}

describe('قوالب عربية 内容有效性', () => {
  const all = load();
  it('有内容且三个 hub 均非空', () => {
    for (const h of hubs) {
      expect(all.filter((r) => r.hub === h).length, `${h} 无文章`).toBeGreaterThan(0);
    }
    expect(all.length).toBeGreaterThanOrEqual(15);
  });

  it('每篇都有标题/描述/日期/作者/关键词', () => {
    for (const r of all) {
      expect(r.data.title, `${r.slug}.title`).toBeTruthy();
      expect(r.data.description, `${r.slug}.description`).toBeTruthy();
      expect(r.data.date, `${r.slug}.date`).toBeTruthy();
      expect(r.data.author, `${r.slug}.author`).toBeTruthy();
      expect(Array.isArray(r.data.seo?.keywords) && r.data.seo.keywords.length, `${r.slug}.keywords`).toBeTruthy();
    }
  });

  it('FAQ 有问有答（若声明）', () => {
    for (const r of all) {
      for (const f of r.data.faqs ?? []) {
        expect(f.q && f.a, `${r.slug} FAQ 空`).toBeTruthy();
      }
    }
  });

  it('法律模板工具字段与占位符一致', () => {
    for (const r of all) {
      const t = r.data.template;
      if (!t?.enabled) continue;
      const body = t.body;
      for (const f of t.fields) {
        expect(body.includes(`[[${f.key}]]`), `${r.slug} 缺少占位符 [[${f.key}]]`).toBe(true);
      }
    }
  });

  it('不重复 slug（hub 内唯一）', () => {
    for (const h of hubs) {
      const slugs = all.filter((r) => r.hub === h).map((r) => r.slug);
      expect(new Set(slugs).size, `${h} 有重复 slug`).toBe(slugs.length);
    }
  });
});