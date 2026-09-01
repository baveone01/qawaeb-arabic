import { defineCollection, z } from 'astro:content';

// 内容集合：legal / insurance / ai 三个中枢共用一套 schema
const article = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['legal', 'insurance', 'ai']),
    hub: z.string(), // 中枢 slug
    author: z.string().default('فريق قوالب عربية'),
    tags: z.array(z.string()).default([]),
    // SEO
    seo: z.object({
      keywords: z.array(z.string()).default([]),
      schemaType: z.enum(['article', 'howto', 'faq', 'creativework']).default('article'),
    }).default({}),
    // 法律模板工具（仅 legal 且 template 页使用）
    template: z
      .object({
        enabled: z.boolean().default(false),
        intro: z.string().optional(),
        note: z.string().optional(),
        fields: z.array(
          z.object({ key: z.string(), label: z.string(), placeholder: z.string().optional() })
        ),
        // 生成的成文模板（含 [[key]] 占位符）
        body: z.string(),
      })
      .optional(),
    // 特色片段（AI Overviews 直接回答）
    answer: z.string().optional(),
    // FAQ 结构化
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { legal: article, insurance: article, ai: article };